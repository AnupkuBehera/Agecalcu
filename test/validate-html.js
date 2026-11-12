const fs = require('fs');

console.log('--- Multi-Page SEO Cluster & Deployment Assets Validation ---');

const pages = [
  {
    file: 'index.html',
    titleIncludes: 'Age Calculator',
    requiredIds: [
      'theme-toggle', 'tab-btn-age', 'tab-btn-diff', 'section-age', 'section-diff',
      'btn-calc-age', 'age-results-card', 'confetti-canvas', 'btn-copy-result',
      'btn-share-result', 'subtab-btn-culture', 'hijri-lunar-age', 'hindu-vikram-year',
      'korean-ages', 'birthstone-title', 'ruler-symbol', 'text-10k-date', 'modal-share-card',
      'share-card-canvas', 'btn-download-card-png', 'link-whatsapp-share', 'toast'
    ]
  },
  {
    file: 'calculate-age-in-excel.html',
    titleIncludes: 'Calculate Age from Date of Birth in Excel',
    requiredIds: [
      'theme-toggle', 'cell-dob', 'ref-target', 'formula-format', 'formula-output',
      'btn-copy-formula', 'test-dob', 'test-asof', 'test-result', 'toast'
    ]
  },
  {
    file: 'age-in-months-and-days.html',
    titleIncludes: 'Age Calculator in Months and Days',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-calc', 'btn-today',
      'hero-months', 'hero-days', 'std-years', 'tile-weeks', 'tile-days', 'btn-copy', 'toast'
    ]
  },
  {
    file: 'how-old-will-i-be-in-2040.html',
    titleIncludes: 'How Old Will I Be in 2040?',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-target-year', 'hero-age', 'display-year',
      'stage-title', 'stat-countdown-days', 'stat-leap-status', 'decades-tbody'
    ]
  },
  {
    file: 'age-difference-calculator.html',
    titleIncludes: 'Age Difference Calculator',
    requiredIds: [
      'theme-toggle', 'p1-name', 'p1-dob', 'p2-name', 'p2-dob', 'btn-swap',
      'verdict-headline', 'gap-years', 'gap-months', 'gap-days', 'stat-total-days'
    ]
  },
  {
    file: 'age-calculator-for-government-exams.html',
    titleIncludes: 'Age Calculator for Indian Government Exams',
    requiredIds: [
      'theme-toggle', 'select-exam', 'select-category', 'input-dob', 'input-cutoff',
      'status-card', 'badge-icon', 'badge-text', 'res-years', 'res-months', 'res-days',
      'form-ready-text', 'btn-copy-form', 'toast'
    ]
  },
  {
    file: 'school-admission-age-calculator.html',
    titleIncludes: 'School Admission Age Calculator',
    requiredIds: [
      'theme-toggle', 'select-grade', 'select-session', 'child-dob', 'cutoff-date',
      'status-card', 'badge-icon', 'badge-text', 'res-years', 'res-months', 'res-days',
      'form-summary', 'btn-copy-form', 'toast'
    ]
  },
  {
    file: 'voting-and-driving-eligibility-calculator.html',
    titleIncludes: 'Voting & Driving License Age Eligibility Calculator',
    requiredIds: [
      'theme-toggle', 'input-dob', 'hero-years', 'hero-months', 'hero-days',
      'countdown-18-sentence', 'card-voting', 'card-driving-lmv', 'card-scooter', 'card-transport'
    ]
  },
  {
    file: 'pet-age-calculator.html',
    titleIncludes: 'Pet Age Calculator',
    requiredIds: [
      'theme-toggle', 'btn-species-dog', 'btn-species-cat', 'select-breed-size',
      'pet-years', 'pet-months', 'hero-human-years', 'stage-badge'
    ]
  },
  {
    file: 'bulk-age-calculator.html',
    titleIncludes: 'Bulk Age Calculator',
    requiredIds: [
      'theme-toggle', 'file-csv', 'text-dates', 'btn-process', 'btn-clear',
      'results-container', 'btn-export-csv', 'table-body'
    ]
  },
  {
    file: 'embed-widget.html',
    titleIncludes: 'Age Calculator Embed Widget',
    requiredIds: [
      'widget-dob', 'widget-asof', 'widget-result', 'widget-sub'
    ]
  },
  {
    file: 'retirement-and-pension-calculator.html',
    titleIncludes: 'Retirement & Pension Calculator',
    requiredIds: [
      'theme-toggle', 'ret-dob', 'ret-doj', 'select-ret-age', 'ret-rem-years',
      'ret-rem-months', 'ret-rem-days', 'ret-date-text', 'ret-service-total',
      'ret-qualifying-years', 'ret-pension-badge', 'ret-working-days', 'btn-copy-pension'
    ]
  },
  {
    file: 'pregnancy-due-date-calculator.html',
    titleIncludes: 'Pregnancy Due Date Calculator',
    requiredIds: [
      'theme-toggle', 'btn-mode-preg', 'btn-mode-baby', 'input-lmp', 'select-cycle',
      'input-baby-dob', 'hero-tag', 'hero-primary', 'hero-sub', 'preg-progress-pct',
      'preg-progress-bar', 'tile-trimester', 'tile-days-left', 'tile-milestone'
    ]
  },
  {
    file: 'child-vaccination-schedule-calculator.html',
    titleIncludes: 'Child Vaccination Schedule Calculator',
    requiredIds: [
      'theme-toggle', 'child-vax-dob', 'btn-print-vax', 'btn-download-ics',
      'stat-completed', 'stat-due', 'stat-upcoming', 'vax-table-body', 'table-subtitle'
    ]
  },
  {
    file: 'planet-age-calculator.html',
    titleIncludes: 'Planet Age Calculator',
    requiredIds: [
      'theme-toggle', 'planet-dob', 'planet-weight', 'planets-grid'
    ]
  },
  {
    file: 'numerology-life-path-calculator.html',
    titleIncludes: 'Numerology Life Path Calculator',
    requiredIds: [
      'theme-toggle', 'num-dob', 'res-lp-num', 'res-lp-title', 'res-lp-traits',
      'res-bday-num', 'res-bday-title', 'res-planet', 'res-color', 'res-stone'
    ]
  },
  {
    file: 'family-birthday-manager.html',
    titleIncludes: 'Family Birthday Manager',
    requiredIds: [
      'theme-toggle', 'form-add-person', 'person-name', 'person-relation',
      'person-dob', 'btn-save-person', 'member-count', 'btn-clear-all', 'members-list'
    ]
  },
  {
    file: 'warranty-and-product-age-calculator.html',
    titleIncludes: 'Warranty & Product Age Calculator',
    requiredIds: [
      'theme-toggle', 'purchase-date', 'select-warranty', 'prod-years',
      'prod-months', 'prod-days', 'warranty-status-desc', 'warranty-pct',
      'warranty-progress-bar', 'exp-date-text', 'rem-window-text', 'total-days-owned'
    ]
  },
  {
    file: 'developer-api.html',
    titleIncludes: 'Developer API & SDK',
    requiredIds: [
      'theme-toggle', 'api-test-dob', 'btn-run-api', 'api-json-output'
    ]
  },
  {
    file: 'calculadora-de-edad.html',
    titleIncludes: 'Calculadora de Edad Exacta',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'calculadora-de-idade.html',
    titleIncludes: 'Calculadora de Idade',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'kalkulator-umur.html',
    titleIncludes: 'Kalkulator Umur Online',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'hasibat-al-umr.html',
    titleIncludes: 'حاسبة العمر الدقيقة',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'stat-hijri', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'calculateur-age.html',
    titleIncludes: "Calculateur d'Âge Précis",
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'altersrechner.html',
    titleIncludes: 'Altersrechner',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'aayu-calculator-hindi.html',
    titleIncludes: 'आयु कैलकुलेटर',
    requiredIds: [
      'theme-toggle', 'input-dob', 'input-asof', 'btn-today', 'res-years',
      'res-months', 'res-days', 'res-sub', 'stat-total-days', 'btn-copy-result', 'toast'
    ]
  },
  {
    file: 'about.html',
    titleIncludes: 'About Dobcal',
    requiredIds: ['theme-toggle'],
    skipCalcScript: true
  },
  {
    file: 'privacy.html',
    titleIncludes: 'Privacy Policy',
    requiredIds: ['theme-toggle'],
    skipCalcScript: true
  },
  {
    file: 'terms.html',
    titleIncludes: 'Terms of Service',
    requiredIds: ['theme-toggle'],
    skipCalcScript: true
  }
];

