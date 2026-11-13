/**
 * Dobcal Localization & Multi-Language Dictionary
 * Supports 10 High-Volume Global Languages:
 * English (en), Spanish (es), Portuguese (pt), Indonesian (id),
 * Arabic (ar - RTL), French (fr), German (de), Hindi (hi), Odia (or), Bengali (bn)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DobcalI18n = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳', dir: 'ltr' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳', dir: 'ltr' },
  ];

  const TRANSLATIONS = {
    en: {
      brand_title: 'Age Calculator',
      brand_sub: 'Calendar Precision',
      tagline: 'Know your exact age in years, months, and days. Instantly.',
      tab_age: 'Age Calculator',
      tab_diff: 'Date Difference',
      tab_culture: 'Cultural Calendars',
      label_dob: 'Date of Birth',
      label_asof: 'Age as on Date',
      btn_calc_age: 'Calculate Exact Age',
      btn_reset: 'Reset',
      btn_today: 'Today',
      years: 'Years',
      months: 'Months',
      days: 'Days',
      total_months: 'Total Months',
      total_weeks: 'Total Weeks',
      total_days: 'Total Days',
      total_hours: 'Total Hours',
      total_minutes: 'Total Minutes',
      born_on: 'Born on a',
      next_bday_label: 'Next Birthday Countdown',
      in_days: 'in',
      days_left: 'days',
      btn_share_card: 'Create Share Card',
      btn_copy_summary: 'Copy Result',
      share_modal_title: 'Shareable Milestone Card',
      share_modal_sub: 'Save image or share directly to WhatsApp Status',
      btn_whatsapp: 'Share on WhatsApp',
      btn_download_img: 'Download Image (PNG)',
      cultural_title: 'Cultural & Other Calendars',
      hijri_label: 'Islamic Hijri Lunar Calendar',
      hindu_label: 'Hindu Calendar (Vikram Samvat)',
      korean_label: 'Korean Age (Traditional vs Civil)',
      birthstone_label: 'GIA Birthstone',
      weekday_ruler_label: 'Planetary Day Ruler',
      milestone_10k_title: '10,000 Days Milestone',
    },
    hi: {
      brand_title: 'आयु कैलकुलेटर',
      brand_sub: 'कैलेंडर सटीकता',
      tagline: 'अपनी सही और सटीक उम्र वर्ष, महीने और दिनों में तुरंत जानें।',
      tab_age: 'उम्र कैलकुलेटर',
      tab_diff: 'तारीखों में अंतर',
      tab_culture: 'सांस्कृतिक पंचांग',
      label_dob: 'जन्म तिथि (DOB)',
      label_asof: 'किस तिथि को उम्र जाननी है',
      btn_calc_age: 'सटीक उम्र की गणना करें',
      btn_reset: 'रीसेट करें',
      btn_today: 'आज',
      years: 'वर्ष',
      months: 'महीने',
      days: 'दिन',
      total_months: 'कुल महीने',
      total_weeks: 'कुल सप्ताह',
      total_days: 'कुल दिन',
      total_hours: 'कुल घंटे',
      total_minutes: 'कुल मिनट',
      born_on: 'जन्म का दिन',
      next_bday_label: 'अगला जन्मदिन',
      in_days: 'में',
      days_left: 'दिन बाकी',
      btn_share_card: 'शेयर कार्ड बनाएं',
      btn_copy_summary: 'परिणाम कॉपी करें',
      share_modal_title: 'सोशल शेयर कार्ड',
      share_modal_sub: 'इमेज डाउनलोड करें या सीधे व्हाट्सएप स्टेटस पर शेयर करें',
      btn_whatsapp: 'व्हाट्सएप पर शेयर करें',
      btn_download_img: 'इमेज डाउनलोड करें (PNG)',
      cultural_title: 'अन्य पंचांग और कैलेंडर में उम्र',
      hijri_label: 'इस्लामिक हिजरी चंद्र कैलेंडर',
      hindu_label: 'हिन्दू पंचांग (विक्रम संवत)',
      korean_label: 'कोरियन आयु प्रणाली',
      birthstone_label: 'भाग्य रत्न (बर्थस्टोन)',
      weekday_ruler_label: 'दिन का स्वामी ग्रह',
      milestone_10k_title: '10,000 दिन की आयु मील का पत्थर',
    },
    es: {
      brand_title: 'Calculadora de Edad',
      brand_sub: 'Precisión Cronológica',
      tagline: 'Conozca su edad exacta en años, meses y días al instante.',
      tab_age: 'Calculadora de Edad',
      tab_diff: 'Diferencia de Fechas',
      tab_culture: 'Calendarios Culturales',
      label_dob: 'Fecha de Nacimiento',
      label_asof: 'Edad a la Fecha',
      btn_calc_age: 'Calcular Edad Exacta',
      btn_reset: 'Reiniciar',
      btn_today: 'Hoy',
      years: 'Años',
      months: 'Meses',
      days: 'Días',
      total_months: 'Total Meses',
      total_weeks: 'Total Semanas',
      total_days: 'Total Días',
      total_hours: 'Total Horas',
      total_minutes: 'Total Minutos',
      born_on: 'Nació un',
      next_bday_label: 'Próximo Cumpleaños',
      in_days: 'en',
      days_left: 'días restantes',
      btn_share_card: 'Crear Tarjeta',
      btn_copy_summary: 'Copiar Resultado',
      share_modal_title: 'Tarjeta de Hito Personal',
      share_modal_sub: 'Descargue la imagen o compártala en WhatsApp',
      btn_whatsapp: 'Compartir en WhatsApp',
      btn_download_img: 'Descargar Imagen (PNG)',
      cultural_title: 'Calendarios Culturales y Alternativos',
      hijri_label: 'Calendario Lunar Islámico Hégira',
      hindu_label: 'Calendario Hindú (Vikram Samvat)',
      korean_label: 'Edad Coreana (Tradicional vs Civil)',
      birthstone_label: 'Piedra Natal GIA',
      weekday_ruler_label: 'Regente Planetario del Día',
      milestone_10k_title: 'Hito de los 10.000 Días',
    },
    pt: {
      brand_title: 'Calculadora de Idade',
      brand_sub: 'Precisão Cronológica',
      tagline: 'Saiba sua idade exata em anos, meses e dias instantaneamente.',
      tab_age: 'Calculadora de Idade',
      tab_diff: 'Diferença de Datas',
      tab_culture: 'Calendários Culturais',
      label_dob: 'Data de Nascimento',
      label_asof: 'Idade na Data',
      btn_calc_age: 'Calcular Idade Exata',
      btn_reset: 'Limpar',
      btn_today: 'Hoje',
      years: 'Anos',
      months: 'Meses',
      days: 'Dias',
      total_months: 'Total de Meses',
      total_weeks: 'Total de Semanas',
      total_days: 'Total de Dias',
      total_hours: 'Total de Horas',
      total_minutes: 'Total de Minutos',
      born_on: 'Nasceu em um(a)',
      next_bday_label: 'Próximo Aniversário',
      in_days: 'em',
      days_left: 'dias restantes',
      btn_share_card: 'Criar Cartão',
      btn_copy_summary: 'Copiar Resultado',
      share_modal_title: 'Cartão de Conquista Pessoal',
      share_modal_sub: 'Baixe a imagem ou compartilhe no WhatsApp',
      btn_whatsapp: 'Compartilhar no WhatsApp',
      btn_download_img: 'Baixar Imagem (PNG)',
      cultural_title: 'Calendários Culturais e Alternativos',
      hijri_label: 'Calendário Lunar Islâmico Hijri',
      hindu_label: 'Calendário Hindu (Vikram Samvat)',
      korean_label: 'Idade Coreana (Tradicional vs Lei Civil)',
      birthstone_label: 'Pedra do Mês GIA',
      weekday_ruler_label: 'Regente Planetário do Dia',
      milestone_10k_title: 'Marco de 10.000 Dias',
    },
    id: {
      brand_title: 'Kalkulator Umur',
      brand_sub: 'Presisi Kalender',
      tagline: 'Ketahui usia tepat Anda dalam tahun, bulan, dan hari secara instan.',
      tab_age: 'Kalkulator Umur',
      tab_diff: 'Selisih Tanggal',
      tab_culture: 'Kalender Budaya',
      label_dob: 'Tanggal Lahir',
      label_asof: 'Usia per Tanggal',
      btn_calc_age: 'Hitung Usia Tepat',
      btn_reset: 'Reset',
      btn_today: 'Hari Ini',
      years: 'Tahun',
      months: 'Bulan',
      days: 'Hari',
      total_months: 'Total Bulan',
      total_weeks: 'Total Minggu',
      total_days: 'Total Hari',
      total_hours: 'Total Jam',
      total_minutes: 'Total Menit',
      born_on: 'Lahir pada hari',
      next_bday_label: 'Hitung Mundur Ulang Tahun',
      in_days: 'dalam',
      days_left: 'hari lagi',
      btn_share_card: 'Buat Kartu Bagikan',
      btn_copy_summary: 'Salin Hasil',
      share_modal_title: 'Kartu Pencapaian Milestones',
      share_modal_sub: 'Simpan gambar atau bagikan langsung ke WhatsApp Status',
      btn_whatsapp: 'Bagikan ke WhatsApp',
      btn_download_img: 'Unduh Gambar (PNG)',
      cultural_title: 'Kalender Budaya & Alternatif',
      hijri_label: 'Kalender Hijriah Islam (Bulan)',
      hindu_label: 'Kalender Hindu (Vikram Samvat)',
      korean_label: 'Usia Korea (Tradisional vs Hukum Sipil)',
      birthstone_label: 'Batu Kelahiran GIA',
      weekday_ruler_label: 'Planet Penguasa Hari Lahir',
      milestone_10k_title: 'Pencapaian 10.000 Hari Hidup',
    },
    ar: {
      brand_title: 'حاسبة العمر',
      brand_sub: 'دقة التقويم الفلكي',
      tagline: 'احسب عمرك بدقة بالسنوات والأشهر والأيام فوراً وبكل سهولة.',
      tab_age: 'حاسبة العمر',
      tab_diff: 'الفرق بين تاريخين',
      tab_culture: 'التقاويم الثقافية',
      label_dob: 'تاريخ الميلاد',
      label_asof: 'العمر حتى تاريخ',
      btn_calc_age: 'احسب العمر الدقيق',
      btn_reset: 'إعادة ضبط',
      btn_today: 'اليوم',
      years: 'سنوات',
      months: 'أشهر',
      days: 'أيام',
      total_months: 'إجمالي الأشهر',
      total_weeks: 'إجمالي الأسابيع',
      total_days: 'إجمالي الأيام',
      total_hours: 'إجمالي الساعات',
      total_minutes: 'إجمالي الدقائق',
      born_on: 'ولدت في يوم',
      next_bday_label: 'العد التنازلي لعيد ميلادك القادم',
      in_days: 'خلال',
      days_left: 'يوماً متبقياً',
      btn_share_card: 'إنشاء بطاقة للمشاركة',
      btn_copy_summary: 'نسخ النتيجة',
      share_modal_title: 'بطاقة الإنجاز الشخصي',
      share_modal_sub: 'احفظ الصورة أو شاركها مباشرة عبر حالة واتساب',
      btn_whatsapp: 'مشاركة عبر واتساب',
      btn_download_img: 'تحميل الصورة (PNG)',
      cultural_title: 'التقويم الهجري والتقاويم الأخرى',
      hijri_label: 'التقويم الهجري القمري الإسلامي',
      hindu_label: 'التقويم الهندوسي (فيكرام سامفات)',
      korean_label: 'حساب العمر الكوري (التقليدي والمدني)',
      birthstone_label: 'حجر الميلاد الفلكي',
      weekday_ruler_label: 'الكوكب الحاكم ليوم الميلاد',
      milestone_10k_title: 'محطة الـ 10,000 يوم من حياتك',
    },
    fr: {
      brand_title: "Calculateur d'Âge",
      brand_sub: 'Précision Calendaire',
      tagline: 'Calculez votre âge exact en années, mois et jours instantanément.',
      tab_age: "Calculateur d'Âge",
      tab_diff: 'Différence de Dates',
      tab_culture: 'Calendriers Culturels',
      label_dob: 'Date de Naissance',
      label_asof: "Âge à la Date d'Aujourd'hui",
      btn_calc_age: "Calculer l'Âge Exact",
      btn_reset: 'Réinitialiser',
      btn_today: "Aujourd'hui",
      years: 'Ans',
      months: 'Mois',
      days: 'Jours',
      total_months: 'Total Mois',
      total_weeks: 'Total Semaines',
      total_days: 'Total Jours',
      total_hours: 'Total Heures',
      total_minutes: 'Total Minutes',
      born_on: 'Né(e) un',
      next_bday_label: 'Compte à Rebours Anniversaire',
      in_days: 'dans',
      days_left: 'jours restants',
      btn_share_card: 'Créer Carte de Partage',
      btn_copy_summary: 'Copier le Résultat',
      share_modal_title: 'Carte de Célébration Personnelle',
      share_modal_sub: "Téléchargez l'image ou partagez sur WhatsApp",
      btn_whatsapp: 'Partager sur WhatsApp',
      btn_download_img: "Télécharger l'Image (PNG)",
      cultural_title: 'Calendriers Culturels et Alternatifs',
      hijri_label: 'Calendrier Lunaire Islamique Hégirien',
      hindu_label: 'Calendrier Hindou (Vikram Samvat)',
      korean_label: 'Âge Coréen (Traditionnel vs Loi Civile)',
      birthstone_label: 'Pierre de Naissance GIA',
      weekday_ruler_label: 'Astre Régent du Jour',
      milestone_10k_title: 'Étape des 10 000 Jours Vécus',
    },
    de: {
      brand_title: 'Altersrechner',
      brand_sub: 'Kalendarische Präzision',
      tagline: 'Ermitteln Sie sofort Ihr exaktes Alter in Jahren, Monaten und Tagen.',
      tab_age: 'Altersrechner',
      tab_diff: 'Datumsdifferenz',
      tab_culture: 'Kulturelle Kalender',
      label_dob: 'Geburtsdatum',
      label_asof: 'Alter zum Stichtag',
      btn_calc_age: 'Exaktes Alter Berechnen',
      btn_reset: 'Zurücksetzen',
      btn_today: 'Heute',
      years: 'Jahre',
      months: 'Monate',
      days: 'Tage',
      total_months: 'Monate Gesamt',
      total_weeks: 'Wochen Gesamt',
      total_days: 'Tage Gesamt',
      total_hours: 'Stunden Gesamt',
      total_minutes: 'Minuten Gesamt',
      born_on: 'Geboren an einem',
      next_bday_label: 'Geburtstags-Countdown',
      in_days: 'in',
      days_left: 'Tage verbleibend',
      btn_share_card: 'Ergebniskarte Erstellen',
      btn_copy_summary: 'Ergebnis Kopieren',
      share_modal_title: 'Meilenstein-Karte',
      share_modal_sub: 'Bild herunterladen oder auf WhatsApp teilen',
      btn_whatsapp: 'Auf WhatsApp teilen',
      btn_download_img: 'Bild herunterladen (PNG)',
      cultural_title: 'Kulturelle und Alternative Kalender',
      hijri_label: 'Islamischer Hidschri-Mondkalender',
      hindu_label: 'Hindukalender (Vikram Samvat)',
      korean_label: 'Koreanisches Alter (Traditionell vs. Zivilgesetz)',
      birthstone_label: 'GIA-Geburtsstein',
      weekday_ruler_label: 'Planetenherrscher des Geburtstags',
      milestone_10k_title: 'Meilenstein: 10.000 Tage auf Erden',
    },
    bn: {
      brand_title: 'বয়স ক্যালকুলেটর',
      brand_sub: 'ক্যালেন্ডার নির্ভুলতা',
      tagline: 'আপনার সঠিক বয়স বছর, মাস এবং দিনে তাত্ক্ষণিকভাবে জানুন।',
      tab_age: 'বয়স ক্যালকুলেটর',
      tab_diff: 'তারিখের পার্থক্য',
      tab_culture: 'সাংস্কৃতিক পঞ্জিকা',
      label_dob: 'জন্ম তারিখ',
      label_asof: 'যে তারিখ পর্যন্ত হিসাব করবেন',
      btn_calc_age: 'সঠিক বয়স গণনা করুন',
      btn_reset: 'রিসেট',
      btn_today: 'আজ',
      years: 'বছর',
      months: 'মাস',
      days: 'দিন',
      total_months: 'মোট মাস',
      total_weeks: 'মোট সপ্তাহ',
      total_days: 'মোট দিন',
      total_hours: 'মোট ঘন্টা',
      total_minutes: 'মোট মিনিট',
      born_on: 'জন্ম বার',
      next_bday_label: 'পরবর্তী জন্মদিন',
      in_days: 'মধ্যে',
      days_left: 'দিন বাকি',
      btn_share_card: 'শেয়ার কার্ড তৈরি করুন',
      btn_copy_summary: 'কপি করুন',
      share_modal_title: 'সোশ্যাল শেয়ার কার্ড',
      share_modal_sub: 'ছবি ডাউনলোড করুন বা হোয়াটসঅ্যাপ স্ট্যাটাসে শেয়ার করুন',
      btn_whatsapp: 'হোয়াটসঅ্যাপে শেয়ার করুন',
      btn_download_img: 'ছবি ডাউনলোড করুন (PNG)',
      cultural_title: 'অন্যান্য পঞ্জিকা ও ক্যালেন্ডার',
      hijri_label: 'ইসলামিক হিজরি চান্দ্র পঞ্জিকা',
      hindu_label: 'হিন্দু পঞ্জিকা (বিক্রম সংবৎ)',
      korean_label: 'কোরিয়ান বয়স পদ্ধতি',
      birthstone_label: 'জন্ম রত্ন',
      weekday_ruler_label: 'জন্মদিনের অধিপতি গ্রহ',
      milestone_10k_title: '১০,০০০ দিনের জীবন মাইলফলক',
    },
    or: {
      brand_title: 'ବୟସ କାଲକୁଲେଟର',
      brand_sub: 'ସଠିକ୍ କ୍ୟାଲେଣ୍ଡର ଗଣନା',
      tagline: 'ଆପଣଙ୍କର ସଠିକ୍ ବୟସ ବର୍ଷ, ମାସ ଏବଂ ଦିନରେ ତୁରନ୍ତ ଜାଣନ୍ତୁ।',
      tab_age: 'ବୟସ କାଲକୁଲେଟର',
      tab_diff: 'ତାରିଖ ମଧ୍ୟରେ ଅନ୍ତର',
      tab_culture: 'ଅନ୍ୟାନ୍ୟ ପଞ୍ଜିକା ଓ କ୍ୟାଲେଣ୍ଡର',
      label_dob: 'ଜନ୍ମ ତାରିଖ',
      label_asof: 'ଏହି ତାରିଖ ସୁଦ୍ଧା ବୟସ',
      btn_calc_age: 'ସଠିକ୍ ବୟସ ଗଣନା କରନ୍ତୁ',
      btn_reset: 'ରିସେଟ୍ କରନ୍ତୁ',
      btn_today: 'ଆଜି',
      years: 'ବର୍ଷ',
      months: 'ମାସ',
      days: 'ଦିନ',
      total_months: 'ସମୁଦାୟ ମାସ',
      total_weeks: 'ସମୁଦାୟ ସପ୍ତାହ',
      total_days: 'ସମୁଦାୟ ଦିନ',
      total_hours: 'ସମୁଦାୟ ଘଣ୍ଟା',
      total_minutes: 'ସମୁଦାୟ ମିନିଟ୍',
      born_on: 'ଜନ୍ମ ବାର',
      next_bday_label: 'ପରବର୍ତ୍ତୀ ଜନ୍ମଦିନ',
      in_days: 'ମଧ୍ୟରେ',
      days_left: 'ଦିନ ବାକି',
      btn_share_card: 'ସେୟାର କାର୍ଡ ପ୍ରସ୍ତୁତ କରନ୍ତୁ',
      btn_copy_summary: 'କପି କରନ୍ତୁ',
      share_modal_title: 'ସୋସିଆଲ ସେୟାର କାର୍ଡ',
      share_modal_sub: 'ଫଟୋ ଡାଉନଲୋଡ୍ କରନ୍ତୁ ବା ହ୍ୱାଟ୍ସଆପ୍ ରେ ସେୟାର କରନ୍ତୁ',
      btn_whatsapp: 'ହ୍ୱାଟ୍ସଆପ୍ ରେ ସେୟାର କରନ୍ତୁ',
      btn_download_img: 'ଫଟୋ ଡାଉନଲୋଡ୍ କରନ୍ତୁ (PNG)',
      cultural_title: 'ଅନ୍ୟାନ୍ୟ କ୍ୟାଲେଣ୍ଡର ଓ ପଞ୍ଜିକା',
      hijri_label: 'ଇସଲାମିକ ହିଜରୀ ଚାନ୍ଦ୍ର କ୍ୟାଲେଣ୍ଡର',
      hindu_label: 'ହିନ୍ଦୁ ପଞ୍ଜିକା (ବିକ୍ରମ ସମ୍ବତ)',
      korean_label: 'କୋରିଆନ ବୟସ',
      birthstone_label: 'ଜନ୍ମ ରତ୍ନ',
      weekday_ruler_label: 'ଜନ୍ମବାର ଗ୍ରହ ଅଧିପତି',
      milestone_10k_title: '୧୦,୦୦୦ ଦିନର ସ୍ମରଣୀୟ ଦିବସ',
    }
  };

  let currentLang = 'en';

  function detectBrowserLanguage() {
    if (typeof navigator === 'undefined') return 'en';
    const nav = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('pt')) return 'pt';
    if (nav.startsWith('id')) return 'id';
    if (nav.startsWith('ar')) return 'ar';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('hi')) return 'hi';
    if (nav.startsWith('bn')) return 'bn';
    if (nav.startsWith('or')) return 'or';
    return 'en';
  }

  function initLanguage() {
    let saved = null;
    try {
      saved = localStorage.getItem('dobcal_lang');
    } catch (e) {
      // Ignored if storage disabled
    }

    if (saved && TRANSLATIONS[saved]) {
      currentLang = saved;
    } else {
      currentLang = detectBrowserLanguage();
    }
    applyTranslations();
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    try {
      localStorage.setItem('dobcal_lang', lang);
    } catch (e) {
      // Ignored
    }
    applyTranslations();
  }

  function getLanguage() {
    return currentLang;
  }

  function getLanguageMeta(code) {
    return LANGUAGES.find(l => l.code === (code || currentLang)) || LANGUAGES[0];
  }

  function t(key) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  }

  function applyTranslations() {
    const meta = getLanguageMeta(currentLang);
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = meta.dir || 'ltr';
      }

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
          el.textContent = t(key);
        }
      });

      // Update active state on language pills or select elements
      document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLang) {
          btn.classList.add('bg-black', 'text-white', 'dark:bg-white', 'dark:text-black', 'font-bold');
          btn.classList.remove('text-slate-600', 'dark:text-zinc-400');
        } else {
          btn.classList.remove('bg-black', 'text-white', 'dark:bg-white', 'dark:text-black', 'font-bold');
          btn.classList.add('text-slate-600', 'dark:text-zinc-400');
        }
      });

      // Update language select dropdown value if present
      const langSelect = document.getElementById('global-lang-select');
      if (langSelect && langSelect.value !== currentLang) {
        langSelect.value = currentLang;
      }
    }
  }

  return {
    LANGUAGES,
    TRANSLATIONS,
    detectBrowserLanguage,
    initLanguage,
    setLanguage,
    getLanguage,
    getLanguageMeta,
    t,
    applyTranslations,
  };
});
