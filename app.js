(() => {
  "use strict";

  // ---------- i18n ----------

  const TRANSLATIONS = {
    en: {
      "meta.title": "Growth Calc — Growth, Retention & Virality Models",
      "meta.description":
        "Interactive growth model calculator for growth hackers. Hybrid acquisition model with simple loss, plus a cohort-based model with retention and virality decay curves.",
      "brand.name": "Growth Calc",

      "tabs.simple": "Simple Loss",
      "tabs.curves": "Retention &amp; Virality Curves",
      "tabs.viral": "Viral Coefficient",
      "tabs.about": "About",

      "share.button": "Share",
      "share.copied": "Link copied to clipboard",
      "share.failed": "Couldn't copy — copy from the address bar instead",

      "preset.label": "Industry preset",
      "preset.source": "Source ↗",
      "preset.custom": "Custom",
      "preset.saas": "B2B SaaS",
      "preset.mobileApp": "Consumer Mobile App",
      "preset.game": "Mobile Game",
      "preset.ecommerce": "E-commerce",
      "preset.social": "Social / UGC",
      "preset.fintech": "Fintech",
      "preset.note.saas":
        "OpenView 2024 SaaS Benchmarks + Mixpanel product benchmarks. Mid-market B2B.",
      "preset.note.mobileApp":
        "AppsFlyer State of App Marketing 2024 + data.ai 2024. Non-gaming consumer apps.",
      "preset.note.game":
        "GameAnalytics + AppsFlyer Gaming 2024. Mid-core mobile game.",
      "preset.note.ecommerce":
        "Klaviyo + Shopify 2024 retention benchmarks. DTC / mid-market.",
      "preset.note.social":
        "Mixpanel Product Benchmarks + public Meta/Snap/TikTok disclosures.",
      "preset.note.fintech":
        "Adjust Fintech 2024 + OpenView Fintech tracker.",

      "vars.title": "Variables",
      "vars.launch": "Launch press",
      "vars.launchUsers": "One-time launch users",
      "vars.paid": "Paid (App store)",
      "vars.nonpaid": "Non-paid (Direct traffic)",
      "vars.appDownloads": "App store downloads / month",
      "vars.directDownloads": "Direct traffic downloads / month",
      "vars.activate": "% who activate",
      "vars.appNet": "App store search growth / month",
      "vars.directNet": "Direct traffic growth / month",
      "vars.viralityLoss": "Virality &amp; loss",
      "vars.viralFactor": "Viral factor (i × c = k)",
      "vars.lossPct": "% of users lost / month",
      "vars.horizon": "Horizon",
      "vars.months": "Months to project",

      "cards.users": "Users (month start)",
      "cards.channels": "Growth channels and user loss",
      "cards.output": "Output",

      "cols.month": "Month",
      "cols.users": "Users (month start)",
      "cols.launch": "Launch press",
      "cols.appstore": "App store",
      "cols.direct": "Direct traffic",
      "cols.viral": "Viral growth",
      "cols.gross": "Gross growth",
      "cols.loss": "Loss",
      "cols.net": "Net growth",

      "simple.title": "The Hybrid Model, with Simple Loss",
      "simple.subtitle":
        "Paid + non-paid + viral acquisition, with a flat monthly loss rate. Useful as a sanity check before layering on retention curves.",

      "curves.title":
        "The Hybrid Model, with Retention &amp; Virality Curves",
      "curves.subtitle":
        "Cohort-based projection. Each acquisition cohort retains along a curve and contributes virality that decays month-over-month.",
      "curves.appStoreGrowth": "App store search growth",
      "curves.directGrowth": "Direct traffic growth",
      "curves.activated": "Activated users / month",
      "curves.virality": "Virality (decay curve)",
      "curves.participation": "% of users who share",
      "curves.shares": "Avg shares per sharer (i)",
      "curves.conversion": "Conversion per share (c)",
      "curves.viral1": "Viral factor month 1 (K)",
      "curves.viralDecay": "Viral factor decay",
      "curves.viral2": "Viral factor month 2",
      "curves.viral3": "Viral factor month 3",
      "curves.viral4": "Viral factor month 4",
      "curves.viral5": "Viral factor month 5",
      "curves.viral6": "Viral factor month 6",
      "curves.lifetime": "Lifetime viral factor",
      "curves.retention": "Retention curve",
      "curves.ret1": "Retention month 0 → 1",
      "curves.ret2": "Retention month 0 → 2",
      "curves.ret3": "Retention month 0 → 3",
      "curves.ret4": "Retention month 0 → 4",
      "curves.ret5": "Retention month 0 → 5",
      "curves.ret6": "Retention month 0 → 6",
      "curves.retentionHint":
        "Months 7+ stay flat at the month 6 retention rate (steady state).",

      "viral.title": "Viral Coefficient Calculator",
      "viral.subtitle":
        "How big does a viral campaign get? Each user shares with <em>i</em> people; a fraction <em>c</em> of them sign up. The viral coefficient <strong>K = i × c</strong> determines whether growth explodes (K &gt; 1), stabilizes (K = 1), or decays toward a ceiling (K &lt; 1).",
      "viral.seedAudience": "Seed audience",
      "viral.startingSubs": "Starting subscribers",
      "viral.sharingBehavior": "Sharing behavior",
      "viral.kCoefficient": "Viral coefficient (K)",
      "viral.time": "Time",
      "viral.cycleTime": "Cycle time (days)",
      "viral.campaignLength": "Campaign length (days)",
      "viral.cyclesInCampaign": "Cycles in campaign",
      "viral.kpiTotal": "Total subscribers",
      "viral.kpiTotalHint": "After campaign",
      "viral.kpiLift": "Viral lift",
      "viral.kpiLiftHint": "Multiple of seed",
      "viral.kpiCeiling": "Theoretical reach",
      "viral.kpiCeilingBounded": "seed / (1 − K)",
      "viral.kpiCeilingUnbounded": "Unbounded (K ≥ 1)",
      "viral.regimeExp": "Exponential growth",
      "viral.regimeLin": "Linear growth",
      "viral.regimeDec": "Decaying — bounded reach",
      "viral.perCycleChart": "New subscribers per cycle",
      "viral.cumulativeChart": "Cumulative subscribers",
      "viral.perCycleOutput": "Per-cycle output",
      "viral.cycle": "Cycle",
      "viral.day": "Day",
      "viral.newSubs": "New subscribers",
      "viral.sharesSent": "Shares sent",
      "viral.cumulative": "Cumulative",

      "about.title": "About these models",
      "about.intro":
        "Two classic growth-hacking models for projecting how an app's user base evolves over time. Plug in your acquisition channels, your virality, and your retention — see how they interact.",
      "about.simpleH": "Simple Loss",
      "about.simpleP":
        "Each month a flat percentage of the existing user base is lost. Virality is modeled as <code>viral[m] = gross_growth[m-1] × k</code>, i.e. last month's new users invite their friends. Useful for a quick back-of-envelope, but real retention is rarely a flat percentage.",
      "about.curvesH": "Retention &amp; Virality Curves",
      "about.curvesP1":
        "Cohort-based. Each acquisition cohort retains along the configured retention curve, and each cohort generates virality that decays month-over-month. New users at the start of each month are the sum of every prior cohort weighted by retention:",
      "about.curvesP2":
        "Months 7+ use the month 6 retention as a steady-state floor. Viral factor decays geometrically past month 6.",
      "about.viralH": "Viral Coefficient",
      "about.viralP":
        "Per-cycle exponential model. <code>K = participation × i × c</code>, where <em>i</em> is the average shares per active sharer and <em>c</em> is the conversion rate per share. New subscribers in cycle <em>n</em> are <code>seed × Kⁿ</code>; cumulative subscribers after <em>N</em> cycles are <code>seed × (K^(N+1) − 1) / (K − 1)</code>.",
      "about.viralKlt1":
        "<strong>K &lt; 1</strong>: growth decays. Theoretical max reach with infinite time is <code>seed / (1 − K)</code>.",
      "about.viralKeq1":
        "<strong>K = 1</strong>: each cycle adds the same number of users (linear growth, no ceiling).",
      "about.viralKgt1":
        "<strong>K &gt; 1</strong>: pure exponential. In reality saturation and decay kick in; layer this on top of retention curves above for a realistic projection.",
      "about.notesH": "Notes",
      "about.note1":
        "All values recompute live — there's no \"calculate\" button. Tweak an input and the charts &amp; table update instantly.",
      "about.note2":
        "Numbers in the table are rounded for display; the underlying math is fractional, so totals reconcile.",
      "about.note3":
        "Use the <em>Months to project</em> input at the bottom of the variables column to extend the horizon.",
    },

    ko: {
      "meta.title": "Growth Calc — 성장, 리텐션 & 바이럴 모델",
      "meta.description":
        "그로스 해커를 위한 인터랙티브 성장 모델 계산기. 단순 이탈을 적용한 하이브리드 획득 모델과, 리텐션 및 바이럴 감쇠 곡선을 적용한 코호트 기반 모델을 제공합니다.",
      "brand.name": "Growth Calc",

      "tabs.simple": "단순 이탈",
      "tabs.curves": "리텐션 & 바이럴 곡선",
      "tabs.viral": "바이럴 계수",
      "tabs.about": "소개",

      "share.button": "공유",
      "share.copied": "링크가 복사되었습니다",
      "share.failed": "복사에 실패했어요 — 주소창에서 직접 복사해 주세요",

      "preset.label": "업종 프리셋",
      "preset.source": "출처 ↗",
      "preset.custom": "사용자 정의",
      "preset.saas": "B2B SaaS",
      "preset.mobileApp": "소비자 모바일 앱",
      "preset.game": "모바일 게임",
      "preset.ecommerce": "이커머스",
      "preset.social": "소셜 / UGC",
      "preset.fintech": "핀테크",
      "preset.note.saas":
        "OpenView 2024 SaaS Benchmarks + Mixpanel 제품 벤치마크. 중견 B2B 기준.",
      "preset.note.mobileApp":
        "AppsFlyer State of App Marketing 2024 + data.ai 2024. 비게임 소비자 앱.",
      "preset.note.game":
        "GameAnalytics + AppsFlyer Gaming 2024. 미드코어 모바일 게임 기준.",
      "preset.note.ecommerce":
        "Klaviyo + Shopify 2024 리텐션 벤치마크. DTC / 중견 기준.",
      "preset.note.social":
        "Mixpanel 제품 벤치마크 + Meta/Snap/TikTok 공개 자료 종합.",
      "preset.note.fintech":
        "Adjust Fintech 2024 + OpenView Fintech 트래커.",

      "vars.title": "변수",
      "vars.launch": "런칭 홍보",
      "vars.launchUsers": "일회성 런칭 사용자",
      "vars.paid": "유료 (앱스토어)",
      "vars.nonpaid": "비유료 (직접 트래픽)",
      "vars.appDownloads": "월별 앱스토어 다운로드",
      "vars.directDownloads": "월별 직접 트래픽 다운로드",
      "vars.activate": "활성화율",
      "vars.appNet": "월별 앱스토어 검색 유입",
      "vars.directNet": "월별 직접 트래픽 유입",
      "vars.viralityLoss": "바이럴 & 이탈",
      "vars.viralFactor": "바이럴 팩터 (i × c = k)",
      "vars.lossPct": "월별 사용자 이탈률",
      "vars.horizon": "예측 기간",
      "vars.months": "예측할 개월 수",

      "cards.users": "월 시작 사용자",
      "cards.channels": "성장 채널 및 이탈",
      "cards.output": "결과",

      "cols.month": "월",
      "cols.users": "월 시작 사용자",
      "cols.launch": "런칭 홍보",
      "cols.appstore": "앱스토어",
      "cols.direct": "직접 트래픽",
      "cols.viral": "바이럴 성장",
      "cols.gross": "총 성장",
      "cols.loss": "이탈",
      "cols.net": "순 성장",

      "simple.title": "단순 이탈을 적용한 하이브리드 모델",
      "simple.subtitle":
        "유료 + 비유료 + 바이럴 획득에 매월 일정 이탈률을 적용한 모델입니다. 리텐션 곡선을 더하기 전, 빠른 검산용으로 유용합니다.",

      "curves.title": "리텐션 & 바이럴 곡선을 적용한 하이브리드 모델",
      "curves.subtitle":
        "코호트 기반 예측입니다. 각 획득 코호트는 곡선을 따라 잔존하며, 매월 감쇠하는 바이럴 효과를 만들어냅니다.",
      "curves.appStoreGrowth": "앱스토어 검색 유입",
      "curves.directGrowth": "직접 트래픽 유입",
      "curves.activated": "월별 활성 사용자",
      "curves.virality": "바이럴 (감쇠 곡선)",
      "curves.participation": "공유 참여율",
      "curves.shares": "사용자당 평균 공유 수 (i)",
      "curves.conversion": "공유당 전환율 (c)",
      "curves.viral1": "1개월차 바이럴 팩터 (K)",
      "curves.viralDecay": "바이럴 팩터 감쇠",
      "curves.viral2": "2개월차 바이럴 팩터",
      "curves.viral3": "3개월차 바이럴 팩터",
      "curves.viral4": "4개월차 바이럴 팩터",
      "curves.viral5": "5개월차 바이럴 팩터",
      "curves.viral6": "6개월차 바이럴 팩터",
      "curves.lifetime": "누적 바이럴 팩터",
      "curves.retention": "리텐션 곡선",
      "curves.ret1": "0 → 1개월 리텐션",
      "curves.ret2": "0 → 2개월 리텐션",
      "curves.ret3": "0 → 3개월 리텐션",
      "curves.ret4": "0 → 4개월 리텐션",
      "curves.ret5": "0 → 5개월 리텐션",
      "curves.ret6": "0 → 6개월 리텐션",
      "curves.retentionHint":
        "7개월 이후는 6개월차 리텐션을 정상 상태로 유지합니다.",

      "viral.title": "바이럴 계수 계산기",
      "viral.subtitle":
        "바이럴 캠페인은 얼마나 커질까요? 각 사용자가 <em>i</em>명에게 공유하고, 그중 비율 <em>c</em>가 가입합니다. 바이럴 계수 <strong>K = i × c</strong>가 성장이 폭발할지(K &gt; 1), 안정될지(K = 1), 한계점을 향해 감쇠할지(K &lt; 1) 결정합니다.",
      "viral.seedAudience": "시드 사용자",
      "viral.startingSubs": "초기 구독자 수",
      "viral.sharingBehavior": "공유 행동",
      "viral.kCoefficient": "바이럴 계수 (K)",
      "viral.time": "기간",
      "viral.cycleTime": "사이클 주기 (일)",
      "viral.campaignLength": "캠페인 기간 (일)",
      "viral.cyclesInCampaign": "캠페인 내 사이클 수",
      "viral.kpiTotal": "총 구독자",
      "viral.kpiTotalHint": "캠페인 종료 후",
      "viral.kpiLift": "바이럴 증폭",
      "viral.kpiLiftHint": "시드 대비 배수",
      "viral.kpiCeiling": "이론적 도달",
      "viral.kpiCeilingBounded": "seed / (1 − K)",
      "viral.kpiCeilingUnbounded": "무제한 (K ≥ 1)",
      "viral.regimeExp": "지수 성장",
      "viral.regimeLin": "선형 성장",
      "viral.regimeDec": "감쇠 — 제한된 도달",
      "viral.perCycleChart": "사이클별 신규 구독자",
      "viral.cumulativeChart": "누적 구독자",
      "viral.perCycleOutput": "사이클별 결과",
      "viral.cycle": "사이클",
      "viral.day": "일",
      "viral.newSubs": "신규 구독자",
      "viral.sharesSent": "발송된 공유 수",
      "viral.cumulative": "누적",

      "about.title": "모델 소개",
      "about.intro":
        "앱 사용자 기반의 시간에 따른 변화를 예측하는 두 가지 고전적인 그로스 해킹 모델입니다. 획득 채널, 바이럴리티, 리텐션을 입력해 상호작용을 살펴보세요.",
      "about.simpleH": "단순 이탈",
      "about.simpleP":
        "매월 기존 사용자 기반의 일정 비율이 이탈합니다. 바이럴은 <code>viral[m] = gross_growth[m-1] × k</code>로 모델링되며, 즉 지난달 신규 사용자들이 친구를 초대하는 형태입니다. 빠른 추정에 유용하지만, 실제 리텐션이 일정한 비율인 경우는 드뭅니다.",
      "about.curvesH": "리텐션 & 바이럴 곡선",
      "about.curvesP1":
        "코호트 기반입니다. 각 획득 코호트는 설정된 리텐션 곡선을 따라 잔존하며, 매월 감쇠하는 바이럴 효과를 만들어냅니다. 매월 시작 시 사용자는 모든 이전 코호트를 리텐션으로 가중한 합입니다:",
      "about.curvesP2":
        "7개월 이후에는 6개월차 리텐션을 정상 상태 하한으로 사용합니다. 바이럴 팩터는 6개월 이후 기하급수적으로 감쇠합니다.",
      "about.viralH": "바이럴 계수",
      "about.viralP":
        "사이클별 지수 모델입니다. <code>K = 참여율 × i × c</code>이며, 여기서 <em>i</em>는 활성 공유자 1인당 평균 공유 수, <em>c</em>는 공유당 전환율입니다. 사이클 <em>n</em>의 신규 구독자는 <code>seed × Kⁿ</code>; <em>N</em> 사이클 후 누적 구독자는 <code>seed × (K^(N+1) − 1) / (K − 1)</code>입니다.",
      "about.viralKlt1":
        "<strong>K &lt; 1</strong>: 성장이 감쇠합니다. 무한 시간에서의 이론적 최대 도달은 <code>seed / (1 − K)</code>입니다.",
      "about.viralKeq1":
        "<strong>K = 1</strong>: 각 사이클마다 동일한 수의 사용자가 추가됩니다 (선형 성장, 한계 없음).",
      "about.viralKgt1":
        "<strong>K &gt; 1</strong>: 순수 지수 성장. 실제로는 포화와 감쇠가 함께 작동하므로, 더 현실적인 예측을 위해 위의 리텐션 곡선과 결합해서 사용하세요.",
      "about.notesH": "참고",
      "about.note1":
        "모든 값은 실시간으로 재계산됩니다 — \"계산\" 버튼이 없습니다. 입력을 변경하면 차트와 표가 즉시 업데이트됩니다.",
      "about.note2":
        "표의 숫자는 표시용으로 반올림되지만, 내부 계산은 소수로 처리되므로 합계가 정확히 맞춰집니다.",
      "about.note3":
        "변수 열 하단의 <em>예측할 개월 수</em> 입력으로 예측 기간을 늘릴 수 있습니다.",
    },
  };

  const STORAGE_KEY = "growthcalc.lang";
  let currentLang =
    localStorage.getItem(STORAGE_KEY) === "ko" ? "ko" : "en";

  function t(key) {
    return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.en[key] ?? key;
  }

  function applyTranslations() {
    document.documentElement.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      const attrName = el.getAttribute("data-i18n-attr");
      if (attrName) {
        el.setAttribute(attrName, value);
      } else {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll(".lang").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
    });
  }

  // ---------- Industry presets ----------
  //
  // Each preset fills every input across all three calculators with a
  // representative mid-range value drawn from the cited public benchmark
  // report. Numbers are rounded for legibility — they're starting points,
  // not commitments. The user can edit any field; the dropdown then
  // automatically switches to "Custom" so the citation doesn't lie.
  //
  // Sources are labeled with the publication year. We deliberately don't
  // claim "2025 official" since most public benchmark reports are
  // published with a one-year lag; the ranges shift slowly enough that
  // 2024 reports are still the most authoritative reference today.

  const PRESETS = {
    saas: {
      noteKey: "preset.note.saas",
      sourceUrl: "https://openviewpartners.com/blog/saas-benchmarks-report/",
      values: {
        // Simple Loss
        s_launch: 500,
        s_appDownloads: 0,
        s_appActivate: 30,
        s_directDownloads: 800,
        s_directActivate: 35,
        s_viral: 0.09,
        s_loss: 4,
        s_months: 12,
        // Curves
        c_launch: 500,
        c_appDownloads: 1000,
        c_appActivate: 30,
        c_directDownloads: 2000,
        c_directActivate: 35,
        c_participation: 15,
        c_shares: 2,
        c_conversion: 30,
        c_viralDecay: 0.6,
        c_ret1: 90,
        c_ret2: 85,
        c_ret3: 80,
        c_ret4: 77,
        c_ret5: 74,
        c_ret6: 70,
        c_months: 12,
        // Viral coefficient
        v_seed: 500,
        v_participation: 15,
        v_shares: 2,
        v_conversion: 30,
        v_cycleDays: 14,
        v_totalDays: 90,
      },
    },

    mobileApp: {
      noteKey: "preset.note.mobileApp",
      sourceUrl:
        "https://www.appsflyer.com/resources/reports/state-of-app-marketing/",
      values: {
        s_launch: 5000,
        s_appDownloads: 8000,
        s_appActivate: 55,
        s_directDownloads: 2000,
        s_directActivate: 50,
        s_viral: 0.18,
        s_loss: 55,
        s_months: 12,
        c_launch: 5000,
        c_appDownloads: 8000,
        c_appActivate: 55,
        c_directDownloads: 4000,
        c_directActivate: 50,
        c_participation: 25,
        c_shares: 3,
        c_conversion: 18,
        c_viralDecay: 0.5,
        c_ret1: 30,
        c_ret2: 18,
        c_ret3: 12,
        c_ret4: 9,
        c_ret5: 7,
        c_ret6: 5,
        c_months: 12,
        v_seed: 5000,
        v_participation: 25,
        v_shares: 3,
        v_conversion: 18,
        v_cycleDays: 7,
        v_totalDays: 60,
      },
    },

    game: {
      noteKey: "preset.note.game",
      sourceUrl:
        "https://gameanalytics.com/reports/mobile-gaming-industry-analysis/",
      values: {
        s_launch: 10000,
        s_appDownloads: 15000,
        s_appActivate: 70,
        s_directDownloads: 3000,
        s_directActivate: 65,
        s_viral: 0.075,
        s_loss: 70,
        s_months: 12,
        c_launch: 10000,
        c_appDownloads: 15000,
        c_appActivate: 70,
        c_directDownloads: 5000,
        c_directActivate: 65,
        c_participation: 25,
        c_shares: 2.5,
        c_conversion: 12,
        c_viralDecay: 0.4,
        c_ret1: 35,
        c_ret2: 20,
        c_ret3: 13,
        c_ret4: 9,
        c_ret5: 6,
        c_ret6: 4,
        c_months: 12,
        v_seed: 10000,
        v_participation: 25,
        v_shares: 2.5,
        v_conversion: 12,
        v_cycleDays: 5,
        v_totalDays: 30,
      },
    },

    ecommerce: {
      noteKey: "preset.note.ecommerce",
      sourceUrl: "https://www.klaviyo.com/marketing-resources/benchmarks",
      values: {
        s_launch: 2000,
        s_appDownloads: 0,
        s_appActivate: 25,
        s_directDownloads: 8000,
        s_directActivate: 25,
        s_viral: 0.04,
        s_loss: 65,
        s_months: 12,
        c_launch: 2000,
        c_appDownloads: 3000,
        c_appActivate: 30,
        c_directDownloads: 12000,
        c_directActivate: 25,
        c_participation: 12,
        c_shares: 1.5,
        c_conversion: 18,
        c_viralDecay: 0.45,
        c_ret1: 25,
        c_ret2: 18,
        c_ret3: 15,
        c_ret4: 13,
        c_ret5: 12,
        c_ret6: 10,
        c_months: 12,
        v_seed: 2000,
        v_participation: 12,
        v_shares: 1.5,
        v_conversion: 18,
        v_cycleDays: 14,
        v_totalDays: 60,
      },
    },

    social: {
      noteKey: "preset.note.social",
      sourceUrl: "https://mixpanel.com/blog/product-benchmarks/",
      values: {
        s_launch: 8000,
        s_appDownloads: 20000,
        s_appActivate: 70,
        s_directDownloads: 5000,
        s_directActivate: 65,
        s_viral: 0.35,
        s_loss: 35,
        s_months: 12,
        c_launch: 8000,
        c_appDownloads: 20000,
        c_appActivate: 70,
        c_directDownloads: 8000,
        c_directActivate: 65,
        c_participation: 35,
        c_shares: 4,
        c_conversion: 25,
        c_viralDecay: 0.55,
        c_ret1: 50,
        c_ret2: 35,
        c_ret3: 27,
        c_ret4: 22,
        c_ret5: 19,
        c_ret6: 16,
        c_months: 12,
        v_seed: 8000,
        v_participation: 35,
        v_shares: 4,
        v_conversion: 25,
        v_cycleDays: 3,
        v_totalDays: 30,
      },
    },

    fintech: {
      noteKey: "preset.note.fintech",
      sourceUrl: "https://www.adjust.com/resources/ebooks/",
      values: {
        s_launch: 3000,
        s_appDownloads: 4000,
        s_appActivate: 20,
        s_directDownloads: 1500,
        s_directActivate: 25,
        s_viral: 0.12,
        s_loss: 8,
        s_months: 12,
        c_launch: 3000,
        c_appDownloads: 4000,
        c_appActivate: 20,
        c_directDownloads: 2000,
        c_directActivate: 25,
        c_participation: 20,
        c_shares: 2,
        c_conversion: 30,
        c_viralDecay: 0.55,
        c_ret1: 75,
        c_ret2: 65,
        c_ret3: 58,
        c_ret4: 53,
        c_ret5: 49,
        c_ret6: 45,
        c_months: 12,
        v_seed: 3000,
        v_participation: 20,
        v_shares: 2,
        v_conversion: 30,
        v_cycleDays: 14,
        v_totalDays: 90,
      },
    },
  };

  let currentPreset = "custom";
  // Set true while we're programmatically setting input values from a
  // preset, so the input event handler doesn't immediately flip back to
  // "Custom".
  let applyingPreset = false;

  function updatePresetUI() {
    const select = document.getElementById("presetSelect");
    if (select) select.value = currentPreset;

    const link = document.getElementById("presetSource");
    const note = document.getElementById("presetNote");
    const preset = PRESETS[currentPreset];
    if (preset && link) {
      link.href = preset.sourceUrl;
      link.hidden = false;
    } else if (link) {
      link.removeAttribute("href");
      link.hidden = true;
    }
    if (note) {
      note.textContent = preset ? t(preset.noteKey) : "";
    }
  }

  function applyPreset(name, opts = {}) {
    const preset = PRESETS[name];
    if (!preset) {
      currentPreset = "custom";
      updatePresetUI();
      if (opts.syncURL !== false) syncStateToURL();
      return;
    }
    applyingPreset = true;
    Object.entries(preset.values).forEach(([key, value]) => {
      const el = document.querySelector(`[data-input="${key}"]`);
      if (el) el.value = value;
    });
    applyingPreset = false;
    currentPreset = name;
    updatePresetUI();
    if (opts.recompute !== false) {
      recomputeSimple();
      recomputeCurves();
      recomputeViral();
    }
    if (opts.syncURL !== false) syncStateToURL();
  }

  // ---------- URL state sync ----------
  //
  // Every input value, the active tab, and the active language are mirrored
  // into the URL via history.replaceState so that the address bar always
  // contains a shareable snapshot. On load we read the URL back into the
  // form before any recompute, so that opening a shared link reproduces the
  // exact view the sender saw.

  let activeTab = "simple";

  function getInputs() {
    return document.querySelectorAll("[data-input]");
  }

  function syncStateToURL() {
    const params = new URLSearchParams();
    params.set("lang", currentLang);
    params.set("tab", activeTab);
    params.set("preset", currentPreset);
    getInputs().forEach((el) => {
      params.set(el.dataset.input, el.value);
    });
    const url = `${location.pathname}?${params.toString()}`;
    history.replaceState(null, "", url);
  }

  function applyStateFromURL() {
    const params = new URLSearchParams(location.search);

    const langParam = params.get("lang");
    if (langParam === "ko" || langParam === "en") {
      currentLang = langParam;
    }

    const tabParam = params.get("tab");
    const validTabs = ["simple", "curves", "viral", "about"];
    if (tabParam && validTabs.includes(tabParam)) {
      activeTab = tabParam;
    }

    // Preset: if a recognized preset name is in the URL, apply its values
    // first. Individual values from the URL then override only the
    // specific fields the sender tweaked. This keeps shared links small
    // (just preset=saas) while still preserving any custom edits.
    const presetParam = params.get("preset");
    if (presetParam && PRESETS[presetParam]) {
      currentPreset = presetParam;
      const preset = PRESETS[presetParam];
      Object.entries(preset.values).forEach(([key, value]) => {
        const el = document.querySelector(`[data-input="${key}"]`);
        if (el) el.value = value;
      });
    } else {
      currentPreset = "custom";
    }

    getInputs().forEach((el) => {
      const v = params.get(el.dataset.input);
      if (v !== null && v !== "") el.value = v;
    });
  }

  function setActiveTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tab").forEach((t) => {
      const isActive = t.dataset.tab === tab;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    document.querySelectorAll(".model").forEach((m) => {
      m.classList.toggle("is-hidden", m.id !== `tab-${tab}`);
    });
  }

  let toastTimer = null;
  function showToast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    el.setAttribute("aria-hidden", "false");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("is-visible");
      el.setAttribute("aria-hidden", "true");
    }, 2000);
  }

  async function copyShareLink() {
    syncStateToURL(); // ensure URL is fresh before copying
    const url = location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-secure contexts (e.g. http:// preview).
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("execCommand failed");
      }
      showToast(t("share.copied"));
    } catch (e) {
      showToast(t("share.failed"));
    }
  }

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
      setActiveTab(btn.dataset.tab);
      // Charts can mis-size if hidden when first drawn; ask them to resize.
      Object.values(charts).forEach((c) => c && c.resize());
      syncStateToURL();
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
        title: { display: true, text: t("cols.month") },
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
    const datasetLabel = t("cards.users");

    if (charts[key]) {
      charts[key].data.labels = labels;
      charts[key].data.datasets[0].data = data;
      charts[key].data.datasets[0].label = datasetLabel;
      charts[key].options.scales.x.title.text = t("cols.month");
      charts[key].update();
      return;
    }
    charts[key] = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: datasetLabel,
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
        label: t("cols.launch"),
        data: rows.map((r) => r.launch),
        borderColor: COLORS.launch,
        backgroundColor: COLORS.launch + "22",
      },
      {
        label: t("cols.appstore"),
        data: rows.map((r) => r.appstore),
        borderColor: COLORS.appstore,
        backgroundColor: COLORS.appstore + "22",
      },
      {
        label: t("cols.direct"),
        data: rows.map((r) => r.direct),
        borderColor: COLORS.direct,
        backgroundColor: COLORS.direct + "22",
      },
      {
        label: t("cols.viral"),
        data: rows.map((r) => r.viral),
        borderColor: COLORS.viral,
        backgroundColor: COLORS.viral + "22",
      },
      {
        label: t("cols.loss"),
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
        ds.label = datasets[i].label;
      });
      charts[key].options.scales.x.title.text = t("cols.month");
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
    const datasetLabel = t("viral.newSubs");
    const axisLabel = t("viral.cycle");

    if (charts.viralPerCycle) {
      charts.viralPerCycle.data.labels = labels;
      charts.viralPerCycle.data.datasets[0].data = data;
      charts.viralPerCycle.data.datasets[0].label = datasetLabel;
      charts.viralPerCycle.options.scales.x.title.text = axisLabel;
      charts.viralPerCycle.update();
      return;
    }
    const opts = baseChartOpts();
    opts.scales.x.title.text = axisLabel;
    charts.viralPerCycle = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: datasetLabel,
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
    const datasetLabel = t("viral.cumulativeChart");
    const axisLabel = t("viral.cycle");

    if (charts.viralCumulative) {
      charts.viralCumulative.data.labels = labels;
      charts.viralCumulative.data.datasets[0].data = data;
      charts.viralCumulative.data.datasets[0].label = datasetLabel;
      charts.viralCumulative.options.scales.x.title.text = axisLabel;
      charts.viralCumulative.update();
      return;
    }
    const opts = baseChartOpts();
    opts.scales.x.title.text = axisLabel;
    charts.viralCumulative = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: datasetLabel,
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
    // Viral factor month 1 is K = participation × i × c, the standard
    // viral coefficient. Subsequent months decay geometrically.
    const participation = num("c_participation") / 100;
    const sharesPerUser = num("c_shares");
    const conversion = num("c_conversion") / 100;
    const v1 = participation * sharesPerUser * conversion;

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
    setOutput("c_viral1", fmtFactor(viral[0]));
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
    if (result.K > 1) kHint = t("viral.regimeExp");
    else if (result.K === 1) kHint = t("viral.regimeLin");
    else kHint = t("viral.regimeDec");
    setOutput("v_kpiKHint", kHint);

    const total = result.rows[result.rows.length - 1]?.cumulative ?? seed;
    setOutput("v_kpiTotal", fmtInt(total));

    const lift = seed > 0 ? total / seed : 0;
    setOutput("v_kpiLift", `${lift.toFixed(2)}×`);

    if (isFinite(result.ceiling)) {
      setOutput("v_kpiCeiling", fmtInt(result.ceiling));
      setOutput("v_kpiCeilingHint", t("viral.kpiCeilingBounded"));
    } else {
      setOutput("v_kpiCeiling", "∞");
      setOutput("v_kpiCeilingHint", t("viral.kpiCeilingUnbounded"));
    }

    ensureViralPerCycleChart(result.rows);
    ensureViralCumulativeChart(result.rows);
    renderViralTable(result.rows);
  }

  // ---------- Wire up ----------

  function attachInputs(prefix, recompute) {
    $$(`[data-input^="${prefix}"]`).forEach((el) => {
      const handler = () => {
        recompute();
        if (!applyingPreset && currentPreset !== "custom") {
          // User manually edited a preset value — drop the citation.
          currentPreset = "custom";
          updatePresetUI();
        }
        syncStateToURL();
      };
      el.addEventListener("input", handler);
      el.addEventListener("change", handler);
    });
  }

  attachInputs("s_", recomputeSimple);
  attachInputs("c_", recomputeCurves);
  attachInputs("v_", recomputeViral);

  // Language switcher.
  document.querySelectorAll(".lang").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      applyTranslations();
      // Re-render outputs so chart labels, KPI hints, and table-derived
      // text pick up the new locale.
      recomputeSimple();
      recomputeCurves();
      recomputeViral();
      syncStateToURL();
    });
  });

  // Share button.
  document.querySelectorAll('[data-action="share"]').forEach((btn) => {
    btn.addEventListener("click", copyShareLink);
  });

  // Industry preset dropdown.
  const presetSelect = document.getElementById("presetSelect");
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      applyPreset(e.target.value);
    });
  }

  // Initial render: read URL state first so inputs, lang, tab, and
  // preset match the shared link before anything is computed or drawn.
  applyStateFromURL();
  setActiveTab(activeTab);
  applyTranslations();
  // applyTranslations rewrites <option> labels; sync the dropdown's
  // selected value and source link based on the URL-derived preset.
  updatePresetUI();
  recomputeSimple();
  recomputeCurves();
  recomputeViral();
  syncStateToURL();
})();
