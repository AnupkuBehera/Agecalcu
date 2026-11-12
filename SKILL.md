---
name: age-calculator
description: "Engineering and UX standards for maintaining, building, and extending the client-side Age Calculator web tool."
---

# Age Calculator: Engineering & UX Skill

This skill documents the technical design, mathematical invariants, calendar arithmetic algorithms, UX standards, and testing procedures for the **Age Calculator** web application.

---

## 📐 Mathematical & Calendar Invariants

### 1. Calendar Borrowing vs. Division
- **Never** divide elapsed days by 365 or 365.25 for chronological age. Months vary between 28 and 31 days.
- **Calendar Borrowing Rule**:
  - Subtract days: if `targetDay < birthDay`, borrow the exact number of days from the preceding calendar month relative to the target date.
  - Symmetrical adjustment: if the preceding month had fewer days than `birthDay` (e.g., February preceding March 1st), the monthly milestone occurred on the month's final day, so `days = targetDay`.
  - Subtract months: if `targetMonth < birthMonth`, borrow 12 months from the target year.
  - Subtract years: full completed calendar years are evaluated based on whether the anniversary has already occurred.

### 2. Gregorian Leap Year Rules
- A year is a leap year if `(year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)`.
- February 29 birthdays (leap babies):
  - In leap years, the anniversary falls on February 29.
  - In common (non-leap) years, legal and administrative convention considers the anniversary as February 28 or March 1. The calculator defaults to February 28 with a clear informational note.

### 3. Exam & Recruitment Cutoff Dates
- Common government and academic cutoff dates supported via one-click presets:
  - **1st January**: Standard calendar recruitment cutoff.
  - **31st March**: Financial year / academic session cutoff.
  - **1st August**: Standard UPSC / SSC / civil service cutoff.

---

## 🎨 UX & Interaction Guidelines

1. **Dual Date Input System**:
   - Provide both segmented dropdowns (Day, Month, Year) and native date inputs.
   - Synchronize both representations bi-directionally without page jitter.
   - Populate year lists in descending order for quick selection of adult birth years.

2. **Visual Hierarchy**:
   - High-contrast hero age figures (`text-4xl font-extrabold`).
   - Group results into digestible sub-tabs:
     - **Summary**: Years, months, days, next birthday countdown.
     - **Milestones & Trivia**: Western Zodiac, Chinese Zodiac, 10,000-day milestone, biological statistics.
     - **Detailed Units**: Total months, weeks, days, hours, minutes, seconds.

3. **Celebration & Micro-interactions**:
   - When a user calculates their age on their birthday, trigger a festive celebration banner and non-intrusive confetti animation.
   - Provide copy-to-clipboard with toast notifications and native Web Share API integration.
   - Provide a printable "Age Verification Certificate" view optimized for `window.print()` without headers or footers.

4. **Accessibility (WCAG 2.1 AA)**:
   - Provide `aria-live="polite"` on results cards.
   - Maintain a minimum contrast ratio of 4.5:1 in both light and dark modes.
   - Touch targets must be 44px+ on mobile devices.
   - Enable keyboard shortcuts: `Enter` to calculate, `Escape` to reset.

5. **Design System & OpenDesignMD Specification (`DESIGN.md`)**:
   - Visual tokens, typography scales, surface elevation, and component patterns follow the Cal.com calendar-first minimalist specification defined in [`DESIGN.md`](DESIGN.md).
   - **Palette**: Clean soft-neutral canvas (`#F8F9FA` light / `#09090B` dark), crisp white/zinc card surfaces (`#FFFFFF` light / `#18181B` dark), hairline borders (`#E5E7EB` light / `#27272A` dark), stark high-contrast primary CTA (`#111827` light / `#FFFFFF` dark), and subtle signal blue focus/active accents (`#2563EB` light / `#3B82F6` dark).
   - **Typography**: Inter (UI & Display) with tight tracking (`-0.025em`) paired with JetBrains Mono tabular figures (`font-variant-numeric: tabular-nums`).
   - **Surfaces**: Crisp 14px cards (`.cal-card`), 8px input elements, and subtle micro-shadows avoiding heavy gradients.

---

## 🧪 Testing & Verification

Run automated tests using Node.js:

```bash
# Calendar arithmetic & edge-case unit tests
node test/test-calc.js

# HTML structure, JSON-LD schema, and DOM element validation
node test/validate-html.js
```

All test additions must verify:
- Feb 29 leap-day birthdays across leap and common years.
- Month-end borrowing (e.g. Jan 31 to Feb 28, Aug 31 to Sep 30).
- Negative or future date validations.
- Date difference inclusive vs non-inclusive mode.

