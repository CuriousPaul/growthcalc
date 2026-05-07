(() => {
  "use strict";

  // ---------- Helpers ----------

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const fmtInt = (n) => {
    if (!isFinite(n)) return "—";
    const r = Math.round(n);
    if (r === 0) return "0";
    return r.toLocaleString("en-US");
  };

  const fmtSigned = (n) => {
    if (!isFinite(n)) return "—";
    const r = Math.round(n);
    if (r === 0) return "0";
    return r < 0
      ? `(${Math.abs(r).toLocaleString("en-US")})`
      : r.toLocaleString("en-US");
  };

  const fmtPct = (n, digits = 0) => {
    if (!isFinite(n)) return "—";
    return `${(n * 100).toFixed(digits)}%`;
  };

  const fmtFactor = (n) => (isFinite(n) ? n.toFixed(2) : "—");

  const num = (sel) => {
    const el = $(`[data-input="${sel}"]`);
    const v = parseFloat(el.value);
    return isFinite(v) ? v : 0;
  };

  const setOutput = (key, value) => {
    const el = $(`[data-output="${key}"]`);
    if (el) el.textContent = value;
  };

  // ---------- Tab switcher ----------

  $$(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      $$(".tab").forEach((t) => {
        const active = t.dataset.tab === target;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      $$(".model").forEach((m) => {
        m.classList.toggle("is-hidden", m.id !== `tab-${target}`);
      });
      // Charts can mis-size if hidden when first drawn; ask them to resize.
      Object.values(charts).forEach((c) => c && c.resize());
    });
  });

  // ---------- Models ----------

  /**
   * Simple Loss model.
   *
   * For each month m (1..months):
   *   gross[m] = launch[m] + appstore[m] + direct[m] + viral[m]
   *   viral[m] = m === 1 ? 0 : gross[m-1] * k
   *   loss[m]  = users_start[m] * loss_pct
   *   net[m]   = gross[m] - loss[m]
   *   users_start[m+1] = users_start[m] + net[m]
   */
  function computeSimple({
    launch,
    appstore,
    direct,
    viralFactor,
    lossPct,
    months,
  }) {
    const rows = [];
    let usersStart = 0;
    let prevGross = 0;

    for (let m = 1; m <= months; m++) {
      const launchM = m === 1 ? launch : 0;
      const viral = m === 1 ? 0 : prevGross * viralFactor;
      const gross = launchM + appstore + direct + viral;
      const loss = usersStart * lossPct;
      const net = gross - loss;

      rows.push({
        month: m,
        usersStart,
        launch: launchM,
        appstore,
        direct,
        viral,
        gross,
        loss,
        net,
      });

      usersStart = usersStart + net;
      prevGross = gross;
    }

    return rows;
  }

  /**
   * Retention & Virality Curves model (cohort-based).
   *
   * cohort[m] = launch[m] + appstore[m] + direct[m] + viral[m]
   * viral[m]  = Σ cohort[c] * retention[m-c] * viralFactor[m-c]   for c < m
   * users_start[m+1] = Σ cohort[c] * retention[m+1-c]             for c <= m
   * loss[m]  = users_start[m] + cohort[m] - users_start[m+1]
   * net[m]   = cohort[m] - loss[m]
   *
   * retention[0] = 1; retention[k] for k > maxRet uses retention[maxRet].
   * viralFactor[0] = 0; viralFactor[k] for k > maxVf decays geometrically by
   * `viralDecay`.
   */
  function computeCurves({
    launch,
    appstore,
    direct,
    retention, // [r1, r2, r3, r4, r5, r6] as fractions; index 0 = month 0->1
    viral, // [v1, v2, v3, v4, v5, v6]; index 0 = month 1
    viralDecay,
    months,
  }) {
    // retention[k] = fraction of a cohort still active k months after
    // acquisition. retentionAt(0) === 1.
    const retentionAt = (k) => {
      if (k <= 0) return 1;
      if (k <= retention.length) return retention[k - 1];
      return retention[retention.length - 1];
    };

    // viralFactor[k] = invitations per user in their k-th month after
    // acquisition. k = 0 is the acquisition month itself (no virality yet
    // — invitations land in subsequent months).
    const viralAt = (k) => {
      if (k <= 0) return 0;
      if (k <= viral.length) return viral[k - 1];
      // Past the configured curve, decay from the last value.
      return viral[viral.length - 1] * Math.pow(viralDecay, k - viral.length);
    };

    const cohorts = []; // cohorts[m-1] = size of cohort acquired in month m
    const rows = [];

    for (let m = 1; m <= months; m++) {
      // Users at start of month m = sum of all prior cohorts retained to now.
      let usersStart = 0;
      for (let c = 1; c < m; c++) {
        usersStart += cohorts[c - 1] * retentionAt(m - c);
      }

      // Viral acquisitions this month from prior cohorts.
      let viralM = 0;
      for (let c = 1; c < m; c++) {
        viralM += cohorts[c - 1] * retentionAt(m - c) * viralAt(m - c);
      }

      const launchM = m === 1 ? launch : 0;
      const appM = appstore;
      const directM = direct;
      const gross = launchM + appM + directM + viralM;

      cohorts.push(gross);

      // Users at start of next month so we can compute loss.
      let usersNext = 0;
      for (let c = 1; c <= m; c++) {
        usersNext += cohorts[c - 1] * retentionAt(m + 1 - c);
      }
      const loss = usersStart + gross - usersNext;
      const net = gross - loss;

      rows.push({
        month: m,
        usersStart,
        launch: launchM,
        appstore: appM,
        direct: directM,
        viral: viralM,
        gross,
        loss,
        net,
      });
    }

    return rows;
  }

  /**
   * Viral coefficient (K-factor) model.
   *
   *   K = participation × shares × conversion
   *
   *   newUsers[0] = seed                          // cycle 0 = the seed itself
   *   newUsers[n] = newUsers[n-1] × K             // each cycle multiplies by K
   *   shares[n]   = newUsers[n] × participation × shares
   *   cumulative[n] = Σ newUsers[0..n]
   *
   * Closed-form cumulative after N cycles:
   *   K = 1 → seed × (N + 1)
   *   else → seed × (K^(N+1) - 1) / (K - 1)
   *
   * Theoretical infinite-time reach (only meaningful for K < 1):
   *   seed / (1 - K)
   */
  function computeViral({
    seed,
    participation, // fraction
    shares, // shares per sharer
    conversion, // fraction
    cycleDays,
    totalDays,
  }) {
    const K = participation * shares * conversion;
    const cycles = Math.max(0, Math.floor(totalDays / cycleDays));

    const rows = [];
    let prevNew = seed;
    let cumulative = seed;

    rows.push({
      cycle: 0,
      day: 0,
      newUsers: seed,
      shares: seed * participation * shares,
      cumulative,
    });

    for (let n = 1; n <= cycles; n++) {
      const newUsers = prevNew * K;
      cumulative += newUsers;
      rows.push({
        cycle: n,
        day: n * cycleDays,
        newUsers,
        shares: newUsers * participation * shares,
        cumulative,
      });
      prevNew = newUsers;
    }

    const ceiling = K < 1 ? seed / (1 - K) : Infinity;

    return { K, cycles, rows, ceiling };
  }

  // ---------- Charts ----------

  const charts = {
    simpleUsers: null,
    simpleChannels: null,
    curvesUsers: null,
    curvesChannels: null,
    viralPerCycle: null,
    viralCumulative: null,
  };

  const COLORS = {
    users: "#2f5fff",
    launch: "#5b8def",
    appstore: "#e0533d",
    direct: "#7bbf3f",
    viral: "#8b5cf6",
    loss: "#3aafd9",
  };

  // Returns a fresh options object — Chart.js mutates the options it's given,
  // so reusing the same reference across charts can cause subtle bugs.
  const baseChartOpts = () => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10 } },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${Math.round(
              ctx.parsed.y,
            ).toLocaleString("en-US")}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Month" },
        grid: { color: "rgba(0,0,0,0.04)" },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (v) => Math.round(v).toLocaleString("en-US"),
        },
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
  });

  function ensureUsersChart(canvasId, key, rows) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    const labels = rows.map((r) => r.month);
    const data = rows.map((r) => r.usersStart);

    if (charts[key]) {
      charts[key].data.labels = labels;
      charts[key].data.datasets[0].data = data;
      charts[key].update();
      return;
    }
    charts[key] = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Users (month start)",
            data,
            borderColor: COLORS.users,
            backgroundColor: COLORS.users + "22",
            tension: 0.25,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
          },
        ],
      },
      options: baseChartOpts(),
    });
  }

  function ensureChannelsChart(canvasId, key, rows) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    const labels = rows.map((r) => r.month);

    const datasets = [
      {
        label: "Launch press",
        data: rows.map((r) => r.launch),
        borderColor: COLORS.launch,
        backgroundColor: COLORS.launch + "22",
      },
      {
        label: "App store",
        data: rows.map((r) => r.appstore),
        borderColor: COLORS.appstore,
        backgroundColor: COLORS.appstore + "22",
      },
      {
        label: "Direct traffic",
        data: rows.map((r) => r.direct),
        borderColor: COLORS.direct,
        backgroundColor: COLORS.direct + "22",
      },
      {
        label: "Viral growth",
        data: rows.map((r) => r.viral),
        borderColor: COLORS.viral,
        backgroundColor: COLORS.viral + "22",
      },
      {
        label: "Loss",
        data: rows.map((r) => -r.loss),
        borderColor: COLORS.loss,
        backgroundColor: COLORS.loss + "22",
      },
    ].map((d) => ({
      ...d,
      tension: 0.2,
      pointRadius: 2.5,
      pointHoverRadius: 5,
      borderWidth: 2,
      fill: false,
    }));

    if (charts[key]) {
      charts[key].data.labels = labels;
      charts[key].data.datasets.forEach((ds, i) => {
        ds.data = datasets[i].data;
      });
      charts[key].update();
      return;
    }
    charts[key] = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: baseChartOpts(),
    });
  }

  function ensureViralPerCycleChart(rows) {
    const ctx = document
      .getElementById("chartViralPerCycle")
      .getContext("2d");
    const labels = rows.map((r) => r.cycle);
    const data = rows.map((r) => r.newUsers);

    if (charts.viralPerCycle) {
      charts.viralPerCycle.data.labels = labels;
      charts.viralPerCycle.data.datasets[0].data = data;
      charts.viralPerCycle.update();
      return;
    }
    const opts = baseChartOpts();
    opts.scales.x.title.text = "Cycle";
    charts.viralPerCycle = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "New subscribers",
            data,
            backgroundColor: COLORS.viral + "cc",
            borderColor: COLORS.viral,
            borderWidth: 1,
          },
        ],
      },
      options: opts,
    });
  }

  function ensureViralCumulativeChart(rows) {
    const ctx = document
      .getElementById("chartViralCumulative")
      .getContext("2d");
    const labels = rows.map((r) => r.cycle);
    const data = rows.map((r) => r.cumulative);

    if (charts.viralCumulative) {
      charts.viralCumulative.data.labels = labels;
      charts.viralCumulative.data.datasets[0].data = data;
      charts.viralCumulative.update();
      return;
    }
    const opts = baseChartOpts();
    opts.scales.x.title.text = "Cycle";
    charts.viralCumulative = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Cumulative subscribers",
            data,
            borderColor: COLORS.users,
            backgroundColor: COLORS.users + "22",
            tension: 0.25,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
          },
        ],
      },
      options: opts,
    });
  }

  // ---------- Tables ----------

  function renderTable(tbodySel, rows) {
    const tbody = $(tbodySel);
    const html = rows
      .map((r) => {
        const cell = (v, opts = {}) => {
          const cls = opts.muted ? ' class="muted"' : "";
          return `<td${cls}>${v === 0 || !v ? "—" : fmtInt(v)}</td>`;
        };
        return `
          <tr>
            <td>${r.month}</td>
            ${cell(r.usersStart)}
            ${cell(r.launch)}
            ${cell(r.appstore)}
            ${cell(r.direct)}
            ${cell(r.viral)}
            ${cell(r.gross)}
            <td class="negative">${
              r.loss === 0 ? "—" : `(${fmtInt(r.loss)})`
            }</td>
            ${cell(r.net)}
          </tr>`;
      })
      .join("");
    tbody.innerHTML = html;
  }

  // ---------- Recompute pipelines ----------

  function recomputeSimple() {
    const launch = num("s_launch");
    const appDownloads = num("s_appDownloads");
    const appActivate = num("s_appActivate") / 100;
    const directDownloads = num("s_directDownloads");
    const directActivate = num("s_directActivate") / 100;
    const viralFactor = num("s_viral");
    const lossPct = num("s_loss") / 100;
    const months = Math.max(1, Math.min(60, Math.round(num("s_months"))));

    const appstore = appDownloads * appActivate;
    const direct = directDownloads * directActivate;

    setOutput("s_appNet", fmtInt(appstore));
    setOutput("s_directNet", fmtInt(direct));

    const rows = computeSimple({
      launch,
      appstore,
      direct,
      viralFactor,
      lossPct,
      months,
    });

    ensureUsersChart("chartSimpleUsers", "simpleUsers", rows);
    ensureChannelsChart("chartSimpleChannels", "simpleChannels", rows);
    renderTable("#tableSimple tbody", rows);
  }

  function recomputeCurves() {
    const launch = num("c_launch");
    const appDownloads = num("c_appDownloads");
    const appActivate = num("c_appActivate") / 100;
    const directDownloads = num("c_directDownloads");
    const directActivate = num("c_directActivate") / 100;
    const viralDecay = num("c_viralDecay");
    const v1 = num("c_viral1");

    const retention = [
      num("c_ret1") / 100,
      num("c_ret2") / 100,
      num("c_ret3") / 100,
      num("c_ret4") / 100,
      num("c_ret5") / 100,
      num("c_ret6") / 100,
    ];

    // Viral factors month 2..6 are derived from month 1 by geometric decay,
    // matching the original spreadsheet's convention. Month 6 is shown as
    // 0.01 in the reference because of rounding (true value ≈ 0.0125).
    const viral = [
      v1,
      v1 * Math.pow(viralDecay, 1),
      v1 * Math.pow(viralDecay, 2),
      v1 * Math.pow(viralDecay, 3),
      v1 * Math.pow(viralDecay, 4),
      v1 * Math.pow(viralDecay, 5),
    ];

    const months = Math.max(1, Math.min(60, Math.round(num("c_months"))));

    const appstore = appDownloads * appActivate;
    const direct = directDownloads * directActivate;

    setOutput("c_appNet", fmtInt(appstore));
    setOutput("c_directNet", fmtInt(direct));
    setOutput("c_viral2", fmtFactor(viral[1]));
    setOutput("c_viral3", fmtFactor(viral[2]));
    setOutput("c_viral4", fmtFactor(viral[3]));
    setOutput("c_viral5", fmtFactor(viral[4]));
    setOutput("c_viral6", fmtFactor(viral[5]));
    const lifetime = viral.reduce((a, b) => a + b, 0);
    setOutput("c_viralLifetime", fmtFactor(lifetime));

    const rows = computeCurves({
      launch,
      appstore,
      direct,
      retention,
      viral,
      viralDecay,
      months,
    });

    ensureUsersChart("chartCurvesUsers", "curvesUsers", rows);
    ensureChannelsChart("chartCurvesChannels", "curvesChannels", rows);
    renderTable("#tableCurves tbody", rows);
  }

  function renderViralTable(rows) {
    const tbody = $("#tableViral tbody");
    tbody.innerHTML = rows
      .map(
        (r) => `
        <tr>
          <td>${r.cycle}</td>
          <td>${Math.round(r.day).toLocaleString("en-US")}</td>
          <td>${fmtInt(r.newUsers)}</td>
          <td>${fmtInt(r.shares)}</td>
          <td>${fmtInt(r.cumulative)}</td>
        </tr>`,
      )
      .join("");
  }

  function recomputeViral() {
    const seed = num("v_seed");
    const participation = num("v_participation") / 100;
    const shares = num("v_shares");
    const conversion = num("v_conversion") / 100;
    const cycleDays = Math.max(0.5, num("v_cycleDays"));
    const totalDays = Math.max(1, num("v_totalDays"));

    const result = computeViral({
      seed,
      participation,
      shares,
      conversion,
      cycleDays,
      totalDays,
    });

    setOutput("v_k", result.K.toFixed(2));
    setOutput("v_cycles", result.cycles);

    // KPIs
    const kpiK = $('[data-output="v_kpiK"]');
    kpiK.textContent = result.K.toFixed(2);
    kpiK.classList.remove("is-positive", "is-negative", "is-accent");
    if (result.K > 1) kpiK.classList.add("is-positive");
    else if (result.K < 1) kpiK.classList.add("is-negative");
    else kpiK.classList.add("is-accent");

    let kHint;
    if (result.K > 1) kHint = "Exponential growth";
    else if (result.K === 1) kHint = "Linear growth";
    else kHint = "Decaying — bounded reach";
    setOutput("v_kpiKHint", kHint);

    const total = result.rows[result.rows.length - 1]?.cumulative ?? seed;
    setOutput("v_kpiTotal", fmtInt(total));

    const lift = seed > 0 ? total / seed : 0;
    setOutput("v_kpiLift", `${lift.toFixed(2)}×`);

    if (isFinite(result.ceiling)) {
      setOutput("v_kpiCeiling", fmtInt(result.ceiling));
      setOutput("v_kpiCeilingHint", `seed / (1 − K)`);
    } else {
      setOutput("v_kpiCeiling", "∞");
      setOutput("v_kpiCeilingHint", "Unbounded (K ≥ 1)");
    }

    ensureViralPerCycleChart(result.rows);
    ensureViralCumulativeChart(result.rows);
    renderViralTable(result.rows);
  }

  // ---------- Wire up ----------

  function attachInputs(prefix, recompute) {
    $$(`[data-input^="${prefix}"]`).forEach((el) => {
      el.addEventListener("input", recompute);
      el.addEventListener("change", recompute);
    });
  }

  attachInputs("s_", recomputeSimple);
  attachInputs("c_", recomputeCurves);
  attachInputs("v_", recomputeViral);

  // Initial render.
  recomputeSimple();
  recomputeCurves();
  recomputeViral();
})();