// 1. Validate each HTML page
pages.forEach(p => {
  if (!fs.existsSync(p.file)) {
    throw new Error(`File missing: ${p.file}`);
  }
  const content = fs.readFileSync(p.file, 'utf8');

  // Title check
  if (!content.includes(p.titleIncludes)) {
    throw new Error(`Title mismatch in ${p.file}: expected "${p.titleIncludes}"`);
  }

  // Canonical tag check
  if (!content.includes('<link rel="canonical"')) {
    throw new Error(`Missing canonical tag in ${p.file}`);
  }

  // Assets link check
  if (!content.includes('href="css/style.css"')) {
    throw new Error(`Missing link to css/style.css in ${p.file}`);
  }
  if (!p.skipCalcScript && !content.includes('src="js/calculator.js"')) {
    throw new Error(`Missing link to js/calculator.js in ${p.file}`);
  }

  // Parse JSON-LD schemas
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  let schemaCount = 0;
  while ((match = jsonLdRegex.exec(content)) !== null) {
    schemaCount++;
    try {
      const data = JSON.parse(match[1].trim());
      if (!data['@type']) throw new Error('Missing @type in schema');
    } catch (err) {
      throw new Error(`Invalid JSON-LD in ${p.file}: ${err.message}`);
    }
  }
  if (schemaCount === 0) {
    throw new Error(`No JSON-LD schema found in ${p.file}`);
  }

  // Check required IDs
  p.requiredIds.forEach(id => {
    if (!content.includes(`id="${id}"`)) {
      throw new Error(`Missing required element id="${id}" in ${p.file}`);
    }
  });

  // Disallow unresolved domain placeholders
  if (content.includes('example.com')) {
    throw new Error(`Unresolved example.com placeholder found in ${p.file}`);
  }

  // Check BreadcrumbList schema exists in every page
  const hasBreadcrumb = /"@type":\s*"BreadcrumbList"/.test(content);
  if (!hasBreadcrumb) {
    throw new Error(`Missing BreadcrumbList schema in ${p.file}`);
  }

  // Title length check (avoid SERP truncation)
  const titleMatch = /<title>(.*?)<\/title>/.exec(content);
  if (!titleMatch) {
    throw new Error(`Missing <title> tag in ${p.file}`);
  }
  const titleText = titleMatch[1].trim();
  if (titleText.length > 75) {
    throw new Error(`Title tag too long (${titleText.length} chars) in ${p.file}: "${titleText}"`);
  }

  // Meta description check
  const descMatch = /<meta name="description" content="(.*?)">/.exec(content);
  if (!descMatch) {
    throw new Error(`Missing meta description in ${p.file}`);
  }
  const descText = descMatch[1].trim();
  if (descText.length < 40 || descText.length > 220) {
    throw new Error(`Meta description length unusual (${descText.length} chars) in ${p.file}`);
  }

  // Core Web Vitals: logos must have explicit width and height
  const expectedWidth = p.file === 'embed-widget.html' ? 'width="20"' : 'width="32"';
  const expectedHeight = p.file === 'embed-widget.html' ? 'height="20"' : 'height="32"';
  if (!content.includes(expectedWidth) || !content.includes(expectedHeight)) {
    throw new Error(`Missing explicit width/height on logo in ${p.file}`);
  }

  console.log(`✓ ${p.file}: Title (${titleText.length}c), Meta Desc (${descText.length}c), ${schemaCount} JSON-LD schemas (incl. BreadcrumbList), CLS 32x32 logo, and ${p.requiredIds.length} DOM elements verified`);
});

