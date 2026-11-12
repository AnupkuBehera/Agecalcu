/**
 * Automated test suite for AgeCalculator logic.
 * Run with: node test/test-calc.js
 */

const assert = require('assert');
const Calc = require('../js/calculator.js');

let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    failedTests++;
  }
}

console.log('--- Running AgeCalculator Engine Tests ---');

// Leap Year Tests
test('isLeapYear correctly identifies leap years and common years', () => {
  assert.strictEqual(Calc.isLeapYear(2000), true, '2000 is leap');
  assert.strictEqual(Calc.isLeapYear(2024), true, '2024 is leap');
  assert.strictEqual(Calc.isLeapYear(1900), false, '1900 is NOT leap');
  assert.strictEqual(Calc.isLeapYear(2023), false, '2023 is NOT leap');
  assert.strictEqual(Calc.isLeapYear(2026), false, '2026 is NOT leap');
});

// Days In Month Tests
test('getDaysInMonth handles leap and non-leap Feb, plus 30/31 day months', () => {
  assert.strictEqual(Calc.getDaysInMonth(2024, 2), 29, 'Feb 2024 has 29 days');
  assert.strictEqual(Calc.getDaysInMonth(2023, 2), 28, 'Feb 2023 has 28 days');
  assert.strictEqual(Calc.getDaysInMonth(2026, 1), 31, 'Jan 2026 has 31 days');
  assert.strictEqual(Calc.getDaysInMonth(2026, 4), 30, 'Apr 2026 has 30 days');
});

// Standard Age Calculation
test('calcAge handles standard full years, months, and days', () => {
  // Born 1990-05-15, AsOf 2026-11-05
  const res = Calc.calcAge('1990-05-15', '2026-11-05');
  assert.strictEqual(res.years, 36);
  assert.strictEqual(res.months, 5);
  assert.strictEqual(res.days, 21);
  assert.strictEqual(res.dayOfWeekBorn, 'Tuesday');
});

// Same Day (Zero Age)
test('calcAge handles exact same day of birth (0 years, 0 months, 0 days)', () => {
  const res = Calc.calcAge('2026-11-05', '2026-11-05');
  assert.strictEqual(res.years, 0);
  assert.strictEqual(res.months, 0);
  assert.strictEqual(res.days, 0);
  assert.strictEqual(res.totals.days, 0);
  assert.strictEqual(res.totals.hours, 0);
});

// Exactly 1 Year Old
test('calcAge handles exact 1st birthday', () => {
  const res = Calc.calcAge('2025-11-05', '2026-11-05');
  assert.strictEqual(res.years, 1);
  assert.strictEqual(res.months, 0);
  assert.strictEqual(res.days, 0);
});

// Day Before Birthday
test('calcAge handles day immediately preceding birthday', () => {
  const res = Calc.calcAge('2000-06-15', '2026-06-14');
  assert.strictEqual(res.years, 25);
  assert.strictEqual(res.months, 11);
  assert.strictEqual(res.days, 30);
});

// Leap Year Baby: Feb 29 DOB
test('calcAge handles Feb 29 birth date on leap years and common years', () => {
  // Born 2000-02-29, evaluated on 2004-02-29 (leap year anniversary)
  const leap4 = Calc.calcAge('2000-02-29', '2004-02-29');
  assert.strictEqual(leap4.years, 4);
  assert.strictEqual(leap4.months, 0);
  assert.strictEqual(leap4.days, 0);

  // Born 2000-02-29, evaluated on 2001-02-28 (common year)
  const common1 = Calc.calcAge('2000-02-29', '2001-02-28');
  assert.strictEqual(common1.years, 1);
  assert.strictEqual(common1.months, 0);
  assert.strictEqual(common1.days, 0);

  // Born 2000-02-29, evaluated on 2001-03-01
  const common1DayAfter = Calc.calcAge('2000-02-29', '2001-03-01');
  assert.strictEqual(common1DayAfter.years, 1);
  assert.strictEqual(common1DayAfter.months, 0);
  assert.strictEqual(common1DayAfter.days, 1);
});

// Month-End Borrowing Edge Cases
test('calcAge handles month-end dates gracefully (Jan 31 to Feb 28 common year)', () => {
  const res = Calc.calcAge('2023-01-31', '2023-02-28');
  assert.strictEqual(res.years, 0);
  assert.strictEqual(res.months, 0);
  assert.strictEqual(res.days, 28);
  assert.strictEqual(res.totals.days, 28);
});

