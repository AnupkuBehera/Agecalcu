/**
 * Age Calculator UI Application Script (Ultra-Premium Edition)
 * Inspired by Linear, Stripe, Raycast, and Apple
 * Features: Live Chrono Ticker, dual segmented/native date input,
 * astrological dossier, cultural calendars, 10,000-day milestone share card,
 * celebration micro-interactions, multi-language localization, and auto-calculate.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Multi-Language Localization System ---
  if (window.DobcalI18n) {
    window.DobcalI18n.initLanguage();
  }

  const globalLangSelect = document.getElementById('global-lang-select');
  const mobileLangSelect = document.getElementById('mobile-lang-select');
  const currentLang = window.DobcalI18n ? window.DobcalI18n.getLanguage() : 'en';
  if (globalLangSelect) globalLangSelect.value = currentLang;
  if (mobileLangSelect) mobileLangSelect.value = currentLang;

  function handleLanguageSwitch(lang) {
    if (window.DobcalI18n && lang) {
      window.DobcalI18n.setLanguage(lang);
      if (globalLangSelect) globalLangSelect.value = lang;
      if (mobileLangSelect) mobileLangSelect.value = lang;
      if (latestAgeResult) {
        calculateAge();
      }
    }
  }

  if (globalLangSelect) {
    globalLangSelect.addEventListener('change', (e) => handleLanguageSwitch(e.target.value));
  }
  if (mobileLangSelect) {
    mobileLangSelect.addEventListener('change', (e) => handleLanguageSwitch(e.target.value));
  }

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      handleLanguageSwitch(lang);
    });
  });

  // --- Theme Management ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-sun');
  const moonIcon = document.getElementById('theme-moon');

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    } else {
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  // --- Helper: Format Date to YYYY-MM-DD in Local Time ---
  function getLocalDateISO(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const todayStr = getLocalDateISO(today);
  const currentYear = today.getFullYear();

  // Update footer copyright year
  const copyrightYearEl = document.getElementById('current-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = currentYear;
  }

  // --- Tab Navigation (Age Calculator vs Date Difference) ---
  const tabBtnAge = document.getElementById('tab-btn-age');
  const tabBtnDiff = document.getElementById('tab-btn-diff');
  const sectionAge = document.getElementById('section-age');
  const sectionDiff = document.getElementById('section-diff');

  function switchTab(target) {
    if (target === 'age') {
      sectionAge.classList.remove('hidden');
      sectionDiff.classList.add('hidden');
      tabBtnAge.classList.add('active');
      tabBtnAge.classList.remove('text-slate-600', 'dark:text-slate-400');
      tabBtnAge.setAttribute('aria-current', 'page');

      tabBtnDiff.classList.remove('active');
      tabBtnDiff.classList.add('text-slate-600', 'dark:text-slate-400');
      tabBtnDiff.removeAttribute('aria-current');
    } else {
      sectionDiff.classList.remove('hidden');
      sectionAge.classList.add('hidden');
      tabBtnDiff.classList.add('active');
      tabBtnDiff.classList.remove('text-slate-600', 'dark:text-slate-400');
      tabBtnDiff.setAttribute('aria-current', 'page');

      tabBtnAge.classList.remove('active');
      tabBtnAge.classList.add('text-slate-600', 'dark:text-slate-400');
      tabBtnAge.removeAttribute('aria-current');
    }
  }

  if (tabBtnAge && tabBtnDiff) {
    tabBtnAge.addEventListener('click', () => switchTab('age'));
    tabBtnDiff.addEventListener('click', () => switchTab('diff'));
  }

  // --- Dual Date-of-Birth Input System (Segmented vs Direct Typing vs Native) ---
  const dobSegmentedContainer = document.getElementById('dob-segmented-container');
  const dobTypeContainer = document.getElementById('dob-type-container');
  const dobNativeContainer = document.getElementById('dob-native-container');
  const btnToggleDobMode = document.getElementById('btn-toggle-dob-mode');
  const dobDaySelect = document.getElementById('dob-day-select');
  const dobMonthSelect = document.getElementById('dob-month-select');
  const dobYearSelect = document.getElementById('dob-year-select');
  const dobTypeInput = document.getElementById('dob-type-input');
  const dobInput = document.getElementById('dob-input');

  let dobInputMode = 0; // 0: Segmented, 1: Direct Typing, 2: Native Calendar

  function setDobInputMode(mode) {
    dobInputMode = mode % 3;
    if (dobSegmentedContainer) dobSegmentedContainer.classList.add('hidden');
    if (dobTypeContainer) dobTypeContainer.classList.add('hidden');
    if (dobNativeContainer) dobNativeContainer.classList.add('hidden');

    if (dobInputMode === 0) {
      if (dobSegmentedContainer) dobSegmentedContainer.classList.remove('hidden');
      if (btnToggleDobMode) btnToggleDobMode.innerHTML = `<span>Switch to Direct Typing</span>`;
    } else if (dobInputMode === 1) {
      if (dobTypeContainer) dobTypeContainer.classList.remove('hidden');
      if (btnToggleDobMode) btnToggleDobMode.innerHTML = `<span>Switch to Calendar Picker</span>`;
      if (dobTypeInput) dobTypeInput.focus();
    } else if (dobInputMode === 2) {
      if (dobNativeContainer) dobNativeContainer.classList.remove('hidden');
      if (btnToggleDobMode) btnToggleDobMode.innerHTML = `<span>Switch to Dropdowns</span>`;
    }
  }

  if (btnToggleDobMode) {
    btnToggleDobMode.addEventListener('click', () => {
      setDobInputMode(dobInputMode + 1);
    });
  }

  function updateTypeInput(d, m, y) {
    if (dobTypeInput && d && m && y) {
      dobTypeInput.value = `${String(d).padStart(2, '0')} / ${String(m).padStart(2, '0')} / ${y}`;
    }
  }

  if (dobTypeInput) {
    dobTypeInput.addEventListener('input', (e) => {
      const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
      let formatted = '';
      if (raw.length > 0) {
        formatted = raw.slice(0, 2);
        if (raw.length >= 3) {
          formatted += ' / ' + raw.slice(2, 4);
        }
        if (raw.length >= 5) {
          formatted += ' / ' + raw.slice(4, 8);
        }
      }
      e.target.value = formatted;

      if (raw.length === 8) {
        const d = parseInt(raw.slice(0, 2), 10);
        const m = parseInt(raw.slice(2, 4), 10);
        const y = parseInt(raw.slice(4, 8), 10);
        if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= currentYear) {
          const maxDays = window.AgeCalculator.getDaysInMonth(y, m);
          const adjDay = Math.min(d, maxDays);
          const iso = `${y}-${String(m).padStart(2, '0')}-${String(adjDay).padStart(2, '0')}`;
          if (dobInput) dobInput.value = iso;
          if (dobDaySelect) dobDaySelect.value = adjDay;
          if (dobMonthSelect) dobMonthSelect.value = m;
          if (dobYearSelect) dobYearSelect.value = y;
          calculateAge();
        }
      }
    });
  }

  // Populate Days (1 - 31)
  if (dobDaySelect) {
    for (let d = 1; d <= 31; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = String(d).padStart(2, '0');
      dobDaySelect.appendChild(opt);
    }
  }

  // Populate Months (Jan - Dec)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  if (dobMonthSelect) {
    monthNames.forEach((name, idx) => {
      const opt = document.createElement('option');
      opt.value = idx + 1;
      opt.textContent = `${String(idx + 1).padStart(2, '0')} - ${name}`;
      dobMonthSelect.appendChild(opt);
    });
  }

  // Populate Years (Current down to 1920)
  if (dobYearSelect) {
    for (let y = currentYear; y >= 1920; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      dobYearSelect.appendChild(opt);
    }
  }

  // Sync Segmented -> Native
  function syncSegmentedToNative() {
    if (!dobDaySelect || !dobMonthSelect || !dobYearSelect || !dobInput) return;
    const d = dobDaySelect.value;
    const m = dobMonthSelect.value;
    const y = dobYearSelect.value;

    if (d && m && y) {
      const maxDays = window.AgeCalculator.getDaysInMonth(parseInt(y, 10), parseInt(m, 10));
      let adjustedDay = parseInt(d, 10);
      if (adjustedDay > maxDays) {
        adjustedDay = maxDays;
        dobDaySelect.value = maxDays;
      }
      const iso = `${y}-${String(m).padStart(2, '0')}-${String(adjustedDay).padStart(2, '0')}`;
      dobInput.value = iso;
      updateTypeInput(adjustedDay, m, y);
      calculateAge();
    }
  }

  // Sync Native -> Segmented
  function syncNativeToSegmented() {
    if (!dobInput || !dobInput.value) return;
    try {
      const parts = window.AgeCalculator.parseDateParts(dobInput.value);
      if (dobDaySelect) dobDaySelect.value = parts.day;
      if (dobMonthSelect) dobMonthSelect.value = parts.month;
      if (dobYearSelect) dobYearSelect.value = parts.year;
      updateTypeInput(parts.day, parts.month, parts.year);
      calculateAge();
    } catch (e) {
      // Ignored during intermediate typing
    }
  }

  if (dobDaySelect) dobDaySelect.addEventListener('change', syncSegmentedToNative);
  if (dobMonthSelect) dobMonthSelect.addEventListener('change', syncSegmentedToNative);
  if (dobYearSelect) dobYearSelect.addEventListener('change', syncSegmentedToNative);
  if (dobInput) {
    dobInput.addEventListener('change', syncNativeToSegmented);
    dobInput.addEventListener('input', syncNativeToSegmented);
  }

  // --- Quick Age Presets (e.g. 18 Yrs, 21 Yrs, 25 Yrs) ---
  const quickAgeButtons = document.querySelectorAll('.quick-age-btn');
  quickAgeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      quickAgeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      triggerHaptic(8);

      const ageNum = parseInt(btn.getAttribute('data-age'), 10);
      const asofDate = (asofInput && asofInput.value) ? new Date(asofInput.value) : new Date();
      const birthYear = asofDate.getFullYear() - ageNum;
      const birthMonth = asofDate.getMonth() + 1;
      const birthDay = asofDate.getDate();

      const iso = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
      if (dobInput) dobInput.value = iso;
      if (dobDaySelect) dobDaySelect.value = birthDay;
      if (dobMonthSelect) dobMonthSelect.value = birthMonth;
      if (dobYearSelect) dobYearSelect.value = birthYear;
      updateTypeInput(birthDay, birthMonth, birthYear);

      calculateAge();
    });
  });

  // --- Age Calculator Core Elements ---
  const asofInput = document.getElementById('asof-input');
  const btnCalcAge = document.getElementById('btn-calc-age');
  const btnResetAge = document.getElementById('btn-reset-age');
  const ageErrorAlert = document.getElementById('age-error-alert');
  const ageErrorText = document.getElementById('age-error-text');
  const ageResultsCard = document.getElementById('age-results-card');
  const bdayCelebrationBanner = document.getElementById('bday-celebration-banner');

  // Result displays
  const resultHero = document.getElementById('result-hero');
  const resultAsofLabel = document.getElementById('result-asof-label');
  const resultNextBdayText = document.getElementById('result-next-birthday-text');
  const resultNextBdaySub = document.getElementById('result-next-birthday-sub');
  const bdayProgressBar = document.getElementById('bday-progress-bar');
  const bdayProgressLabel = document.getElementById('bday-progress-label');
  const resultBornDayText = document.getElementById('result-born-day-text');
  const resultBornDayName = document.getElementById('result-born-day-name');

  // Subtab Buttons & Containers
  const subtabBtnOverview = document.getElementById('subtab-btn-overview');
  const subtabBtnCulture = document.getElementById('subtab-btn-culture');
  const subtabBtnVedic = document.getElementById('subtab-btn-vedic');
  const subtabBtnPlanets = document.getElementById('subtab-btn-planets');
  const subtabBtnMilestones = document.getElementById('subtab-btn-milestones');
  const subtabBtnUnits = document.getElementById('subtab-btn-units');
  const subtabContentOverview = document.getElementById('subtab-content-overview');
  const subtabContentCulture = document.getElementById('subtab-content-culture');
  const subtabContentVedic = document.getElementById('subtab-content-vedic');
  const subtabContentPlanets = document.getElementById('subtab-content-planets');
  const subtabContentMilestones = document.getElementById('subtab-content-milestones');
  const subtabContentUnits = document.getElementById('subtab-content-units');

  // Cultural Calendars Elements
  const hijriLunarAge = document.getElementById('hijri-lunar-age');
  const hijriYearsDesc = document.getElementById('hijri-years-desc');
  const hinduVikramYear = document.getElementById('hindu-vikram-year');
  const hinduShakaYear = document.getElementById('hindu-shaka-year');
  const koreanAges = document.getElementById('korean-ages');
  const birthstoneTitle = document.getElementById('birthstone-title');
  const birthstoneDesc = document.getElementById('birthstone-desc');
  const rulerSymbol = document.getElementById('ruler-symbol');

  // Vedic Astrology & Numerology Elements
  const vedicNakshatra = document.getElementById('vedic-nakshatra');
  const vedicDeity = document.getElementById('vedic-deity');
  const vedicRashi = document.getElementById('vedic-rashi');
  const vedicRashiSub = document.getElementById('vedic-rashi-sub');
  const vedicTithi = document.getElementById('vedic-tithi');
  const vedicMonth = document.getElementById('vedic-month');
  const numLifePath = document.getElementById('num-life-path');
  const numArchetypeTitle = document.getElementById('num-archetype-title');
  const numArchetypeTraits = document.getElementById('num-archetype-traits');
  const numBdayNum = document.getElementById('num-bday-num');

  // Cosmic Planets Grid
  const hubPlanetsGrid = document.getElementById('hub-planets-grid');

  // Milestones, Cohort & Trivia Elements
  const zodiacSymbol = document.getElementById('zodiac-symbol');
  const zodiacName = document.getElementById('zodiac-name');
  const zodiacElement = document.getElementById('zodiac-element');
  const chineseZodiacEmoji = document.getElementById('chinese-zodiac-emoji');
  const chineseZodiacName = document.getElementById('chinese-zodiac-name');
  const chineseZodiacElement = document.getElementById('chinese-zodiac-element');
  const milestoneName = document.getElementById('milestone-name');
  const milestoneSub = document.getElementById('milestone-sub');
  const bioSleep = document.getElementById('bio-sleep');
  const bioHeartbeats = document.getElementById('bio-heartbeats');
  const bioBreaths = document.getElementById('bio-breaths');
  const genName = document.getElementById('gen-name');
  const genRange = document.getElementById('gen-range');
  const genTraits = document.getElementById('gen-traits');
  const genIcon = document.getElementById('gen-icon');
  const triviaPeople = document.getElementById('trivia-people');
  const triviaEvents = document.getElementById('trivia-events');

  // 10,000-Day Milestone Banner Elements
  const text10kDate = document.getElementById('text-10k-date');
  const badge10k = document.getElementById('badge-10k');
  const text10kCountdown = document.getElementById('text-10k-countdown');
  const btnOpenShareModal = document.getElementById('btn-open-share-modal');

  // Units
  const metricMonths = document.getElementById('metric-months');
  const metricWeeks = document.getElementById('metric-weeks');
  const metricDays = document.getElementById('metric-days');
  const metricHours = document.getElementById('metric-hours');
  const metricMinutes = document.getElementById('metric-minutes');

  // Action Buttons
  const btnCopyResult = document.getElementById('btn-copy-result');
  const btnShareResult = document.getElementById('btn-share-result');
  const btnPrintResult = document.getElementById('btn-print-result');
  const btnAddIcs = document.getElementById('btn-add-ics');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  // Social Share Card Modal Elements
  const modalShareCard = document.getElementById('modal-share-card');
  const shareCardCanvas = document.getElementById('share-card-canvas');
  const btnDownloadCardPng = document.getElementById('btn-download-card-png');
  const linkWhatsappShare = document.getElementById('link-whatsapp-share');
  const btnCloseShareModal = document.getElementById('btn-close-share-modal');

  if (asofInput) {
    asofInput.value = todayStr;
  }

  let latestAgeResult = null;
  let liveTickerTimer = null;

  // --- Sub-tabs Switcher for Results Card ---
  function switchResultSubtab(tab) {
    const tabs = [
      { id: 'overview', btn: subtabBtnOverview, content: subtabContentOverview },
      { id: 'culture', btn: subtabBtnCulture, content: subtabContentCulture },
      { id: 'vedic', btn: subtabBtnVedic, content: subtabContentVedic },
      { id: 'planets', btn: subtabBtnPlanets, content: subtabContentPlanets },
      { id: 'milestones', btn: subtabBtnMilestones, content: subtabContentMilestones },
      { id: 'units', btn: subtabBtnUnits, content: subtabContentUnits },
    ];

    tabs.forEach(t => {
      if (!t.btn || !t.content) return;
      if (t.id === tab) {
        t.btn.classList.add('active');
        t.btn.classList.remove('text-slate-600', 'dark:text-slate-400');
        t.content.classList.remove('hidden');
      } else {
        t.btn.classList.remove('active');
        t.btn.classList.add('text-slate-600', 'dark:text-slate-400');
        t.content.classList.add('hidden');
      }
    });
  }

  if (subtabBtnOverview) subtabBtnOverview.addEventListener('click', () => switchResultSubtab('overview'));
  if (subtabBtnCulture) subtabBtnCulture.addEventListener('click', () => switchResultSubtab('culture'));
  if (subtabBtnVedic) subtabBtnVedic.addEventListener('click', () => switchResultSubtab('vedic'));
  if (subtabBtnPlanets) subtabBtnPlanets.addEventListener('click', () => switchResultSubtab('planets'));
  if (subtabBtnMilestones) subtabBtnMilestones.addEventListener('click', () => switchResultSubtab('milestones'));
  if (subtabBtnUnits) subtabBtnUnits.addEventListener('click', () => switchResultSubtab('units'));

  // --- Cutoff Presets Handling ---
  const presetChips = document.querySelectorAll('.preset-chip[data-preset], .preset-btn');
  presetChips.forEach(btn => {
    btn.addEventListener('click', () => {
      presetChips.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      triggerHaptic(8);
      const preset = btn.getAttribute('data-preset');
      const targetYear = new Date().getFullYear();

      if (preset === 'today') {
        asofInput.value = todayStr;
      } else if (preset === '1jan') {
        asofInput.value = `${targetYear}-01-01`;
      } else if (preset === '31mar') {
        asofInput.value = `${targetYear}-03-31`;
      } else if (preset === '1aug') {
        asofInput.value = `${targetYear}-08-01`;
      }

      if (dobInput.value || (dobDaySelect.value && dobMonthSelect.value && dobYearSelect.value)) {
        calculateAge();
      }
    });
  });

  // --- Haptic Feedback Helper ---
  function triggerHaptic(duration = 10) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(duration);
      } catch (e) {
        // Ignored
      }
    }
  }

  // --- Birthday Milestone Celebration ---
  function launchConfetti() {
    // Ultra-premium aesthetic: Clean starlight banner instead of noisy confetti
  }

  // --- Toast Notification Handler ---
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
    }, 3200);
  }

  // --- Start / Stop Live Chrono Ticker ---
  function stopLiveTicker() {
    if (liveTickerTimer) {
      clearInterval(liveTickerTimer);
      liveTickerTimer = null;
    }
  }

  function startLiveTicker(dobParts) {
    stopLiveTicker();
    if (!asofInput || asofInput.value !== todayStr) return;

    liveTickerTimer = setInterval(() => {
      if (!latestAgeResult) return;
      const now = new Date();
      const dobDate = new Date(Date.UTC(dobParts.year, dobParts.month - 1, dobParts.day));
      const diffMs = now.getTime() - dobDate.getTime();
      if (diffMs > 0) {
        const liveDecimal = (diffMs / (365.2425 * 86400000)).toFixed(6);
        if (resultAsofLabel) {
          resultAsofLabel.innerHTML = `Calculated as of <span class="text-slate-700 dark:text-slate-300 font-semibold">${latestAgeResult.asOfFormatted}</span> • <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">${liveDecimal} years</span>`;
        }
      }

      // Live seconds countdown to next birthday
      if (latestAgeResult.nextBirthday && !latestAgeResult.nextBirthday.isToday && resultNextBdayText) {
        const nb = latestAgeResult.nextBirthday;
        const bdayTarget = new Date(nb.year, nb.month - 1, nb.day, 0, 0, 0);
        const diffBdayMs = bdayTarget.getTime() - now.getTime();
        if (diffBdayMs > 0) {
          const d = Math.floor(diffBdayMs / 86400000);
          const h = Math.floor((diffBdayMs % 86400000) / 3600000);
          const m = Math.floor((diffBdayMs % 3600000) / 60000);
          const s = Math.floor((diffBdayMs % 60000) / 1000);
          resultNextBdayText.textContent = `In ${d}d ${h}h ${m}m ${s}s (${nb.weekday})`;
        }
      }
    }, 1000);
  }

  // --- Calculate Age Handler ---
  function calculateAge() {
    let dobVal = dobInput ? dobInput.value : '';
    if (!dobVal && dobDaySelect && dobMonthSelect && dobYearSelect && dobDaySelect.value && dobMonthSelect.value && dobYearSelect.value) {
      const d = dobDaySelect.value;
      const m = dobMonthSelect.value;
      const y = dobYearSelect.value;
      dobVal = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (dobInput) dobInput.value = dobVal;
    }

    const asofVal = (asofInput && asofInput.value) ? asofInput.value : todayStr;

    if (!dobVal) {
      showAgeError('Please select your Date of Birth.');
      return;
    }

    try {
      const res = window.AgeCalculator.calcAge(dobVal, asofVal);
      hideAgeError();
      latestAgeResult = res;

      // Populate hero result
      if (resultHero) {
        resultHero.innerHTML = `
          <span class="text-slate-900 dark:text-white">${res.years}</span><span class="text-base sm:text-2xl text-slate-400 dark:text-slate-500 font-sans font-medium mr-2 sm:mr-4"> ${res.years === 1 ? 'Year' : 'Years'}</span> 
          <span class="text-slate-900 dark:text-white">${res.months}</span><span class="text-base sm:text-2xl text-slate-400 dark:text-slate-500 font-sans font-medium mr-2 sm:mr-4"> ${res.months === 1 ? 'Month' : 'Months'}</span> 
          <span class="text-slate-900 dark:text-white">${res.days}</span><span class="text-base sm:text-2xl text-slate-400 dark:text-slate-500 font-sans font-medium"> ${res.days === 1 ? 'Day' : 'Days'}</span>
        `;
      }

      if (resultAsofLabel) {
        resultAsofLabel.innerHTML = `Calculated as of <span class="text-slate-700 dark:text-slate-300 font-semibold">${res.asOfFormatted}</span> • <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">${res.decimalAge} years</span>`;
      }

      // Start live chrono ticker if today
      const dobParts = window.AgeCalculator.parseDateParts(dobVal);
      startLiveTicker(dobParts);

      // Populate Next Birthday & Progress
      if (resultNextBdayText && resultNextBdaySub && bdayProgressBar && bdayProgressLabel) {
        if (res.nextBirthday.isToday) {
          resultNextBdayText.textContent = 'Today! 🎈';
          resultNextBdaySub.textContent = `Celebrating your birthday today (${res.nextBirthday.weekday})!`;
          bdayProgressBar.style.width = '100%';
          bdayProgressLabel.textContent = '100%';
          if (bdayCelebrationBanner) bdayCelebrationBanner.classList.remove('hidden');
          launchConfetti();
        } else {
          resultNextBdayText.textContent = `In ${res.nextBirthday.daysRemaining} days (${res.nextBirthday.weekday})`;
          resultNextBdaySub.textContent = `${res.nextBirthday.formattedDate}${res.nextBirthday.note ? ` • ${res.nextBirthday.note}` : ''}`;
          bdayProgressBar.style.width = `${res.milestones.yearProgressPercent}%`;
          bdayProgressLabel.textContent = `${res.milestones.yearProgressPercent}%`;
          if (bdayCelebrationBanner) bdayCelebrationBanner.classList.add('hidden');
        }
      }

      // Populate Born on weekday
      if (resultBornDayText) resultBornDayText.textContent = res.dayOfWeekBorn;
      if (resultBornDayName) resultBornDayName.textContent = res.dayOfWeekBorn;

      // Populate Cultural & Alternative Calendars
      try {
        if (hijriLunarAge && res.hijri) {
          hijriLunarAge.textContent = `${res.hijri.lunarYears} Lunar Yrs (${res.hijri.lunarMonths}m ${res.hijri.lunarDays}d)`;
        }
        if (hijriYearsDesc && res.hijri) {
          hijriYearsDesc.textContent = `Born: ${res.hijri.birthHijriYear} | Current: ${res.hijri.currentHijriYear} • ~354.37d/yr`;
        }
        if (hinduVikramYear && res.hindu) {
          hinduVikramYear.textContent = `${res.hindu.birthVikramSamvat} (Born) → ${res.hindu.currentVikramSamvat} (Now)`;
        }
        if (hinduShakaYear && res.hindu) {
          hinduShakaYear.textContent = `National Saka Calendar: ${res.hindu.birthShakaSamvat} → ${res.hindu.currentShakaSamvat}`;
        }
        if (koreanAges && res.korean) {
          koreanAges.textContent = `${res.korean.civilLawAge} yrs (Civil Law) · ${res.korean.traditionalKoreanAge} yrs (Traditional)`;
        }
        if (birthstoneTitle && res.birthstone) {
          birthstoneTitle.textContent = `${res.birthstone.stone} (${res.birthstone.color})`;
        }
        if (birthstoneDesc && res.birthstone) {
          birthstoneDesc.textContent = res.birthstone.meaning || 'Symbol of wisdom, vitality & strength';
        }
        if (rulerSymbol && res.weekdayRuler) {
          rulerSymbol.textContent = `${res.weekdayRuler.symbol} ${res.weekdayRuler.ruler.split(' ')[0]}`;
        }
      } catch (culturalErr) {
        console.warn('Cultural calendars rendering warning:', culturalErr);
      }

      // Populate Astrological signs
      try {
        if (zodiacSymbol) zodiacSymbol.textContent = res.westernZodiac.symbol;
        if (zodiacName) zodiacName.textContent = res.westernZodiac.name;
        if (zodiacElement) zodiacElement.textContent = `${res.westernZodiac.element} Element`;

        if (chineseZodiacEmoji) chineseZodiacEmoji.textContent = res.chineseZodiac.emoji;
        if (chineseZodiacName) chineseZodiacName.textContent = res.chineseZodiac.animal;
        if (chineseZodiacElement) chineseZodiacElement.textContent = `${res.chineseZodiac.element} Sign`;
      } catch (zodiacErr) {
        console.warn('Zodiac rendering warning:', zodiacErr);
      }

      // Populate Milestone & Biological stats
      try {
        if (milestoneName) milestoneName.textContent = `${res.milestones.nextDayMilestone.toLocaleString()} Days`;
        if (milestoneSub) milestoneSub.textContent = `${res.milestones.daysToMilestone.toLocaleString()} days to go (${res.milestones.milestoneDateFormatted})`;
        if (bioSleep) bioSleep.textContent = `${res.biological.sleepHours.toLocaleString()} hrs`;
        if (bioHeartbeats) bioHeartbeats.textContent = `${res.biological.heartbeats.toLocaleString()} beats`;
        if (bioBreaths) bioBreaths.textContent = `${res.biological.breaths.toLocaleString()} breaths`;
      } catch (milestoneErr) {
        console.warn('Milestone rendering warning:', milestoneErr);
      }

      // Populate Vedic Astrology & Panchang
      try {
        if (res.vedic) {
          if (vedicNakshatra) vedicNakshatra.textContent = `${res.vedic.nakshatra} (Pada ${res.vedic.pada})`;
          if (vedicDeity) vedicDeity.textContent = `Deity: ${res.vedic.deity} • Symbol: ${res.vedic.symbol}`;
          if (vedicRashi) vedicRashi.textContent = `${res.vedic.rashi} (${res.vedic.rashiEnglish})`;
          if (vedicRashiSub) vedicRashiSub.textContent = `Lord: ${res.vedic.lord} • Element: ${res.vedic.element}`;
          if (vedicTithi) vedicTithi.textContent = `${res.vedic.tithi} (${res.vedic.paksha} Paksha)`;
          if (vedicMonth) vedicMonth.textContent = `Hindu Month: ${res.vedic.hinduMonth}`;
        }
      } catch (vedicErr) {
        console.warn('Vedic rendering warning:', vedicErr);
      }

      // Populate Numerology
      try {
        if (res.numerology) {
          if (numLifePath) numLifePath.textContent = res.numerology.lifePathNumber;
          if (numArchetypeTitle) numArchetypeTitle.textContent = res.numerology.archetype.title;
          if (numArchetypeTraits) numArchetypeTraits.textContent = `${res.numerology.archetype.traits} • Gemstone: ${res.numerology.archetype.gemstone}`;
          if (numBdayNum) numBdayNum.textContent = res.numerology.birthdayNumber;
        }
      } catch (numErr) {
        console.warn('Numerology rendering warning:', numErr);
      }

      // Populate Cosmic Planetary Ages Grid
      try {
        if (hubPlanetsGrid && res.planetary) {
          const planetsList = Array.isArray(res.planetary)
            ? res.planetary
            : (Array.isArray(res.planetary.planets)
              ? res.planetary.planets
              : (typeof res.planetary.map === 'function' ? Array.from(res.planetary) : []));
          hubPlanetsGrid.innerHTML = planetsList.map(p => `
            <div class="stat-tile text-center">
              <div class="text-2xl mb-1">${p.symbol || '🪐'}</div>
              <div class="font-bold text-xs text-slate-700 dark:text-zinc-300">${p.planet || p.name || 'Planet'}</div>
              <div class="text-base font-extrabold text-[#111827] dark:text-[#F9FAFB] font-mono mt-0.5">${p.planetaryAge ?? p.age ?? '—'}</div>
              <div class="text-[10px] text-slate-500 dark:text-zinc-400">yrs (${p.orbitalPeriodEarthDays ?? p.orbitalDays ?? 0}d orbit)</div>
            </div>
          `).join('');
        }
      } catch (planetaryErr) {
        console.warn('Planetary grid rendering warning:', planetaryErr);
      }

      // Populate Generation Cohort
      try {
        if (res.generation) {
          if (genName) genName.textContent = res.generation.name;
          if (genRange) genRange.textContent = `${res.generation.start}–${res.generation.end}`;
          if (genTraits) genTraits.textContent = res.generation.traits;
          if (genIcon) genIcon.textContent = res.generation.icon;
        }
      } catch (genErr) {
        console.warn('Generation rendering warning:', genErr);
      }

      // Populate Calendar Day Trivia
      try {
        if (res.trivia) {
          if (triviaPeople) triviaPeople.textContent = (res.trivia.famousBirthdays && res.trivia.famousBirthdays.length) ? `Born this day: ${res.trivia.famousBirthdays.join(', ')}` : 'Historical celebrations on this day';
          if (triviaEvents) triviaEvents.textContent = (res.trivia.historicalEvents && res.trivia.historicalEvents.length) ? `History: ${res.trivia.historicalEvents[0]}` : 'Notable historical anniversaries';
        }
      } catch (triviaErr) {
        console.warn('Trivia rendering warning:', triviaErr);
      }

      // Populate 10,000-Day Milestone Banner
      try {
        if (text10kDate && res.milestoneDays) {
          text10kDate.textContent = res.milestoneDays.tenThousandDate;
          if (badge10k) {
            if (res.milestoneDays.is10kPassed) {
              badge10k.textContent = 'Achieved';
              badge10k.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300';
            } else {
              badge10k.textContent = 'Upcoming';
              badge10k.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
            }
          }
          if (text10kCountdown) {
            if (res.milestoneDays.is10kPassed) {
              text10kCountdown.textContent = `Turned 10,000 days old ${Math.abs(res.milestoneDays.daysTo10k).toLocaleString()} days ago`;
            } else {
              text10kCountdown.textContent = `In ${res.milestoneDays.daysTo10k.toLocaleString()} days (${res.milestoneDays.tenThousandDate})`;
            }
          }
        }
      } catch (milestone10kErr) {
        console.warn('10k milestone rendering warning:', milestone10kErr);
      }

      // Populate Metrics Grid with localized numbers
      if (metricMonths) metricMonths.textContent = res.totals.months.toLocaleString();
      if (metricWeeks) metricWeeks.textContent = `${res.totals.weeks.toLocaleString()} wks, ${res.totals.extraDays} d`;
      if (metricDays) metricDays.textContent = res.totals.days.toLocaleString();
      if (metricHours) metricHours.textContent = res.totals.hours.toLocaleString();
      if (metricMinutes) metricMinutes.textContent = res.totals.minutes.toLocaleString();

      // Show card and trigger luxury reveal animation
      if (ageResultsCard) {
        ageResultsCard.classList.remove('hidden');
        ageResultsCard.classList.remove('animate-pop');
        void ageResultsCard.offsetWidth;
        ageResultsCard.classList.add('animate-pop');
      }

    } catch (err) {
      showAgeError(err.message);
      if (ageResultsCard) ageResultsCard.classList.add('hidden');
      stopLiveTicker();
      latestAgeResult = null;
    }
  }

  function showAgeError(msg) {
    if (ageErrorAlert && ageErrorText) {
      ageErrorText.textContent = msg;
      ageErrorAlert.classList.remove('hidden');
    }
  }

  function hideAgeError() {
    if (ageErrorAlert) {
      ageErrorAlert.classList.add('hidden');
    }
  }

  // --- Reset Handler ---
  function resetAge() {
    stopLiveTicker();
    if (dobInput) dobInput.value = '';
    if (dobTypeInput) dobTypeInput.value = '';
    if (dobDaySelect) dobDaySelect.value = '';
    if (dobMonthSelect) dobMonthSelect.value = '';
    if (dobYearSelect) dobYearSelect.value = '';
    if (asofInput) asofInput.value = todayStr;
    hideAgeError();
    if (bdayCelebrationBanner) bdayCelebrationBanner.classList.add('hidden');
    if (ageResultsCard) ageResultsCard.classList.add('hidden');
    latestAgeResult = null;
    if (dobDaySelect) dobDaySelect.focus();
  }

  if (btnCalcAge) btnCalcAge.addEventListener('click', calculateAge);
  if (btnResetAge) btnResetAge.addEventListener('click', resetAge);

  if (asofInput) {
    asofInput.addEventListener('change', () => {
      if (dobInput.value || (dobDaySelect && dobDaySelect.value && dobMonthSelect.value && dobYearSelect.value)) {
        calculateAge();
      }
    });
    asofInput.addEventListener('input', () => {
      if (dobInput.value || (dobDaySelect && dobDaySelect.value && dobMonthSelect.value && dobYearSelect.value)) {
        calculateAge();
      }
    });
  }

  // --- Social Share Card Canvas Generator ---
  function drawShareCard(canvas, res) {
    if (!canvas || !res) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background gradient: dark luxury slate/zinc
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#09090b');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#09090b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle radial glow accent
    const radial = ctx.createRadialGradient(w * 0.8, h * 0.15, 10, w * 0.8, h * 0.15, 300);
    radial.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
    radial.addColorStop(1, 'rgba(37, 99, 235, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);

    // Rounded border
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(16, 16, w - 32, h - 32, 24);
    } else {
      ctx.rect(16, 16, w - 32, h - 32);
    }
    ctx.stroke();

    // Top Header: Branding
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 12px "Inter", -apple-system, sans-serif';
    ctx.fillText('DOBCAL • CHRONOLOGICAL RECORD', 40, 56);

    // Verified badge
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(w - 145, 40, 105, 24, 12);
      ctx.fill();
    }
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 11px "Inter", -apple-system, sans-serif';
    ctx.fillText('● VERIFIED AGE', w - 135, 56);

    // Hero: Days Lived
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px "Inter", -apple-system, sans-serif';
    ctx.fillText('TOTAL TIME LIVED', 40, 115);

    const daysText = res.totals.days.toLocaleString();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px "JetBrains Mono", monospace';
    ctx.fillText(daysText, 40, 175);

    const daysWidth = ctx.measureText(daysText).width;
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px "Inter", -apple-system, sans-serif';
    ctx.fillText('DAYS', 40 + daysWidth + 12, 175);

    // Years, Months, Days breakdown
    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 20px "Inter", -apple-system, sans-serif';
    const ageStr = `${res.years} Years  ·  ${res.months} Months  ·  ${res.days} Days`;
    ctx.fillText(ageStr, 40, 220);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Inter", -apple-system, sans-serif';
    ctx.fillText(`Decimal Age: ${res.decimalAge} Years • As of ${res.asOfFormatted}`, 40, 248);

    // Divider line
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 275);
    ctx.lineTo(w - 40, 275);
    ctx.stroke();

    // Two-Column Grid
    const col1 = 40;
    const col2 = w / 2 + 10;

    // Row 1: Date of Birth & Zodiac
    ctx.fillStyle = '#64748b';
    ctx.font = '600 11px "Inter", -apple-system, sans-serif';
    ctx.fillText('DATE OF BIRTH', col1, 310);
    ctx.fillText('WESTERN & CHINESE ZODIAC', col2, 310);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Inter", -apple-system, sans-serif';
    ctx.fillText(`${res.dobFormatted} (${res.dayOfWeekBorn})`, col1, 332);
    ctx.fillText(`${res.westernZodiac.symbol} ${res.westernZodiac.name} · ${res.chineseZodiac.emoji} ${res.chineseZodiac.animal}`, col2, 332);

    // Row 2: Total Hours & 10,000 Days Milestone
    ctx.fillStyle = '#64748b';
    ctx.font = '600 11px "Inter", -apple-system, sans-serif';
    ctx.fillText('TOTAL HOURS LIVED', col1, 385);
    ctx.fillText('10,000-DAY MILESTONE', col2, 385);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(`${res.totals.hours.toLocaleString()} hrs`, col1, 407);

    ctx.font = 'bold 14px "Inter", -apple-system, sans-serif';
    const tenKText = (res.milestoneDays && res.milestoneDays.is10kPassed)
      ? 'Achieved Milestone!'
      : (res.milestoneDays ? `${res.milestoneDays.tenThousandDate} (${res.milestoneDays.daysTo10k}d)` : '--');
    ctx.fillStyle = (res.milestoneDays && res.milestoneDays.is10kPassed) ? '#34d399' : '#60a5fa';
    ctx.fillText(tenKText, col2, 407);

    // Row 3: Next Birthday & Birthstone
    ctx.fillStyle = '#64748b';
    ctx.font = '600 11px "Inter", -apple-system, sans-serif';
    ctx.fillText('NEXT BIRTHDAY', col1, 455);
    ctx.fillText('GIA BIRTHSTONE', col2, 455);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "Inter", -apple-system, sans-serif';
    const bdayText = res.nextBirthday.isToday
      ? 'Today! 🎈'
      : `In ${res.nextBirthday.daysRemaining} days (${res.nextBirthday.weekday})`;
    ctx.fillText(bdayText, col1, 477);
    ctx.fillText(res.birthstone ? `💎 ${res.birthstone.stone}` : '--', col2, 477);

    // Divider line
    ctx.strokeStyle = '#27272a';
    ctx.beginPath();
    ctx.moveTo(40, 510);
    ctx.lineTo(w - 40, 510);
    ctx.stroke();

    // Footer: branding & privacy guarantee
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText('dobcal.pages.dev', 40, 550);

    ctx.fillStyle = '#64748b';
    ctx.font = '11px "Inter", -apple-system, sans-serif';
    ctx.fillText('100% Client-Side Precision • Zero Tracking', w - 280, 550);
  }

  function openShareModal() {
    if (!latestAgeResult || !modalShareCard) return;
    drawShareCard(shareCardCanvas, latestAgeResult);

    if (linkWhatsappShare) {
      const shareMsg = encodeURIComponent(
        `🎂 I've been alive for ${latestAgeResult.totals.days.toLocaleString()} days (${latestAgeResult.years} years, ${latestAgeResult.months} months, and ${latestAgeResult.days} days)!\n\nCalculate your exact chronological age & milestones: https://dobcal.pages.dev`
      );
      linkWhatsappShare.href = `https://wa.me/?text=${shareMsg}`;
    }

    modalShareCard.classList.remove('hidden');
  }

  function closeShareModal() {
    if (modalShareCard) {
      modalShareCard.classList.add('hidden');
    }
  }

  if (btnOpenShareModal) btnOpenShareModal.addEventListener('click', openShareModal);
  if (btnShareResult) btnShareResult.addEventListener('click', openShareModal);
  if (btnCloseShareModal) btnCloseShareModal.addEventListener('click', closeShareModal);

  if (modalShareCard) {
    modalShareCard.addEventListener('click', (e) => {
      if (e.target === modalShareCard) closeShareModal();
    });
  }

  if (btnDownloadCardPng && shareCardCanvas) {
    btnDownloadCardPng.addEventListener('click', () => {
      const dataUrl = shareCardCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `dobcal-milestone-${latestAgeResult ? latestAgeResult.totals.days : 'age'}-days.png`;
      a.href = dataUrl;
      a.click();
      showToast('Milestone card downloaded!');
    });
  }

  // Calculate default initial age on page load (2000-01-01) so upper section is active and engaging
  if (dobDaySelect && dobMonthSelect && dobYearSelect && dobInput) {
    dobDaySelect.value = 1;
    dobMonthSelect.value = 1;
    dobYearSelect.value = 2000;
    dobInput.value = '2000-01-01';
    calculateAge();
  }

  // --- Copy Result to Clipboard ---
  if (btnCopyResult) {
    btnCopyResult.addEventListener('click', () => {
      if (!latestAgeResult) return;

      const summary = [
        '🎂 Exact Age Calculation Summary',
        `• Age: ${latestAgeResult.formattedAge}`,
        `• Decimal Age: ${latestAgeResult.decimalAge} years`,
        `• Date of Birth: ${latestAgeResult.dobFormatted} (${latestAgeResult.dayOfWeekBorn})`,
        `• Evaluated As Of: ${latestAgeResult.asOfFormatted}`,
        `• Astrological: ${latestAgeResult.westernZodiac.name} (${latestAgeResult.westernZodiac.symbol}), ${latestAgeResult.chineseZodiac.formatted} ${latestAgeResult.chineseZodiac.emoji}`,
        `• Total Elapsed Days: ${latestAgeResult.totals.days.toLocaleString()} days`,
        `• Total Time: ${latestAgeResult.totals.hours.toLocaleString()} hours / ${latestAgeResult.totals.minutes.toLocaleString()} minutes`,
        latestAgeResult.nextBirthday.isToday
          ? '• Next Birthday: Today! 🎈'
          : `• Next Birthday: in ${latestAgeResult.nextBirthday.daysRemaining} days on a ${latestAgeResult.nextBirthday.weekday} (${latestAgeResult.nextBirthday.formattedDate})`,
        'Calculated with Age Calculator (https://dobcal.pages.dev)',
      ].join('\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary).then(() => {
          showToast('Age summary copied to clipboard!');
        }).catch(() => {
          fallbackCopy(summary);
        });
      } else {
        fallbackCopy(summary);
      }
    });
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Age summary copied to clipboard!');
    } catch (e) {
      showToast('Unable to copy automatically.');
    }
    document.body.removeChild(textArea);
  }

  // --- Print Certificate / Slip ---
  if (btnPrintResult) {
    btnPrintResult.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Add Next Birthday to Calendar (.ics) ---
  if (btnAddIcs) {
    btnAddIcs.addEventListener('click', () => {
      if (!latestAgeResult || !latestAgeResult.nextBirthday) return;
      const nb = latestAgeResult.nextBirthday;
      const ics = window.AgeCalculator.generateIcsCalendar({
        name: 'Birthday',
        month: nb.month,
        day: nb.day,
        year: nb.year,
        turningAge: latestAgeResult.years + 1,
      });
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `birthday-${nb.year}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      showToast('Birthday (.ics) calendar file downloaded!');
    });
  }

  // --- Date Difference Calculator Elements ---
  const diffStartInput = document.getElementById('diff-start-input');
  const diffEndInput = document.getElementById('diff-end-input');
  const diffIncludeEnd = document.getElementById('diff-include-end');
  const btnCalcDiff = document.getElementById('btn-calc-diff');
  const btnResetDiff = document.getElementById('btn-reset-diff');
  const diffErrorAlert = document.getElementById('diff-error-alert');
  const diffErrorText = document.getElementById('diff-error-text');
  const diffResultsCard = document.getElementById('diff-results-card');

  const diffResultHero = document.getElementById('diff-result-hero');
  const diffResultSub = document.getElementById('diff-result-sub');
  const diffTotalDays = document.getElementById('diff-total-days');
  const diffTotalWeeks = document.getElementById('diff-total-weeks');
  const diffTotalHours = document.getElementById('diff-total-hours');
  const diffModeLabel = document.getElementById('diff-mode-label');

  if (diffStartInput && diffEndInput) {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    diffStartInput.value = getLocalDateISO(pastDate);
    diffEndInput.value = todayStr;
  }

  function calculateDiff() {
    const startVal = diffStartInput.value;
    const endVal = diffEndInput.value;
    const includeEnd = diffIncludeEnd.checked;

    if (!startVal || !endVal) {
      showDiffError('Please specify both Start Date and End Date.');
      return;
    }

    try {
      const diff = window.AgeCalculator.calcDateDiff(startVal, endVal, includeEnd);
      hideDiffError();

      if (diffResultHero) {
        diffResultHero.innerHTML = `
          <span class="text-slate-900 dark:text-white">${diff.years}</span><span class="text-base sm:text-2xl text-slate-400 dark:text-slate-500 font-sans font-medium mr-2 sm:mr-4"> ${diff.years === 1 ? 'Year' : 'Years'}</span> 
          <span class="text-slate-900 dark:text-white">${diff.months}</span><span class="text-base sm:text-2xl text-slate-400 dark:text-slate-500 font-sans font-medium mr-2 sm:mr-4"> ${diff.months === 1 ? 'Month' : 'Months'}</span> 
          <span class="text-slate-900 dark:text-white">${diff.days}</span><span class="text-base sm:text-2xl text-slate-400 dark:text-slate-500 font-sans font-medium"> ${diff.days === 1 ? 'Day' : 'Days'}</span>
        `;
      }

      if (diffResultSub) diffResultSub.textContent = `From ${diff.startFormatted} to ${diff.endFormatted} ${includeEnd ? '(inclusive of end date)' : ''}`;
      if (diffTotalDays) diffTotalDays.textContent = diff.totalDays.toLocaleString();
      if (diffTotalWeeks) diffTotalWeeks.textContent = `${diff.totalWeeks.toLocaleString()} wks, ${diff.remainingDays} d`;
      if (diffTotalHours) diffTotalHours.textContent = diff.totalHours.toLocaleString();
      if (diffModeLabel) diffModeLabel.textContent = includeEnd ? 'Inclusive (+1d)' : 'Standard';

      if (diffResultsCard) {
        diffResultsCard.classList.remove('hidden');
        diffResultsCard.classList.remove('animate-pop');
        void diffResultsCard.offsetWidth;
        diffResultsCard.classList.add('animate-pop');
      }

    } catch (err) {
      showDiffError(err.message);
      if (diffResultsCard) diffResultsCard.classList.add('hidden');
    }
  }

  function showDiffError(msg) {
    if (diffErrorAlert && diffErrorText) {
      diffErrorText.textContent = msg;
      diffErrorAlert.classList.remove('hidden');
    }
  }

  function hideDiffError() {
    if (diffErrorAlert) {
      diffErrorAlert.classList.add('hidden');
    }
  }

  function resetDiff() {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    if (diffStartInput) diffStartInput.value = getLocalDateISO(pastDate);
    if (diffEndInput) diffEndInput.value = todayStr;
    if (diffIncludeEnd) diffIncludeEnd.checked = false;
    hideDiffError();
    if (diffResultsCard) diffResultsCard.classList.add('hidden');
    if (diffStartInput) diffStartInput.focus();
  }

  if (btnCalcDiff && btnResetDiff) {
    btnCalcDiff.addEventListener('click', calculateDiff);
    btnResetDiff.addEventListener('click', resetDiff);
    diffStartInput.addEventListener('change', () => {
      if (diffStartInput.value && diffEndInput.value) calculateDiff();
    });
    diffStartInput.addEventListener('input', () => {
      if (diffStartInput.value && diffEndInput.value) calculateDiff();
    });
    diffEndInput.addEventListener('change', () => {
      if (diffStartInput.value && diffEndInput.value) calculateDiff();
    });
    diffEndInput.addEventListener('input', () => {
      if (diffStartInput.value && diffEndInput.value) calculateDiff();
    });
    diffIncludeEnd.addEventListener('change', () => {
      if (diffStartInput.value && diffEndInput.value) calculateDiff();
    });
  }

  // --- Keyboard Shortcuts: Enter to Calculate, Esc to Reset ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT')) {
        if (sectionAge && !sectionAge.classList.contains('hidden')) {
          calculateAge();
        } else if (sectionDiff && !sectionDiff.classList.contains('hidden')) {
          calculateDiff();
        }
      }
    } else if (e.key === 'Escape') {
      if (modalShareCard && !modalShareCard.classList.contains('hidden')) {
        closeShareModal();
      } else if (sectionAge && !sectionAge.classList.contains('hidden')) {
        resetAge();
      } else if (sectionDiff && !sectionDiff.classList.contains('hidden')) {
        resetDiff();
      }
    }
  });

  // --- Command Palette Controller (Cmd+K / Ctrl+K) ---
  const btnOpenPalette = document.getElementById('btn-open-palette');
  const btnOpenPaletteMobile = document.getElementById('btn-open-palette-mobile');
  const modalPalette = document.getElementById('command-palette-modal');
  const btnClosePalette = document.getElementById('btn-close-palette');
  const paletteInput = document.getElementById('palette-search-input');
  const paletteResults = document.getElementById('palette-results-list');

  const toolsIndex = [
    { title: 'Chronological Age Engine', category: 'Core', url: 'index.html', desc: 'Exact age in years, months, days & live chronometer' },
    { title: 'Date Difference Calculator', category: 'Core', url: 'age-difference-calculator.html', desc: 'Compare two dates with inclusive/non-inclusive options' },
    { title: 'Age in Months and Days', category: 'Core', url: 'age-in-months-and-days.html', desc: 'Completed months and pediatric dosage milestones' },
    { title: 'How Old Will I Be in 2040?', category: 'Core', url: 'how-old-will-i-be-in-2040.html', desc: 'Future age milestone countdown & decadal table' },
    { title: 'Government Exams Cutoff Calculator', category: 'Official', url: 'age-calculator-for-government-exams.html', desc: 'UPSC, SSC, IBPS, PSC age reckoning with category relaxations' },
    { title: 'School Admission Age Calculator', category: 'Official', url: 'school-admission-age-calculator.html', desc: 'NEP 2020 6+ rule, KVS & state board cutoff dates' },
    { title: 'Voting & Driving Eligibility', category: 'Official', url: 'voting-and-driving-eligibility-calculator.html', desc: 'ECI quarterly roll dates & 16/18/20 driving license rules' },
    { title: 'Retirement & Pension Calculator', category: 'Official', url: 'retirement-and-pension-calculator.html', desc: 'Central Civil Services superannuation & service years' },
    { title: 'Pregnancy Due Date Calculator', category: 'Life Stage', url: 'pregnancy-due-date-calculator.html', desc: 'Naegele’s rule, gestational age, trimesters & leaps' },
    { title: 'Child Vaccination Schedule', category: 'Life Stage', url: 'child-vaccination-schedule-calculator.html', desc: 'WHO & IAP immunization schedule with .ics calendar export' },
    { title: 'Family Birthday Manager', category: 'Life Stage', url: 'family-birthday-manager.html', desc: 'Local private birthday tracker with upcoming countdowns' },
    { title: 'Pet Age Calculator', category: 'Life Stage', url: 'pet-age-calculator.html', desc: 'Dog & cat age in human years with breed size weighting' },
    { title: 'Warranty & Product Age', category: 'Utility', url: 'warranty-and-product-age-calculator.html', desc: 'Track appliance, vehicle, and plant age since purchase' },
    { title: 'Calculate Age in Excel Guide', category: 'Utility', url: 'calculate-age-in-excel.html', desc: 'Interactive =DATEDIF() and =YEARFRAC() formula generator' },
    { title: 'Bulk Age Calculator', category: 'Utility', url: 'bulk-age-calculator.html', desc: 'Process up to 500 birth dates in batch with CSV export' },
    { title: 'Developer API & SDK Docs', category: 'Developer', url: 'developer-api.html', desc: 'Embeddable zero-dependency JavaScript SDK' },
    { title: 'Embeddable Iframe Widget', category: 'Developer', url: 'embed-widget.html', desc: 'Lightweight age calculator for blogs and portals' },
    { title: 'Planet Age Calculator', category: 'Cosmic', url: 'planet-age-calculator.html', desc: 'Keplerian orbital ages on Mercury, Mars, Jupiter, etc.' },
    { title: 'Numerology & Life Path', category: 'Cosmic', url: 'numerology-life-path-calculator.html', desc: 'Life Path Number (1–9, 11, 22, 33) & Mulank archetype' },
    { title: 'Calculadora de Edad (Español)', category: 'International', url: 'calculadora-de-edad.html', desc: 'Edición en español para España y Latinoamérica' },
    { title: 'Calculadora de Idade (Português)', category: 'International', url: 'calculadora-de-idade.html', desc: 'Edição em português para Brasil e Portugal' },
    { title: 'Kalkulator Umur (Indonesia)', category: 'International', url: 'kalkulator-umur.html', desc: 'Hitung umur tepat dalam bahasa Indonesia' },
    { title: 'حاسبة العمر الدقيقة (العربية)', category: 'International', url: 'hasibat-al-umr.html', desc: 'حساب العمر بالهجري والميلادي' },
    { title: 'Calculateur d\'Âge (Français)', category: 'International', url: 'calculateur-age.html', desc: 'Calcul précis de l\'âge en français' },
    { title: 'Altersrechner (Deutsch)', category: 'International', url: 'altersrechner.html', desc: 'Genaues Alter berechnen für Deutschland & Österreich' },
    { title: 'आयु कैलकुलेटर (हिन्दी)', category: 'International', url: 'aayu-calculator-hindi.html', desc: 'जन्म तिथि से सही उम्र की गणना' },
    { title: 'About Dobcal Chronometer', category: 'About', url: 'about.html', desc: 'Our mission, architecture, and mathematical algorithms' },
    { title: 'Privacy Policy', category: 'Trust', url: 'privacy.html', desc: 'Zero-knowledge 100% client-side privacy standard' },
    { title: 'Terms of Service', category: 'Trust', url: 'terms.html', desc: 'Free public utility terms and disclaimers' }
  ];

  let selectedPaletteIndex = 0;
  let filteredTools = [...toolsIndex];

  function renderPaletteResults() {
    if (!paletteResults) return;
    if (filteredTools.length === 0) {
      paletteResults.innerHTML = `
        <div class="py-8 text-center text-zinc-400">
          <p class="font-mono text-xs">No matching tools found for this query.</p>
        </div>
      `;
      return;
    }

    paletteResults.innerHTML = filteredTools.map((tool, idx) => `
      <a href="${tool.url}" class="palette-item flex items-center justify-between p-2.5 rounded-lg transition-colors ${idx === selectedPaletteIndex ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'}" data-index="${idx}">
        <div class="flex items-center space-x-2.5 overflow-hidden">
          <span class="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold">${tool.category}</span>
          <div class="truncate">
            <div class="text-xs font-bold text-[#0A0A0C] dark:text-[#F4F4F6]">${tool.title}</div>
            <div class="text-[11px] text-zinc-500 truncate">${tool.desc}</div>
          </div>
        </div>
        <svg class="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </a>
    `).join('');
  }

  function openPalette() {
    if (!modalPalette) return;
    modalPalette.classList.remove('hidden');
    selectedPaletteIndex = 0;
    filteredTools = [...toolsIndex];
    if (paletteInput) {
      paletteInput.value = '';
      setTimeout(() => paletteInput.focus(), 50);
    }
    renderPaletteResults();
  }

  function closePalette() {
    if (!modalPalette) return;
    modalPalette.classList.add('hidden');
  }

  if (btnOpenPalette) btnOpenPalette.addEventListener('click', openPalette);
  if (btnOpenPaletteMobile) btnOpenPaletteMobile.addEventListener('click', openPalette);
  if (btnClosePalette) btnClosePalette.addEventListener('click', closePalette);
  if (modalPalette) {
    modalPalette.addEventListener('click', (e) => {
      if (e.target === modalPalette) closePalette();
    });
  }

  if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        filteredTools = [...toolsIndex];
      } else {
        filteredTools = toolsIndex.filter(t => 
          t.title.toLowerCase().includes(q) || 
          t.desc.toLowerCase().includes(q) || 
          t.category.toLowerCase().includes(q)
        );
      }
      selectedPaletteIndex = 0;
      renderPaletteResults();
    });

    paletteInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedPaletteIndex = (selectedPaletteIndex + 1) % filteredTools.length;
        renderPaletteResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedPaletteIndex = (selectedPaletteIndex - 1 + filteredTools.length) % filteredTools.length;
        renderPaletteResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredTools[selectedPaletteIndex]) {
          window.location.href = filteredTools[selectedPaletteIndex].url;
        }
      }
    });
  }

  // Hotkey listener for Cmd+K / Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modalPalette && !modalPalette.classList.contains('hidden')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  // --- Mobile Navigation Drawer Toggle ---
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const iconMenuOpen = document.getElementById('icon-menu-open');
  const iconMenuClose = document.getElementById('icon-menu-close');

  if (btnMobileMenu && mobileNavDrawer) {
    btnMobileMenu.addEventListener('click', () => {
      const isClosed = mobileNavDrawer.classList.contains('hidden');
      if (isClosed) {
        mobileNavDrawer.classList.remove('hidden');
        if (iconMenuOpen) iconMenuOpen.classList.add('hidden');
        if (iconMenuClose) iconMenuClose.classList.remove('hidden');
      } else {
        mobileNavDrawer.classList.add('hidden');
        if (iconMenuOpen) iconMenuOpen.classList.remove('hidden');
        if (iconMenuClose) iconMenuClose.classList.add('hidden');
      }
    });
  }

  // --- PWA Service Worker Registration ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Dobcal Service Worker active:', reg.scope);
      }).catch((err) => {
        console.warn('Dobcal Service Worker registration failed:', err);
      });
    });
  }

  // --- Initial Instrument State (Engage 25Y Benchmark) ---
  const defaultMilestone = document.querySelector('.quick-age-btn.active') || document.querySelector('.quick-age-btn[data-age="25"]');
  if (defaultMilestone) {
    defaultMilestone.click();
  }

});