// 2. Validate Core Assets
['favicon.svg', 'assets/logo-mark.svg', 'assets/og-image.png', '404.html', 'css/style.css', 'js/calculator.js', 'js/i18n.js', 'js/app.js', 'manifest.webmanifest', 'sw.js', 'SKILL.md'].forEach(asset => {
  if (!fs.existsSync(asset)) throw new Error(`Missing core asset: ${asset}`);
});
console.log('✓ All core assets, i18n, and SKILL.md exist');

// 3. Validate Deployment Configs
if (!fs.existsSync('_headers')) throw new Error('Missing _headers file for Cloudflare Pages');
if (!fs.existsSync('robots.txt')) throw new Error('Missing robots.txt');
if (!fs.existsSync('sitemap.xml')) throw new Error('Missing sitemap.xml');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
pages.forEach(p => {
  const urlSnippet = p.file === 'index.html' ? '<loc>https://dobcal.pages.dev/</loc>' : `<loc>https://dobcal.pages.dev/${p.file}</loc>`;
  if (!sitemap.includes(urlSnippet)) {
    throw new Error(`sitemap.xml missing URL for ${p.file}`);
  }
});
console.log('✓ _headers, robots.txt, and complete sitemap.xml verified');

console.log(`\n🎉 All ${pages.length} Pages, JSON-LD Schemas, and Deployment Files Passed Validation!`);