test('calcAge handles Jan 31 to March 1 (1 month, 1 day)', () => {
  const res = Calc.calcAge('2023-01-31', '2023-03-01');
  assert.strictEqual(res.years, 0);
  assert.strictEqual(res.months, 1);
  assert.strictEqual(res.days, 1);
  assert.strictEqual(res.totals.days, 29);
});

test('calcAge handles Aug 31 to Sep 30 (0 months, 30 days)', () => {
  const res = Calc.calcAge('2023-08-31', '2023-09-30');
  assert.strictEqual(res.years, 0);
  assert.strictEqual(res.months, 0);
  assert.strictEqual(res.days, 30);
});

test('calcAge handles Aug 31 to Oct 1 (1 month, 1 day)', () => {
  const res = Calc.calcAge('2023-08-31', '2023-10-01');
  assert.strictEqual(res.years, 0);
  assert.strictEqual(res.months, 1);
  assert.strictEqual(res.days, 1);
});

// Cutoff Dates
test('calcAge calculates popular exam cutoff dates accurately', () => {
  const cutoffJan = Calc.calcAge('1998-07-20', '2026-01-01');
  assert.strictEqual(cutoffJan.years, 27);
  assert.strictEqual(cutoffJan.months, 5);
  assert.strictEqual(cutoffJan.days, 12);
});

// Western & Chinese Zodiac
test('Western Zodiac calculation produces correct sign', () => {
  assert.strictEqual(Calc.getWesternZodiac(11, 5).name, 'Scorpio');
  assert.strictEqual(Calc.getWesternZodiac(3, 21).name, 'Aries');
  assert.strictEqual(Calc.getWesternZodiac(1, 1).name, 'Capricorn');
  assert.strictEqual(Calc.getWesternZodiac(7, 4).name, 'Cancer');
});

test('Chinese Zodiac calculation produces correct animal and element', () => {
  const z2024 = Calc.getChineseZodiac(2024);
  assert.strictEqual(z2024.animal, 'Dragon');
  assert.strictEqual(z2024.element, 'Wood');

  const z2000 = Calc.getChineseZodiac(2000);
  assert.strictEqual(z2000.animal, 'Dragon');
  assert.strictEqual(z2000.element, 'Metal');

  const z1990 = Calc.getChineseZodiac(1990);
  assert.strictEqual(z1990.animal, 'Horse');
  assert.strictEqual(z1990.element, 'Metal');
});

// Milestones & Biological Stats
test('calcAge computes valid biological estimates and milestones', () => {
  const res = Calc.calcAge('2000-01-01', '2026-01-01');
  assert.ok(res.biological.heartbeats > 0);
  assert.ok(res.biological.sleepHours > 0);
  assert.ok(res.milestones.nextDayMilestone >= res.totals.days);
  assert.ok(res.milestones.daysToMilestone >= 0);
  assert.ok(res.milestones.yearProgressPercent >= 0 && res.milestones.yearProgressPercent <= 100);
});

// Next Birthday Calculation
test('getNextBirthday computes accurate countdown and weekday', () => {
  const next = Calc.getNextBirthday('1995-12-25', '2026-11-05');
  assert.strictEqual(next.daysRemaining, 50);
  assert.strictEqual(next.isToday, false);
  assert.strictEqual(next.weekday, 'Friday');

  const todayBday = Calc.getNextBirthday('1995-11-05', '2026-11-05');
  assert.strictEqual(todayBday.daysRemaining, 0);
  assert.strictEqual(todayBday.isToday, true);
});

// Date Difference Tool Tests
test('calcDateDiff computes non-inclusive and inclusive differences', () => {
  const diffNon = Calc.calcDateDiff('2026-01-01', '2026-01-02', false);
  assert.strictEqual(diffNon.totalDays, 1);

  const diffInc = Calc.calcDateDiff('2026-01-01', '2026-01-02', true);
  assert.strictEqual(diffInc.totalDays, 2);
});

// Cultural Calendars & New Features
test('Hijri calendar calculations return valid lunar age and year', () => {
  const res = Calc.calcAge('2000-01-01', '2026-01-01');
  assert.ok(res.hijri.lunarYears >= 26);
  assert.ok(res.hijri.currentHijriYear.includes('AH'));
});

