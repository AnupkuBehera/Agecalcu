const assert = require('assert');
const I18n = require('../js/i18n.js');

console.log('--- Running Dobcal I18n Localization Engine Tests ---');

let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failedTests++;
  }
}

// 1. Language Roster & Meta
test('supports all 10 global languages with complete metadata', () => {
  const expectedCodes = ['en', 'hi', 'es', 'pt', 'id', 'ar', 'fr', 'de', 'bn', 'or'];
  assert.strictEqual(I18n.LANGUAGES.length, 10);
  
  expectedCodes.forEach(code => {
    const meta = I18n.getLanguageMeta(code);
    assert.ok(meta, `Missing metadata for code: ${code}`);
    assert.strictEqual(meta.code, code);
    assert.ok(meta.name && meta.name.length > 0);
    assert.ok(meta.flag && meta.flag.length > 0);
    assert.ok(meta.dir === 'ltr' || meta.dir === 'rtl');
  });
});

// 2. RTL vs LTR Directionality
test('correctly configures RTL for Arabic and LTR for others', () => {
  const arMeta = I18n.getLanguageMeta('ar');
  assert.strictEqual(arMeta.dir, 'rtl');

  const enMeta = I18n.getLanguageMeta('en');
  assert.strictEqual(enMeta.dir, 'ltr');

  const hiMeta = I18n.getLanguageMeta('hi');
  assert.strictEqual(hiMeta.dir, 'ltr');
});

// 3. 100% Dictionary Key Parity with English
test('ensures 100% translation key parity across all 10 languages', () => {
  const enDict = I18n.TRANSLATIONS.en;
  assert.ok(enDict, 'English base dictionary must exist');
  const enKeys = Object.keys(enDict);
  assert.ok(enKeys.length >= 30, `Expected at least 30 keys, found ${enKeys.length}`);

  Object.entries(I18n.TRANSLATIONS).forEach(([lang, dict]) => {
    const missingKeys = enKeys.filter(k => !(k in dict));
    assert.strictEqual(
      missingKeys.length,
      0,
      `Language "${lang}" is missing keys: ${missingKeys.join(', ')}`
    );

    // Ensure non-empty translations
    enKeys.forEach(k => {
      assert.ok(
        typeof dict[k] === 'string' && dict[k].trim().length > 0,
        `Language "${lang}" key "${k}" has empty translation`
      );
    });
  });
});

// 4. API Switching & Key Translation
test('setLanguage and t(key) update active dictionary and resolve strings', () => {
  I18n.setLanguage('es');
  assert.strictEqual(I18n.getLanguage(), 'es');
  assert.strictEqual(I18n.t('btn_calc_age'), 'Calcular Edad Exacta');
  assert.strictEqual(I18n.t('tab_age'), 'Calculadora de Edad');

  I18n.setLanguage('hi');
  assert.strictEqual(I18n.getLanguage(), 'hi');
  assert.strictEqual(I18n.t('btn_calc_age'), 'सटीक उम्र की गणना करें');

  I18n.setLanguage('fr');
  assert.strictEqual(I18n.getLanguage(), 'fr');
  assert.strictEqual(I18n.t('btn_calc_age'), "Calculer l'Âge Exact");

  // Fallback to key if unknown
  assert.strictEqual(I18n.t('non_existent_key_123'), 'non_existent_key_123');

  // Reset to default
  I18n.setLanguage('en');
  assert.strictEqual(I18n.getLanguage(), 'en');
});

console.log(`\nAll i18n tests completed: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
}
