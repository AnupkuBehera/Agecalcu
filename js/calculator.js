/**
 * AgeCalculator Engine
 * Pure, dependency-free date arithmetic functions for accurate calendar and time calculations.
 * Includes Western Zodiac, Chinese Zodiac, Hindu (Vikram/Shaka), Hijri lunar, Korean age,
 * GIA birthstones, celestial weekday rulers, 10,000-day milestones, and veterinary pet aging.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AgeCalculator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const GIA_BIRTHSTONES = [
    null, // 1-indexed
    { month: 'January', stone: 'Garnet', color: 'Deep Burgundy Red', meaning: 'Protection, strength, and vitality' },
    { month: 'February', stone: 'Amethyst', color: 'Royal Purple', meaning: 'Peace, clarity, and courage' },
    { month: 'March', stone: 'Aquamarine', color: 'Ocean Blue', meaning: 'Serenity, harmony, and youthful hope' },
    { month: 'April', stone: 'Diamond', color: 'Brilliant White', meaning: 'Everlasting love, strength, and purity' },
    { month: 'May', stone: 'Emerald', color: 'Vibrant Green', meaning: 'Rebirth, wisdom, and good fortune' },
    { month: 'June', stone: 'Pearl & Alexandrite', color: 'Iridescent White / Teal', meaning: 'Purity, adaptability, and balance' },
    { month: 'July', stone: 'Ruby', color: 'Crimson Red', meaning: 'Passion, energy, and royal nobility' },
    { month: 'August', stone: 'Peridot & Spinel', color: 'Olive Green', meaning: 'Strength, joy, and positive radiance' },
    { month: 'September', stone: 'Sapphire', color: 'Deep Cobalt Blue', meaning: 'Truth, fidelity, and celestial wisdom' },
    { month: 'October', stone: 'Opal & Tourmaline', color: 'Opalescent Multicolored', meaning: 'Creativity, confidence, and hope' },
    { month: 'November', stone: 'Topaz & Citrine', color: 'Warm Golden Amber', meaning: 'Warmth, friendship, and abundance' },
    { month: 'December', stone: 'Turquoise & Tanzanite', color: 'Sky Blue / Indigo', meaning: 'Good health, tranquility, and fortune' },
  ];

  const CELESTIAL_RULERS = [
    { day: 'Sunday', ruler: 'The Sun (Surya)', symbol: '☉', trait: 'Leadership, radiance, and vitality' },
    { day: 'Monday', ruler: 'The Moon (Chandra)', symbol: '☽', trait: 'Intuition, empathy, and emotional depth' },
    { day: 'Tuesday', ruler: 'Mars (Mangala)', symbol: '♂', trait: 'Courage, drive, and energetic determination' },
    { day: 'Wednesday', ruler: 'Mercury (Budha)', symbol: '☿', trait: 'Intellect, communication, and adaptability' },
    { day: 'Thursday', ruler: 'Jupiter (Guru / Brihaspati)', symbol: '♃', trait: 'Wisdom, expansion, and benevolence' },
    { day: 'Friday', ruler: 'Venus (Shukra)', symbol: '♀', trait: 'Beauty, harmony, affection, and artistic grace' },
    { day: 'Saturday', ruler: 'Saturn (Shani)', symbol: '♄', trait: 'Discipline, perseverance, and timeless mastery' },
  ];

  /**
   * Check if a Gregorian year is a leap year.
   * @param {number} year
   * @returns {boolean}
   */
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /**
   * Get total days in a given month (1-indexed: 1 = Jan, 12 = Dec).
   * @param {number} year
   * @param {number} month (1-12)
   * @returns {number}
   */
  function getDaysInMonth(year, month) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  /**
   * Parse input into normalized { year, month, day } (1-indexed month).
   * @param {string|Date|object} input
   * @returns {{ year: number, month: number, day: number }}
   */
  function parseDateParts(input) {
    if (!input) {
      throw new Error('Date input is required');
    }

    if (typeof input === 'string') {
      const match = input.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);
        validateDateParts(year, month, day);
        return { year, month, day };
      }
      const d = new Date(input);
      if (isNaN(d.getTime())) {
        throw new Error(`Invalid date string: "${input}"`);
      }
      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
      };
    }

    if (input instanceof Date) {
      if (isNaN(input.getTime())) {
        throw new Error('Invalid Date instance');
      }
      return {
        year: input.getFullYear(),
        month: input.getMonth() + 1,
        day: input.getDate(),
      };
    }

    if (typeof input === 'object' && input.year && input.month && input.day) {
      const year = parseInt(input.year, 10);
      const month = parseInt(input.month, 10);
      const day = parseInt(input.day, 10);
      validateDateParts(year, month, day);
      return { year, month, day };
    }

    throw new Error('Unsupported date format');
  }

  function validateDateParts(year, month, day) {
    if (year < 1 || year > 9999) {
      throw new Error(`Year ${year} out of valid range (1 - 9999)`);
    }
    if (month < 1 || month > 12) {
      throw new Error(`Month ${month} out of valid range (1 - 12)`);
    }
    const maxDays = getDaysInMonth(year, month);
    if (day < 1 || day > maxDays) {
      throw new Error(`Day ${day} is invalid for month ${month}/${year} (max: ${maxDays})`);
    }
  }

  /**
   * Convert normalized date parts into UTC timestamp representing midnight.
   * @param {{ year: number, month: number, day: number }} parts
   * @returns {number} epoch timestamp in milliseconds
   */
  function toUtcMidnight(parts) {
    return Date.UTC(parts.year, parts.month - 1, parts.day);
  }

  /**
   * Compare two date parts: returns <0 if a < b, 0 if equal, >0 if a > b.
   */
  function compareDates(a, b) {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  }

  /**
   * Format date parts to YYYY-MM-DD.
   */
  function formatDateISO(parts) {
    const mm = String(parts.month).padStart(2, '0');
    const dd = String(parts.day).padStart(2, '0');
    return `${parts.year}-${mm}-${dd}`;
  }

  /**
   * Calculate Western Zodiac sign from month and day.
   */
  function getWesternZodiac(month, day) {
    const signs = [
      { name: 'Capricorn', symbol: '♑', element: 'Earth', start: [1, 1], end: [1, 19] },
      { name: 'Aquarius', symbol: '♒', element: 'Air', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', symbol: '♓', element: 'Water', start: [2, 19], end: [3, 20] },
      { name: 'Aries', symbol: '♈', element: 'Fire', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', symbol: '♉', element: 'Earth', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', symbol: '♊', element: 'Air', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', symbol: '♋', element: 'Water', start: [6, 21], end: [7, 22] },
      { name: 'Leo', symbol: '♌', element: 'Fire', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', symbol: '♍', element: 'Earth', start: [8, 23], end: [9, 22] },
      { name: 'Libra', symbol: '♎', element: 'Air', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', symbol: '♏', element: 'Water', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', symbol: '♐', element: 'Fire', start: [11, 22], end: [12, 21] },
      { name: 'Capricorn', symbol: '♑', element: 'Earth', start: [12, 22], end: [12, 31] },
    ];

    for (let i = 0; i < signs.length; i++) {
      const s = signs[i];
      if (month === s.start[0] && month === s.end[0]) {
        if (day >= s.start[1] && day <= s.end[1]) return s;
      } else if (month === s.start[0] && day >= s.start[1]) {
        return s;
      } else if (month === s.end[0] && day <= s.end[1]) {
        return s;
      }
    }
    return signs[0];
  }

  /**
   * Calculate Chinese Zodiac animal, element, and polarity.
   */
  function getChineseZodiac(year) {
    const animals = [
      { name: 'Rat', emoji: '🐀', element: 'Water' },
      { name: 'Ox', emoji: '🐂', element: 'Earth' },
      { name: 'Tiger', emoji: '🐅', element: 'Wood' },
      { name: 'Rabbit', emoji: '🐇', element: 'Wood' },
      { name: 'Dragon', emoji: '🐉', element: 'Earth' },
      { name: 'Snake', emoji: '🐍', element: 'Fire' },
      { name: 'Horse', emoji: '🐎', element: 'Fire' },
      { name: 'Goat', emoji: '🐐', element: 'Earth' },
      { name: 'Monkey', emoji: '🐒', element: 'Metal' },
      { name: 'Rooster', emoji: '🐓', element: 'Metal' },
      { name: 'Dog', emoji: '🐕', element: 'Earth' },
      { name: 'Pig', emoji: '🐖', element: 'Water' },
    ];

    const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
    const animalIndex = ((year - 4) % 12 + 12) % 12;
    const elementIndex = Math.floor((((year - 4) % 10 + 10) % 10) / 2);
    // In Chinese astrology, Wood corresponds to years ending in 4 & 5
    // Year 1924: Wood (index 2) Rat (index 0). 
    // Specifically:
    // 0, 1 -> Metal
    // 2, 3 -> Water
    // 4, 5 -> Wood
    // 6, 7 -> Fire
    // 8, 9 -> Earth
    const lastDigit = ((year % 10) + 10) % 10;
    const stemElements = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];
    const fixedElement = stemElements[lastDigit];
    const animal = animals[animalIndex];
    const polarity = lastDigit % 2 === 0 ? 'Yang' : 'Yin';

    return {
      animal: animal.name,
      emoji: animal.emoji,
      element: fixedElement,
      polarity,
      sign: `${polarity} ${fixedElement} ${animal.name}`,
    };
  }

  /**
   * Get official modern birthstone by month.
   */
  function getBirthstone(month) {
    return GIA_BIRTHSTONES[month] || GIA_BIRTHSTONES[1];
  }

  /**
   * Get celestial planetary day ruler by weekday index (0 = Sunday).
   */
  function getWeekdayRuler(dayOfWeekIndex) {
    return CELESTIAL_RULERS[dayOfWeekIndex] || CELESTIAL_RULERS[0];
  }

  /**
   * Calculate Islamic Hijri Lunar Year and completed Lunar Age.
   * Standard astronomical algorithm: 1 Hijri lunar year = 354.367068 days.
   */
  function getHijriDetails(dobParts, asOfParts, totalElapsedDays) {
    // Total lunar years elapsed (1 lunar year = 354.367 days)
    const lunarYearLength = 354.367068;
    const lunarMonthLength = 29.530588;

    const totalLunarYears = Math.floor(totalElapsedDays / lunarYearLength);
    const remainingDaysAfterYears = totalElapsedDays % lunarYearLength;
    const totalLunarMonths = Math.floor(remainingDaysAfterYears / lunarMonthLength);
    const remainingLunarDays = Math.round(remainingDaysAfterYears % lunarMonthLength);

    // Approximate Hijri calendar year of birth and target date
    // Hijri epoch: July 16, 622 AD.
    const dobMs = toUtcMidnight(dobParts);
    const hijriEpochMs = Date.UTC(622, 6, 16);
    const daysSinceEpochDob = (dobMs - hijriEpochMs) / 86400000;
    const birthHijriYear = Math.floor(daysSinceEpochDob / lunarYearLength) + 1;

    const asOfMs = toUtcMidnight(asOfParts);
    const daysSinceEpochAsOf = (asOfMs - hijriEpochMs) / 86400000;
    const currentHijriYear = Math.floor(daysSinceEpochAsOf / lunarYearLength) + 1;

    return {
      lunarYears: totalLunarYears,
      lunarMonths: totalLunarMonths,
      lunarDays: remainingLunarDays,
      birthHijriYear: birthHijriYear > 0 ? `${birthHijriYear} AH` : 'Pre-Hijri',
      currentHijriYear: `${currentHijriYear} AH`,
      lunarAgeFormatted: `${totalLunarYears} Lunar Years · ${totalLunarMonths} Mos`,
      note: 'Islamic lunar calendar (~354.36 days/year)',
    };
  }

  /**
   * Hindu Calendar (Vikram Samvat & Shaka Samvat)
   */
  function getHinduCalendarDetails(dobParts, asOfParts) {
    // Vikram Samvat is +56.7 to +57 years ahead of Gregorian (starts in Chaitra / mid-April)
    const birthVikramYear = dobParts.year + 57;
    const currentVikramYear = asOfParts.year + 57;

    // Shaka Samvat (National Calendar of India) is -78 years behind Gregorian
    const birthShakaYear = dobParts.year - 78;
    const currentShakaYear = asOfParts.year - 78;

    return {
      birthVikramSamvat: `${birthVikramYear} VS`,
      currentVikramSamvat: `${currentVikramYear} VS`,
      birthShakaSamvat: birthShakaYear > 0 ? `${birthShakaYear} SE` : 'Pre-Shaka',
      currentShakaSamvat: `${currentShakaYear} SE`,
      note: 'Vikram Samvat (+57) & Shaka National Calendar (-78)',
    };
  }

  /**
   * Traditional & Modern Korean Age
   */
  function getKoreanAgeDetails(dobParts, asOfParts, standardYears) {
    // 1. Traditional Korean Age (Se-neun Nai): 1 at birth, +1 every New Year's Day
    const traditionalKoreanAge = asOfParts.year - dobParts.year + 1;

    // 2. Year-Age (Yeon Nai) used in military service: current year - birth year
    const yearAge = asOfParts.year - dobParts.year;

    // 3. New Korean Civil Law Age (Man Nai, standardized in June 2023): standard completed years
    const civilLawAge = standardYears;

    return {
      traditionalKoreanAge,
      yearAge,
      civilLawAge,
      description: `Traditional: ${traditionalKoreanAge} | New Civil Law (2023): ${civilLawAge}`,
    };
  }

  /**
   * 10,000 Days & Major Days Milestones
   */
  function getMilestoneDays(dobParts, asOfParts, totalElapsedDays) {
    const milestonesList = [1000, 2500, 5000, 10000, 15000, 20000, 25000, 30000];
    const dobMs = toUtcMidnight(dobParts);
    const asOfMs = toUtcMidnight(asOfParts);

    const results = [];
    let nextMilestone = null;

    milestonesList.forEach(m => {
      const milestoneDateMs = dobMs + (m * 86400000);
      const d = new Date(milestoneDateMs);
      const isoDate = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      const isPast = totalElapsedDays >= m;
      const daysDiff = m - totalElapsedDays;

      const item = {
        days: m,
        date: isoDate,
        isPast,
        daysAway: Math.abs(daysDiff),
      };

      results.push(item);

      if (!isPast && !nextMilestone) {
        nextMilestone = item;
      }
    });

    // Default if beyond 30,000 days
    if (!nextMilestone) {
      const customNext = Math.ceil(totalElapsedDays / 5000) * 5000;
      const milestoneDateMs = dobMs + (customNext * 86400000);
      const d = new Date(milestoneDateMs);
      nextMilestone = {
        days: customNext,
        date: `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`,
        isPast: false,
        daysAway: customNext - totalElapsedDays,
      };
    }

    // 10,000 Days specific data
    const tenKDateMs = dobMs + (10000 * 86400000);
    const d10k = new Date(tenKDateMs);
    const tenThousandDate = `${d10k.getUTCFullYear()}-${String(d10k.getUTCMonth() + 1).padStart(2, '0')}-${String(d10k.getUTCDate()).padStart(2, '0')}`;

    return {
      milestones: results,
      nextMilestone,
      tenThousandDate,
      is10kPassed: totalElapsedDays >= 10000,
      daysTo10k: 10000 - totalElapsedDays,
    };
  }

  /**
   * Pet Age Calculator (Dogs by Breed Size & Cats)
   */
  function calcPetAge(humanYears, months = 0, species = 'dog', breedSize = 'medium') {
    const age = humanYears + (months / 12);
    if (age <= 0) return { humanEquivalentYears: 0, lifeStage: 'Newborn' };

    let equiv = 0;
    let stage = '';

    if (species === 'cat') {
      if (age <= 1) {
        equiv = age * 15;
      } else if (age <= 2) {
        equiv = 15 + (age - 1) * 9; // 24 at year 2
      } else {
        equiv = 24 + (age - 2) * 4;
      }

      if (age < 1) stage = 'Kitten';
      else if (age < 3) stage = 'Junior';
      else if (age < 7) stage = 'Prime Adult';
      else if (age < 11) stage = 'Mature';
      else if (age < 15) stage = 'Senior';
      else stage = 'Super Senior';

    } else {
      // Dog breed size models:
      // Small: < 20 lbs
      // Medium: 21 - 50 lbs
      // Large: 51 - 90 lbs
      // Giant: > 90 lbs
      if (age <= 1) {
        equiv = age * 15;
      } else if (age <= 2) {
        equiv = 15 + (age - 1) * 9; // 24 at year 2
      } else {
        const after2 = age - 2;
        if (breedSize === 'small') {
          equiv = 24 + after2 * 4;
        } else if (breedSize === 'medium') {
          equiv = 24 + after2 * 5;
        } else if (breedSize === 'large') {
          equiv = 24 + after2 * 6;
        } else { // giant
          equiv = 24 + after2 * 7.5;
        }
      }

      if (age < 1) stage = 'Puppy';
      else if (age < 3) stage = 'Young Adult';
      else if (age < 7) stage = 'Adult';
      else if (age < (breedSize === 'giant' ? 8 : 10)) stage = 'Senior';
      else stage = 'Geriatric';
    }

    return {
      humanEquivalentYears: Math.round(equiv * 10) / 10,
      lifeStage: stage,
      species,
      breedSize: species === 'dog' ? breedSize : null,
    };
  }

  /**
   * Calculate calendar duration between two dates using month-end borrowing.
   */
  function calculateCalendarDifference(startDate, endDate) {
    let start = { ...startDate };
    let end = { ...endDate };

    // Feb 29 birth date handling in non-leap evaluation year
    let effectiveStartDay = start.day;
    if (start.month === 2 && start.day === 29 && !isLeapYear(end.year)) {
      if (end.month === 2 && end.day >= 28) {
        effectiveStartDay = 28;
      }
    }

    let years = end.year - start.year;
    let months = end.month - start.month;
    let days = end.day - effectiveStartDay;

    if (days < 0) {
      months -= 1;
      let prevMonth = end.month - 1;
      let prevYear = end.year;
      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear -= 1;
      }

      const daysInPrev = getDaysInMonth(prevYear, prevMonth);
      if (daysInPrev < effectiveStartDay) {
        days = end.day;
      } else {
        days += daysInPrev;
      }
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days };
  }

  /**
   * Calculate exact age from DOB to AsOf date.
   */
  function calcAge(dobInput, asOfInput) {
    const dob = parseDateParts(dobInput);
    const asOf = parseDateParts(asOfInput);

    if (compareDates(dob, asOf) > 0) {
      throw new Error('Date of Birth cannot be after the target date ("Age at date of").');
    }

    const dobUtc = new Date(Date.UTC(dob.year, dob.month - 1, dob.day));
    const dayOfWeekIndex = dobUtc.getUTCDay();
    const dayOfWeekBorn = WEEKDAYS[dayOfWeekIndex];

    const { years, months, days } = calculateCalendarDifference(dob, asOf);

    const dobMs = toUtcMidnight(dob);
    const asOfMs = toUtcMidnight(asOf);
    const totalDays = Math.round((asOfMs - dobMs) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingWeekDays = totalDays % 7;
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    const nextBirthday = getNextBirthday(dob, asOf);

    // Astrological & Cultural
    const westernZodiac = getWesternZodiac(dob.month, dob.day);
    const chineseZodiac = getChineseZodiac(dob.year);
    const birthstone = getBirthstone(dob.month);
    const weekdayRuler = getWeekdayRuler(dayOfWeekIndex);

    // Multi-Calendar
    const hijri = getHijriDetails(dob, asOf, totalDays);
    const hindu = getHinduCalendarDetails(dob, asOf);
    const korean = getKoreanAgeDetails(dob, asOf, years);

    // Milestones
    const milestoneDays = getMilestoneDays(dob, asOf, totalDays);

    // Life Stage & Extended Attributes
    const planetary = calcPlanetaryAges(dob, asOf);
    const numerology = calcNumerology(dob);
    const vedic = calcVedicAstrology(dob);
    const generation = getGeneration(dob.year);
    const trivia = getBirthDateTrivia(dob.month, dob.day);

    // Biological life estimates
    const biological = {
      heartbeats: Math.round(totalDays * 24 * 60 * 80),
      breaths: Math.round(totalDays * 24 * 60 * 16),
      sleepHours: Math.round(totalDays * 8),
      mealsEaten: Math.round(totalDays * 3),
      stepsTaken: Math.round(totalDays * 7500),
    };

    const decimalAge = (years + (months / 12) + (days / 365.25)).toFixed(2);
    const totals = {
      months: totalMonths,
      weeks: totalWeeks,
      extraDays: remainingWeekDays,
      days: totalDays,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
    };

    const milestones = {
      nextDayMilestone: milestoneDays.nextMilestone ? milestoneDays.nextMilestone.days : 10000,
      daysToMilestone: milestoneDays.nextMilestone ? milestoneDays.nextMilestone.daysAway : 0,
      milestoneDateFormatted: milestoneDays.nextMilestone ? milestoneDays.nextMilestone.date : '',
      yearProgressPercent: Math.min(100, Math.max(0, Math.round(((365.25 - nextBirthday.daysUntil) / 365.25) * 100))),
    };

    return {
      years,
      months,
      days,
      formattedAge: formatAgeString(years, months, days),
      decimalAge,
      totals,
      milestones,
      totalMonths,
      totalWeeks,
      remainingWeekDays,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      dayOfWeekBorn,
      nextBirthday,
      westernZodiac,
      chineseZodiac,
      birthstone,
      weekdayRuler,
      hijri,
      hindu,
      korean,
      milestoneDays,
      biological,
      planetary,
      numerology,
      vedic,
      generation,
      trivia,
      isBirthdayToday: nextBirthday.isBirthdayToday,
      dobFormatted: formatDateISO(dob),
      asOfFormatted: formatDateISO(asOf),
    };
  }

  function formatAgeString(years, months, days) {
    const yStr = `${years} ${years === 1 ? 'Year' : 'Years'}`;
    const mStr = `${months} ${months === 1 ? 'Month' : 'Months'}`;
    const dStr = `${days} ${days === 1 ? 'Day' : 'Days'}`;
    return `${yStr} · ${mStr} · ${dStr}`;
  }

  function getNextBirthday(dobInput, asOfInput) {
    const dob = parseDateParts(dobInput);
    const asOf = parseDateParts(asOfInput);
    let nextBdayYear = asOf.year;
    let bdayParts = getBirthdayPartsForYear(dob, nextBdayYear);

    if (compareDates(asOf, bdayParts) > 0) {
      nextBdayYear += 1;
      bdayParts = getBirthdayPartsForYear(dob, nextBdayYear);
    }

    const asOfMs = toUtcMidnight(asOf);
    const bdayMs = toUtcMidnight(bdayParts);
    const daysUntil = Math.round((bdayMs - asOfMs) / 86400000);
    const isBirthdayToday = daysUntil === 0;

    const bdayUtc = new Date(Date.UTC(bdayParts.year, bdayParts.month - 1, bdayParts.day));
    const weekday = WEEKDAYS[bdayUtc.getUTCDay()];

    return {
      nextBirthdayDate: formatDateISO(bdayParts),
      nextAge: bdayParts.year - dob.year,
      daysUntil,
      daysRemaining: daysUntil,
      formattedDate: formatDateISO(bdayParts),
      weekday,
      isBirthdayToday,
      isToday: isBirthdayToday,
    };
  }

  function getBirthdayPartsForYear(dob, year) {
    if (dob.month === 2 && dob.day === 29) {
      if (isLeapYear(year)) {
        return { year, month: 2, day: 29 };
      }
      return { year, month: 2, day: 28 };
    }
    return { year, month: dob.month, day: dob.day };
  }

  function calcDateDiff(startInput, endInput, includeEndDay = false) {
    const start = parseDateParts(startInput);
    const end = parseDateParts(endInput);

    if (compareDates(start, end) > 0) {
      throw new Error('Start date cannot be after end date.');
    }

    let targetEnd = { ...end };
    if (includeEndDay) {
      const endMs = toUtcMidnight(targetEnd);
      const nextDayDate = new Date(endMs + 86400000);
      targetEnd = {
        year: nextDayDate.getUTCFullYear(),
        month: nextDayDate.getUTCMonth() + 1,
        day: nextDayDate.getUTCDate(),
      };
    }

    const { years, months, days } = calculateCalendarDifference(start, targetEnd);

    const startMs = toUtcMidnight(start);
    const targetEndMs = toUtcMidnight(targetEnd);
    const totalDays = Math.round((targetEndMs - startMs) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const totalHours = totalDays * 24;

    return {
      years,
      months,
      days,
      formattedDiff: formatAgeString(years, months, days),
      totalDays,
      totalWeeks,
      remainingDays,
      totalHours,
      includeEndDay,
      startFormatted: formatDateISO(start),
      endFormatted: formatDateISO(end),
    };
  }

  /**
   * Planetary Ages (Mercury through Neptune)
   */
  function calcPlanetaryAges(dobInput, asOfInput) {
    const dob = parseDateParts(dobInput);
    const asOf = asOfInput ? parseDateParts(asOfInput) : parseDateParts(new Date());
    const dobMs = toUtcMidnight(dob);
    const asOfMs = toUtcMidnight(asOf);
    const totalDays = Math.max(0, Math.round((asOfMs - dobMs) / 86400000));
    const earthYears = totalDays / 365.25;

    const planetsConfig = [
      { name: 'Mercury', symbol: '☿', orbitalDays: 87.969, weightRatio: 0.38, color: '#94a3b8', desc: 'Closest to the Sun, extreme temperatures' },
      { name: 'Venus', symbol: '♀', orbitalDays: 224.701, weightRatio: 0.91, color: '#f59e0b', desc: 'Earth’s twin with a thick sulfuric atmosphere' },
      { name: 'Earth', symbol: '♁', orbitalDays: 365.256, weightRatio: 1.00, color: '#3b82f6', desc: 'Our oasis of liquid water and atmosphere' },
      { name: 'Mars', symbol: '♂', orbitalDays: 686.980, weightRatio: 0.38, color: '#ef4444', desc: 'The Red Planet, giant volcanoes and deep canyons' },
      { name: 'Jupiter', symbol: '♃', orbitalDays: 4332.589, weightRatio: 2.34, color: '#d97706', desc: 'King of planets with massive magnetic shield' },
      { name: 'Saturn', symbol: '♄', orbitalDays: 10759.22, weightRatio: 1.06, color: '#eab308', desc: 'Spectacular icy ring system' },
      { name: 'Uranus', symbol: '⛢', orbitalDays: 30685.4, weightRatio: 0.92, color: '#06b6d4', desc: 'Tilted ice giant rotating on its side' },
      { name: 'Neptune', symbol: '♆', orbitalDays: 60189.0, weightRatio: 1.19, color: '#6366f1', desc: 'Supersonic winds and deep azure methane clouds' },
    ];

    const results = planetsConfig.map(p => {
      const planetaryAge = Math.round((totalDays / p.orbitalDays) * 100) / 100;
      const nextBdayDays = Math.round(p.orbitalDays - (totalDays % p.orbitalDays));
      return {
        ...p,
        age: planetaryAge,
        nextBirthdayInEarthDays: nextBdayDays,
      };
    });

    return {
      totalDays,
      earthYears: Math.round(earthYears * 100) / 100,
      planets: results,
    };
  }

  /**
   * Numerology Life Path & Birth Day Numbers
   */
  function calcNumerology(dobInput) {
    const dob = parseDateParts(dobInput);

    function reduceSingle(num) {
      while (num > 9) {
        num = String(num).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
      }
      return num;
    }

    function reduceLifePath(num) {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = String(num).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
      }
      return num;
    }

    const yReduced = reduceSingle(dob.year);
    const mReduced = reduceSingle(dob.month);
    const dReduced = reduceSingle(dob.day);
    const lifePathNumber = reduceLifePath(yReduced + mReduced + dReduced);
    const birthDayNumber = reduceSingle(dob.day);

    const ARCHETYPES = {
      1: { title: 'The Leader', planet: 'Sun', color: 'Gold / Amber', stone: 'Ruby', traits: 'Pioneering, independent, ambitious innovator' },
      2: { title: 'The Diplomat', planet: 'Moon', color: 'Silver / White', stone: 'Pearl', traits: 'Harmonious, empathetic, intuitive peacemaker' },
      3: { title: 'The Creative', planet: 'Jupiter', color: 'Yellow / Purple', stone: 'Yellow Sapphire', traits: 'Expressive, joyful, magnetic, inspiring' },
      4: { title: 'The Builder', planet: 'Rahu / Uranus', color: 'Electric Blue / Grey', stone: 'Hessonite (Gomed)', traits: 'Disciplined, pragmatic, methodical, solid' },
      5: { title: 'The Adventurer', planet: 'Mercury', color: 'Turquoise / Green', stone: 'Emerald', traits: 'Dynamic, versatile, freedom-loving, adaptable' },
      6: { title: 'The Nurturer', planet: 'Venus', color: 'Rose / Indigo', stone: 'Diamond', traits: 'Loving, protective, harmonious, artistic' },
      7: { title: 'The Truth Seeker', planet: 'Ketu / Neptune', color: 'Violet / White', stone: 'Cat’s Eye', traits: 'Analytical, spiritual, contemplative, perceptive' },
      8: { title: 'The Powerhouse', planet: 'Saturn', color: 'Navy / Black', stone: 'Blue Sapphire', traits: 'Authoritative, successful, resilient executive' },
      9: { title: 'The Humanitarian', planet: 'Mars', color: 'Crimson / Red', stone: 'Red Coral', traits: 'Compassionate, generous, idealistic, visionary' },
      11: { title: 'The Master Intuitive', planet: 'Moon / Neptune', color: 'Silver / Violet', stone: 'Amethyst', traits: 'Visionary inspirer, spiritual catalyst' },
      22: { title: 'The Master Architect', planet: 'Uranus / Earth', color: 'Coral / Gold', stone: 'Diamond', traits: 'Transformative builder, pragmatic visionary' },
      33: { title: 'The Master Teacher', planet: 'Sun / Jupiter', color: 'Azure / Emerald', stone: 'Yellow Topaz', traits: 'Universal healer, selfless guide for humanity' },
    };

    return {
      dobFormatted: formatDateISO(dob),
      lifePathNumber,
      birthDayNumber,
      archetype: ARCHETYPES[lifePathNumber] || ARCHETYPES[1],
      birthDayArchetype: ARCHETYPES[birthDayNumber] || ARCHETYPES[1],
    };
  }

  /**
   * Vedic Calendar, Nakshatra, Tithi & Rashi
   */
  function calcVedicAstrology(dobInput) {
    const dob = parseDateParts(dobInput);
    const dobMs = toUtcMidnight(dob);
    const daysSinceJ2000 = (dobMs - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;

    const NAKSHATRAS = [
      { name: 'Ashwini', deity: 'Ashvins', symbol: 'Horse Head', ruler: 'Ketu' },
      { name: 'Bharani', deity: 'Yama', symbol: 'Yoni', ruler: 'Venus' },
      { name: 'Krittika', deity: 'Agni', symbol: 'Razor / Flame', ruler: 'Sun' },
      { name: 'Rohini', deity: 'Brahma', symbol: 'Chariot', ruler: 'Moon' },
      { name: 'Mrigashira', deity: 'Soma', symbol: 'Deer Head', ruler: 'Mars' },
      { name: 'Ardra', deity: 'Rudra', symbol: 'Teardrop', ruler: 'Rahu' },
      { name: 'Punarvasu', deity: 'Aditi', symbol: 'Bow and Quiver', ruler: 'Jupiter' },
      { name: 'Pushya', deity: 'Brihaspati', symbol: 'Lotus Flower', ruler: 'Saturn' },
      { name: 'Ashlesha', deity: 'Nagas', symbol: 'Coiled Serpent', ruler: 'Mercury' },
      { name: 'Magha', deity: 'Pitris', symbol: 'Royal Throne', ruler: 'Ketu' },
      { name: 'Purva Phalguni', deity: 'Bhaga', symbol: 'Hammock', ruler: 'Venus' },
      { name: 'Uttara Phalguni', deity: 'Aryaman', symbol: 'Bed Legs', ruler: 'Sun' },
      { name: 'Hasta', deity: 'Surya', symbol: 'Open Hand', ruler: 'Moon' },
      { name: 'Chitra', deity: 'Vishwakarma', symbol: 'Bright Pearl', ruler: 'Mars' },
      { name: 'Swati', deity: 'Vayu', symbol: 'Young Shoot', ruler: 'Rahu' },
      { name: 'Vishakha', deity: 'Indragni', symbol: 'Triumphal Arch', ruler: 'Jupiter' },
      { name: 'Anuradha', deity: 'Mitra', symbol: 'Lotus Staff', ruler: 'Saturn' },
      { name: 'Jyeshtha', deity: 'Indra', symbol: 'Round Talisman', ruler: 'Mercury' },
      { name: 'Mula', deity: 'Nirriti', symbol: 'Tied Roots', ruler: 'Ketu' },
      { name: 'Purva Ashadha', deity: 'Apas', symbol: 'Elephant Tusk', ruler: 'Venus' },
      { name: 'Uttara Ashadha', deity: 'Vishvadevas', symbol: 'Elephant Tusk', ruler: 'Sun' },
      { name: 'Shravana', deity: 'Vishnu', symbol: 'Three Footprints', ruler: 'Moon' },
      { name: 'Dhanishta', deity: 'Eight Vasus', symbol: 'Drum (Mridanga)', ruler: 'Mars' },
      { name: 'Shatabhisha', deity: 'Varuna', symbol: 'Empty Circle / 100 Physicians', ruler: 'Rahu' },
      { name: 'Purva Bhadrapada', deity: 'Aja Ekapada', symbol: 'Sword', ruler: 'Jupiter' },
      { name: 'Uttara Bhadrapada', deity: 'Ahirbudhnya', symbol: 'Deep Water Serpent', ruler: 'Saturn' },
      { name: 'Revati', deity: 'Pushan', symbol: 'Pair of Fish', ruler: 'Mercury' },
    ];

    const RASHIS = [
      { sanskrit: 'Mesha', english: 'Aries', ruler: 'Mars (Mangala)', element: 'Fire (Agni)' },
      { sanskrit: 'Vrishabha', english: 'Taurus', ruler: 'Venus (Shukra)', element: 'Earth (Prithvi)' },
      { sanskrit: 'Mithuna', english: 'Gemini', ruler: 'Mercury (Budha)', element: 'Air (Vayu)' },
      { sanskrit: 'Karka', english: 'Cancer', ruler: 'Moon (Chandra)', element: 'Water (Jala)' },
      { sanskrit: 'Simha', english: 'Leo', ruler: 'Sun (Surya)', element: 'Fire (Agni)' },
      { sanskrit: 'Kanya', english: 'Virgo', ruler: 'Mercury (Budha)', element: 'Earth (Prithvi)' },
      { sanskrit: 'Tula', english: 'Libra', ruler: 'Venus (Shukra)', element: 'Air (Vayu)' },
      { sanskrit: 'Vrishchika', english: 'Scorpio', ruler: 'Mars (Mangala)', element: 'Water (Jala)' },
      { sanskrit: 'Dhanu', english: 'Sagittarius', ruler: 'Jupiter (Guru)', element: 'Fire (Agni)' },
      { sanskrit: 'Makara', english: 'Capricorn', ruler: 'Saturn (Shani)', element: 'Earth (Prithvi)' },
      { sanskrit: 'Kumbha', english: 'Aquarius', ruler: 'Saturn (Shani)', element: 'Air (Vayu)' },
      { sanskrit: 'Meena', english: 'Pisces', ruler: 'Jupiter (Guru)', element: 'Water (Jala)' },
    ];

    const HINDU_MONTHS = [
      'Chaitra', 'Vaisakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
      'Ashvina', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
    ];

    const siderealMoon = (daysSinceJ2000 * (360 / 27.32166) + 120) % 360;
    const normalizedMoonDeg = (siderealMoon + 360) % 360;
    const nakshatraIndex = Math.floor(normalizedMoonDeg / (360 / 27));
    const rashiIndex = Math.floor(normalizedMoonDeg / 30);

    const synodicDays = (daysSinceJ2000 % 29.530588 + 29.530588) % 29.530588;
    const tithiIndex = Math.floor((synodicDays / 29.530588) * 30);
    const paksha = tithiIndex < 15 ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)';
    const tithiNumber = (tithiIndex % 15) + 1;
    const TITHI_NAMES = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shasthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
      tithiIndex < 15 ? 'Purnima (Full Moon)' : 'Amavasya (New Moon)'
    ];

    const hinduMonthIndex = ((dob.month + 8) % 12);

    return {
      dobFormatted: formatDateISO(dob),
      nakshatra: NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0],
      rashi: RASHIS[rashiIndex] || RASHIS[0],
      tithi: `${TITHI_NAMES[tithiNumber - 1]} (${paksha})`,
      paksha,
      hinduMonth: HINDU_MONTHS[hinduMonthIndex],
    };
  }

  /**
   * Generation Classifier
   */
  function getGeneration(year) {
    const y = parseInt(year, 10);
    if (y >= 2025) {
      return { name: 'Gen Beta', range: '2025 – 2039', traits: 'AI-native pioneers of spatial computing', icon: '🤖' };
    } else if (y >= 2013) {
      return { name: 'Gen Alpha', range: '2013 – 2024', traits: 'Touch-screen natives, AI-immersed, climate-aware', icon: '✨' };
    } else if (y >= 1997) {
      return { name: 'Gen Z (Zoomers)', range: '1997 – 2012', traits: 'Digital natives, authentic, mobile-first, agile', icon: '⚡' };
    } else if (y >= 1981) {
      return { name: 'Millennials (Gen Y)', range: '1981 – 1996', traits: 'Internet boom pioneers, collaborative, purpose-driven', icon: '🌐' };
    } else if (y >= 1965) {
      return { name: 'Generation X', range: '1965 – 1980', traits: 'Self-reliant, resourceful, work-life balance champions', icon: '🎸' };
    } else if (y >= 1946) {
      return { name: 'Baby Boomers', range: '1946 – 1964', traits: 'Post-war optimists, goal-oriented, community anchors', icon: '🌻' };
    } else if (y >= 1928) {
      return { name: 'Silent Generation', range: '1928 – 1945', traits: 'Traditionalists, disciplined, resilient rebuilders', icon: '📻' };
    } else {
      return { name: 'Greatest Generation', range: '1901 – 1927', traits: 'Defenders of liberty, civic builders, timeless grit', icon: '🏛️' };
    }
  }

  /**
   * Calendar Trivia & Famous Birthdays
   */
  const CALENDAR_TRIVIA = {
    '1-1': { events: ['Julian calendar takes effect in 45 BC', 'Euro officially introduced in 1999'], people: ['J.D. Salinger', 'Satyendra Nath Bose', 'Paul Revere'] },
    '1-15': { events: ['British Museum opens in 1759', 'Wikipedia launches in 2001'], people: ['Martin Luther King Jr.', 'Molière'] },
    '1-26': { events: ['Constitution of India comes into effect (Republic Day) in 1950'], people: ['Douglas MacArthur', 'Ellen DeGeneres'] },
    '2-14': { events: ['YouTube is founded in 2005', 'Alexander Graham Bell files phone patent in 1876'], people: ['Galileo Galilei (eve)', 'Michael Bloomberg'] },
    '3-14': { events: ['Pi Day celebrated worldwide', 'First international cricket match in 1877'], people: ['Albert Einstein', 'Stephen Curry', 'Aamir Khan'] },
    '4-22': { events: ['Earth Day established in 1970'], people: ['Immanuel Kant', 'J. Robert Oppenheimer', 'Jack Nicholson'] },
    '5-1': { events: ['Empire State Building opens in 1931', 'International Workers Day'], people: ['Anushka Sharma', 'Wes Anderson'] },
    '6-21': { events: ['Summer Solstice & International Yoga Day'], people: ['Prince William', 'Chris Pratt', 'Jean-Paul Sartre'] },
    '7-20': { events: ['Apollo 11 lands on the Moon in 1969 with Neil Armstrong'], people: ['Sir Edmund Hillary', 'Carlos Santana'] },
    '8-15': { events: ['India gains independence in 1947', 'Panama Canal opens in 1914'], people: ['Napoleon Bonaparte', 'Sri Aurobindo'] },
    '9-5': { events: ['Teachers Day in India', 'Voyager 1 launched into interstellar space in 1977'], people: ['Dr. S. Radhakrishnan', 'Freddie Mercury'] },
    '10-2': { events: ['Mahatma Gandhi initiates the global Ahimsa movement in 1869'], people: ['Mahatma Gandhi', 'Lal Bahadur Shastri', 'Sting'] },
    '10-24': { events: ['United Nations charter comes into force in 1945'], people: ['K.P. Saxena', 'Drake'] },
    '11-7': { events: ['First woman wins Nobel Prize in two science fields (Marie Curie)'], people: ['Marie Curie', 'C.V. Raman', 'Albert Camus'] },
    '12-25': { events: ['Apollo 8 completes historic lunar orbit in 1968'], people: ['Isaac Newton', 'Atal Bihari Vajpayee', 'Clara Barton'] },
  };

  function getBirthDateTrivia(month, day) {
    const key = `${month}-${day}`;
    if (CALENDAR_TRIVIA[key]) {
      return CALENDAR_TRIVIA[key];
    }
    return {
      events: [
        `Day ${day} of Month ${month} in the solar year`,
        'Earth travels ~2.5 million kilometers along its orbital trajectory',
      ],
      people: ['Global pioneers, inventors, and historic leaders born on this calendar date'],
    };
  }

  /**
   * Retirement & Pension Service-Years Calculator
   */
  function calcRetirementAndPension(dobInput, dojInput, retirementAge = 60, asOfInput) {
    const dob = parseDateParts(dobInput);
    const doj = parseDateParts(dojInput);
    const asOf = asOfInput ? parseDateParts(asOfInput) : parseDateParts(new Date());

    if (compareDates(dob, doj) > 0) {
      throw new Error('Date of joining service cannot be before date of birth.');
    }

    const retYear = dob.year + parseInt(retirementAge, 10);
    let retMonth = dob.month;
    let retDay = getDaysInMonth(retYear, retMonth);
    let finalRetirementDate;

    // Central Civil Services (CCS) Rule:
    // If born on the 1st of a month, the employee retires on the afternoon of the last day of the PRECEDING month.
    if (dob.day === 1) {
      retMonth -= 1;
      let adjustedYear = retYear;
      if (retMonth === 0) {
        retMonth = 12;
        adjustedYear -= 1;
      }
      retDay = getDaysInMonth(adjustedYear, retMonth);
      finalRetirementDate = { year: adjustedYear, month: retMonth, day: retDay };
    } else {
      finalRetirementDate = { year: retYear, month: retMonth, day: retDay };
    }

    const isRetired = compareDates(asOf, finalRetirementDate) >= 0;
    const remainingUntilRetirement = isRetired
      ? { years: 0, months: 0, days: 0 }
      : calculateCalendarDifference(asOf, finalRetirementDate);

    const asOfMs = toUtcMidnight(asOf);
    const retMs = toUtcMidnight(finalRetirementDate);

    const daysRemaining = Math.max(0, Math.round((retMs - asOfMs) / 86400000));
    const workingDaysRemaining = Math.round(daysRemaining * (5 / 7));

    const totalServiceAtRetirement = calculateCalendarDifference(doj, finalRetirementDate);
    const currentServiceRendered = compareDates(asOf, doj) >= 0
      ? calculateCalendarDifference(doj, asOf)
      : { years: 0, months: 0, days: 0 };

    const halfYears = (totalServiceAtRetirement.years * 2) + (totalServiceAtRetirement.months >= 9 ? 2 : (totalServiceAtRetirement.months >= 3 ? 1 : 0));
    const qualifyingYears = halfYears / 2;

    let pensionEligibility = 'Eligible for Full 50% Basic Pension (CCS Pension Rules 2021)';
    if (qualifyingYears < 10) {
      pensionEligibility = 'Not eligible for regular monthly pension (less than 10 years qualifying service). Eligible for Service Gratuity.';
    } else if (qualifyingYears < 20) {
      pensionEligibility = 'Eligible for Proportionate Monthly Pension (10 to 19.5 years qualifying service).';
    }

    return {
      dobFormatted: formatDateISO(dob),
      dojFormatted: formatDateISO(doj),
      asOfFormatted: formatDateISO(asOf),
      retirementDateFormatted: formatDateISO(finalRetirementDate),
      retirementAge: parseInt(retirementAge, 10),
      isRetired,
      daysRemaining,
      workingDaysRemaining,
      remainingYears: remainingUntilRetirement.years,
      remainingMonths: remainingUntilRetirement.months,
      remainingDays: remainingUntilRetirement.days,
      currentServiceYears: currentServiceRendered.years,
      currentServiceMonths: currentServiceRendered.months,
      currentServiceDays: currentServiceRendered.days,
      totalServiceYears: totalServiceAtRetirement.years,
      totalServiceMonths: totalServiceAtRetirement.months,
      totalServiceDays: totalServiceAtRetirement.days,
      qualifyingYears,
      pensionEligibility,
    };
  }

  /**
   * Pregnancy Due Date & Gestational Age (Naegele's Rule)
   */
  function calcPregnancy(lmpInput, cycleLength = 28, asOfInput) {
    const lmp = parseDateParts(lmpInput);
    const asOf = asOfInput ? parseDateParts(asOfInput) : parseDateParts(new Date());

    const lmpMs = toUtcMidnight(lmp);
    const asOfMs = toUtcMidnight(asOf);

    const cycleAdjustment = parseInt(cycleLength, 10) - 28;
    const dueMs = lmpMs + (280 + cycleAdjustment) * 86400000;
    const dueDateObj = new Date(dueMs);
    const dueDate = {
      year: dueDateObj.getUTCFullYear(),
      month: dueDateObj.getUTCMonth() + 1,
      day: dueDateObj.getUTCDate(),
    };

    const daysPregnant = Math.max(0, Math.round((asOfMs - lmpMs) / 86400000));
    const currentWeeks = Math.floor(daysPregnant / 7);
    const currentDays = daysPregnant % 7;
    const daysRemaining = Math.max(0, Math.round((dueMs - asOfMs) / 86400000));
    const progressPercent = Math.min(100, Math.max(0, Math.round((daysPregnant / 280) * 100)));

    let trimester = 'First Trimester (Weeks 1 – 12)';
    let fetalMilestone = 'Vital organs forming, heartbeat detectable by ultrasound.';
    if (currentWeeks >= 28) {
      trimester = 'Third Trimester (Weeks 28 – 40+)';
      fetalMilestone = 'Rapid brain growth, lungs maturing, settling into head-down position.';
    } else if (currentWeeks >= 13) {
      trimester = 'Second Trimester (Weeks 13 – 27)';
      fetalMilestone = 'Baby movement felt (quickening), facial expressions, vocal cords formed.';
    }

    return {
      lmpFormatted: formatDateISO(lmp),
      dueDateFormatted: formatDateISO(dueDate),
      asOfFormatted: formatDateISO(asOf),
      daysPregnant,
      currentWeeks,
      currentDays,
      daysRemaining,
      progressPercent,
      trimester,
      fetalMilestone,
    };
  }

  /**
   * Baby Age in Weeks & Months with Wonder Weeks Mental Leaps
   */
  function calcBabyAge(dobInput, asOfInput) {
    const res = calcAge(dobInput, asOfInput);
    const totalWeeks = Math.floor(res.totalDays / 7);
    const extraDaysInWeek = res.totalDays % 7;

    const LEAPS = [
      { week: 5, leap: 'Leap 1: Sensations', desc: 'First sensory awakening and alert exploration' },
      { week: 8, leap: 'Leap 2: Patterns', desc: 'Noticing shapes, shadows, and recurring bodily rhythms' },
      { week: 12, leap: 'Leap 3: Smooth Transitions', desc: 'Fluid physical movements and vocal pitch experimentation' },
      { week: 19, leap: 'Leap 4: Events', desc: 'Intentional grasping, understanding cause-and-effect' },
      { week: 26, leap: 'Leap 5: Relationships', desc: 'Understanding physical distance and parent presence' },
      { week: 37, leap: 'Leap 6: Categories', desc: 'Sorting textures, animals, and recognizing distinctions' },
      { week: 46, leap: 'Leap 7: Sequences', desc: 'Understanding ordered tasks like stacking nesting cups' },
      { week: 55, leap: 'Leap 8: Programs', desc: 'Imitating grown-up domestic routines' },
      { week: 64, leap: 'Leap 9: Principles', desc: 'Testing emotional boundaries and making choices' },
      { week: 75, leap: 'Leap 10: Systems', desc: 'Developing developing conscience and family role awareness' },
    ];

    let currentLeap = null;
    for (let i = 0; i < LEAPS.length; i++) {
      if (totalWeeks >= LEAPS[i].week - 1 && totalWeeks <= LEAPS[i].week + 2) {
        currentLeap = LEAPS[i];
        break;
      }
    }

    return {
      ...res,
      totalWeeks,
      extraDaysInWeek,
      currentLeap,
      leaps: LEAPS,
    };
  }

  /**
   * Child Vaccination Schedule (IAP & WHO Universal Timeline)
   */
  function calcVaccinationSchedule(dobInput, asOfInput) {
    const dob = parseDateParts(dobInput);
    const asOf = asOfInput ? parseDateParts(asOfInput) : parseDateParts(new Date());
    const dobMs = toUtcMidnight(dob);
    const asOfMs = toUtcMidnight(asOf);

    const SCHEDULE = [
      { ageLabel: 'At Birth', daysFromBirth: 0, vaccines: 'BCG, OPV 0, Hepatitis B 1', desc: 'Tuberculosis, Polio, and initial Hepatitis B defense' },
      { ageLabel: '6 Weeks', daysFromBirth: 42, vaccines: 'DTwP/DTaP 1, IPV 1, Hib 1, Hep B 2, Rotavirus 1, PCV 1', desc: 'Primary 6-in-1 combo vaccine, pneumococcal, and oral rotavirus' },
      { ageLabel: '10 Weeks', daysFromBirth: 70, vaccines: 'DTwP/DTaP 2, IPV 2, Hib 2, Rotavirus 2, PCV 2', desc: 'Second primary dose series' },
      { ageLabel: '14 Weeks', daysFromBirth: 98, vaccines: 'DTwP/DTaP 3, IPV 3, Hib 3, Rotavirus 3, PCV 3', desc: 'Third primary dose completing infant foundational series' },
      { ageLabel: '6 Months', daysFromBirth: 182, vaccines: 'Influenza 1 (Flu Annual)', desc: 'First seasonal influenza vaccine' },
      { ageLabel: '9 Months', daysFromBirth: 274, vaccines: 'MMR 1 (Measles, Mumps, Rubella), Typhoid Conjugate', desc: 'Measles immunity & typhoid fever protection' },
      { ageLabel: '12 Months (1 Yr)', daysFromBirth: 365, vaccines: 'Hepatitis A 1', desc: 'First dose of Hepatitis A' },
      { ageLabel: '15 Months', daysFromBirth: 456, vaccines: 'MMR 2, Varicella 1 (Chickenpox), PCV Booster', desc: 'Chickenpox vaccine & pneumococcal booster' },
      { ageLabel: '18 Months', daysFromBirth: 548, vaccines: 'DTwP/DTaP Booster 1, IPV Booster, Hep A 2', desc: 'First DTP booster & Hepatitis A completion' },
      { ageLabel: '2 Years', daysFromBirth: 730, vaccines: 'Typhoid Booster', desc: 'Typhoid booster protection' },
      { ageLabel: '4 – 5 Years', daysFromBirth: 1826, vaccines: 'DTwP/DTaP Booster 2, MMR 3, OPV Booster', desc: 'Pre-school school-entry booster' },
      { ageLabel: '9 – 14 Years', daysFromBirth: 3652, vaccines: 'HPV (Human Papillomavirus, 2 doses)', desc: 'Protection against cervical and HPV-associated cancers' },
      { ageLabel: '15 – 16 Years', daysFromBirth: 5479, vaccines: 'Tdap / Td Booster', desc: 'Adolescent tetanus, diphtheria, and acellular pertussis' },
    ];

    const items = SCHEDULE.map(s => {
      const scheduledDateMs = dobMs + (s.daysFromBirth * 86400000);
      const dObj = new Date(scheduledDateMs);
      const scheduledDate = `${dObj.getUTCFullYear()}-${String(dObj.getUTCMonth() + 1).padStart(2, '0')}-${String(dObj.getUTCDate()).padStart(2, '0')}`;
      const daysDiff = Math.round((scheduledDateMs - asOfMs) / 86400000);

      let status = 'upcoming';
      let statusText = 'Upcoming';
      if (daysDiff < -14) {
        status = 'completed';
        statusText = 'Completed / Past';
      } else if (daysDiff <= 14) {
        status = 'due';
        statusText = daysDiff < 0 ? 'Overdue' : 'Due Now';
      }

      return {
        ...s,
        scheduledDate,
        daysDiff,
        status,
        statusText,
      };
    });

    return {
      dobFormatted: formatDateISO(dob),
      asOfFormatted: formatDateISO(asOf),
      schedule: items,
    };
  }

  /**
   * Warranty, Product & Vehicle Age Tracker
   */
  function calcWarranty(purchaseDateInput, warrantyMonths = 12, asOfInput) {
    const purchase = parseDateParts(purchaseDateInput);
    const asOf = asOfInput ? parseDateParts(asOfInput) : parseDateParts(new Date());

    const purchaseMs = toUtcMidnight(purchase);
    const asOfMs = toUtcMidnight(asOf);

    const totalMonthsToAdd = parseInt(warrantyMonths, 10);
    let expYear = purchase.year + Math.floor((purchase.month - 1 + totalMonthsToAdd) / 12);
    let expMonth = ((purchase.month - 1 + totalMonthsToAdd) % 12) + 1;
    const maxDaysInExpMonth = getDaysInMonth(expYear, expMonth);
    let expDay = Math.min(purchase.day, maxDaysInExpMonth);

    const expDate = { year: expYear, month: expMonth, day: expDay };
    const expMs = toUtcMidnight(expDate);

    const totalWarrantyDays = Math.max(1, Math.round((expMs - purchaseMs) / 86400000));
    const elapsedDays = Math.max(0, Math.round((asOfMs - purchaseMs) / 86400000));
    const daysRemaining = Math.round((expMs - asOfMs) / 86400000);

    const isExpired = daysRemaining < 0;
    const percentElapsed = isExpired ? 100 : Math.min(100, Math.max(0, Math.round((elapsedDays / totalWarrantyDays) * 100)));

    const ageDiff = calculateCalendarDifference(purchase, asOf);

    return {
      purchaseDateFormatted: formatDateISO(purchase),
      expirationDateFormatted: formatDateISO(expDate),
      warrantyMonths: totalMonthsToAdd,
      productAgeYears: ageDiff.years,
      productAgeMonths: ageDiff.months,
      productAgeDays: ageDiff.days,
      elapsedDays,
      daysRemaining: Math.abs(daysRemaining),
      isExpired,
      percentElapsed,
    };
  }

  /**
   * Generate RFC 5545 iCalendar (.ics) string
   */
  function generateIcsCalendar(options) {
    const { title, description, date, recurrenceYearly } = options;
    const parts = parseDateParts(date);
    const year = parts.year;
    const month = String(parts.month).padStart(2, '0');
    const day = String(parts.day).padStart(2, '0');
    const dtStart = `${year}${month}${day}T090000`;
    const dtEnd = `${year}${month}${day}T100000`;
    const uid = `dobcal-${Date.now()}@dobcal.pages.dev`;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dobcal//Age Calculator Calendar Sync//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStart}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${title || 'Birthday Celebration'}`,
      `DESCRIPTION:${description || 'Calculated on Dobcal Age Calculator (https://dobcal.pages.dev)'}`,
      recurrenceYearly !== false ? 'RRULE:FREQ=YEARLY' : '',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${title || 'Birthday'}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean);

    return lines.join('\r\n');
  }

  return {
    isLeapYear,
    getDaysInMonth,
    parseDateParts,
    calcAge,
    calculateAge: calcAge,
    calcDateDiff,
    calculateDifference: calcDateDiff,
    getNextBirthday,
    getWesternZodiac,
    getChineseZodiac,
    getBirthstone,
    getWeekdayRuler,
    getHijriDetails,
    getHinduCalendarDetails,
    getKoreanAgeDetails,
    getMilestoneDays,
    calcPetAge,
    calcPlanetaryAges,
    calcNumerology,
    calcVedicAstrology,
    getGeneration,
    getBirthDateTrivia,
    calcRetirementAndPension,
    calcPregnancy,
    calcBabyAge,
    calcVaccinationSchedule,
    calcWarranty,
    generateIcsCalendar,
    WEEKDAYS,
    MONTH_NAMES,
    GIA_BIRTHSTONES,
    CELESTIAL_RULERS,
  };
});