test('Hindu calendar returns Vikram Samvat (+57) and Shaka Samvat (-78)', () => {
  const res = Calc.calcAge('2000-01-01', '2026-01-01');
  assert.strictEqual(res.hindu.birthVikramSamvat, '2057 VS');
  assert.strictEqual(res.hindu.currentVikramSamvat, '2083 VS');
  assert.strictEqual(res.hindu.birthShakaSamvat, '1922 SE');
});

test('Korean age calculations return traditional and new civil age', () => {
  const res = Calc.calcAge('2000-05-15', '2026-01-01');
  assert.strictEqual(res.korean.traditionalKoreanAge, 27); // 2026 - 2000 + 1
  assert.strictEqual(res.korean.civilLawAge, 25);
});

test('10,000 Days milestone calculation accurately calculates target date', () => {
  const res = Calc.calcAge('2000-01-01', '2026-01-01');
  // 10,000 days from 2000-01-01 is 2027-05-19
  assert.strictEqual(res.milestoneDays.tenThousandDate, '2027-05-19');
  assert.strictEqual(res.milestoneDays.is10kPassed, false);
  assert.ok(res.milestoneDays.daysTo10k > 0);
});

test('Pet age calculates breed-specific dog years and cat years', () => {
  const dogSmall = Calc.calcPetAge(4, 0, 'dog', 'small');
  assert.strictEqual(dogSmall.humanEquivalentYears, 32);

  const dogGiant = Calc.calcPetAge(4, 0, 'dog', 'giant');
  assert.strictEqual(dogGiant.humanEquivalentYears, 39);

  const cat = Calc.calcPetAge(4, 0, 'cat');
  assert.strictEqual(cat.humanEquivalentYears, 32);
});

// Planetary Ages Tests
test('calcPlanetaryAges calculates accurate orbital ages across solar planets', () => {
  const res = Calc.calcPlanetaryAges('2000-01-01', '2026-01-01');
  assert.strictEqual(res.planets.length, 8);
  const mercury = res.planets.find(p => p.name === 'Mercury');
  const mars = res.planets.find(p => p.name === 'Mars');
  assert.ok(mercury.age > 100); // 26 Earth years ≈ 107 Mercury years
  assert.ok(mars.age < 15);    // 26 Earth years ≈ 13.8 Mars years
});

// Numerology Tests
test('calcNumerology computes correct Life Path and Birth Day numbers', () => {
  const res = Calc.calcNumerology('2000-01-01');
  assert.strictEqual(res.lifePathNumber, 4); // 2 + 1 + 1 = 4
  assert.strictEqual(res.birthDayNumber, 1);
  assert.strictEqual(res.archetype.title, 'The Builder');

  const resMaster = Calc.calcNumerology('1990-10-01');
  assert.ok(resMaster.lifePathNumber >= 1 && resMaster.lifePathNumber <= 33);
});

// Vedic Astrology Tests
test('calcVedicAstrology returns Nakshatra, Rashi, and Tithi', () => {
  const res = Calc.calcVedicAstrology('2000-01-01');
  assert.ok(res.nakshatra && res.nakshatra.name);
  assert.ok(res.rashi && res.rashi.sanskrit);
  assert.ok(res.tithi && res.tithi.includes('Paksha'));
  assert.ok(res.hinduMonth);
});

// Generation Classification Tests
test('getGeneration identifies correct demographic cohorts', () => {
  assert.strictEqual(Calc.getGeneration(2018).name, 'Gen Alpha');
  assert.strictEqual(Calc.getGeneration(2002).name, 'Gen Z (Zoomers)');
  assert.strictEqual(Calc.getGeneration(1990).name, 'Millennials (Gen Y)');
  assert.strictEqual(Calc.getGeneration(1975).name, 'Generation X');
  assert.strictEqual(Calc.getGeneration(1955).name, 'Baby Boomers');
  assert.strictEqual(Calc.getGeneration(1935).name, 'Silent Generation');
});

// Retirement & Pension Service-Years Tests
test('calcRetirementAndPension enforces last day of month retirement rule and 1st of month rule', () => {
  // Standard case: born 15th May 1966 -> retires 31st May 2026 (age 60)
  const reg = Calc.calcRetirementAndPension('1966-05-15', '1995-01-01', 60, '2026-01-01');
  assert.strictEqual(reg.retirementDateFormatted, '2026-05-31');
  assert.ok(reg.daysRemaining > 0);
  assert.ok(reg.totalServiceYears >= 31);
  assert.strictEqual(reg.pensionEligibility.includes('Full 50% Basic Pension'), true);

  // CCS 1st of month rule: born 1st May 1966 -> retires 30th April 2026 (preceding month!)
  const firstOfMonth = Calc.calcRetirementAndPension('1966-05-01', '1995-01-01', 60, '2026-01-01');
  assert.strictEqual(firstOfMonth.retirementDateFormatted, '2026-04-30');
});

// Pregnancy Due Date Tests
test('calcPregnancy computes accurate Naegeles rule due date and gestational weeks', () => {
  const preg = Calc.calcPregnancy('2026-01-01', 28, '2026-04-01');
  // 2026-01-01 + 280 days = 2026-10-08
  assert.strictEqual(preg.dueDateFormatted, '2026-10-08');
  assert.strictEqual(preg.currentWeeks, 12);
  assert.strictEqual(preg.currentDays, 6);
  assert.strictEqual(preg.trimester.includes('First Trimester'), true);
});

// Vaccination Schedule Tests
test('calcVaccinationSchedule generates full IAP/WHO vaccine milestones', () => {
  const vax = Calc.calcVaccinationSchedule('2026-01-01', '2026-03-01');
  assert.strictEqual(vax.schedule.length, 13);
  assert.strictEqual(vax.schedule[0].ageLabel, 'At Birth');
  assert.strictEqual(vax.schedule[0].scheduledDate, '2026-01-01');
  assert.strictEqual(vax.schedule[0].status, 'completed');
  assert.strictEqual(vax.schedule[1].ageLabel, '6 Weeks');
});

// Warranty Tracker Tests
test('calcWarranty computes expiration date and remaining days', () => {
  const w = Calc.calcWarranty('2025-01-01', 12, '2025-07-01');
  assert.strictEqual(w.expirationDateFormatted, '2026-01-01');
  assert.strictEqual(w.isExpired, false);
  assert.ok(w.percentElapsed >= 49 && w.percentElapsed <= 51);
});

// Calendar .ics Generator Tests
test('generateIcsCalendar generates RFC 5545 valid calendar text', () => {
  const ics = Calc.generateIcsCalendar({
    title: 'John Birthday Celebration',
    date: '2026-12-25',
    recurrenceYearly: true,
  });
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('SUMMARY:John Birthday Celebration'));
  assert.ok(ics.includes('RRULE:FREQ=YEARLY'));
  assert.ok(ics.includes('END:VCALENDAR'));
});

// Localization & Internationalization (i18n) Tests
test('DobcalI18n supports 10 global languages with complete translation keys', () => {
  const I18n = require('../js/i18n.js');
  const expectedCodes = ['en', 'hi', 'es', 'pt', 'id', 'ar', 'fr', 'de', 'bn', 'or'];

  assert.strictEqual(I18n.LANGUAGES.length, 10);
  expectedCodes.forEach(code => {
    assert.ok(I18n.TRANSLATIONS[code], `Missing translations for language: ${code}`);
    const dict = I18n.TRANSLATIONS[code];
    assert.ok(dict.brand_title && dict.brand_title.length > 0);
    assert.ok(dict.years && dict.years.length > 0);
    assert.ok(dict.months && dict.months.length > 0);
    assert.ok(dict.days && dict.days.length > 0);
    assert.ok(dict.btn_calc_age && dict.btn_calc_age.length > 0);
    assert.ok(dict.label_dob && dict.label_dob.length > 0);
  });

  // Arabic RTL check
  const arMeta = I18n.getLanguageMeta('ar');
  assert.strictEqual(arMeta.dir, 'rtl');

  // English LTR check
  const enMeta = I18n.getLanguageMeta('en');
  assert.strictEqual(enMeta.dir, 'ltr');
});

// Error Validation
test('Throws friendly errors on future DOB or invalid order', () => {
  assert.throws(() => {
    Calc.calcAge('2026-11-10', '2026-11-05');
  }, /cannot be after the target date/);
});

console.log(`\nAll tests completed: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
}
