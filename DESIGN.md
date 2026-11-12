---
title: "Age Calculator Design System (Cal.com / OpenDesignMD Edition)"
description: "Design specification and token catalog for Age Calculator, adapted from Cal.com's modern calendar-first design system on OpenDesignMD."
source: "https://opendesignmd.com/designs/cal-com/DESIGN.md"
version: "1.0.0"
tokens:
  colors:
    light:
      canvas: "#F8F9FA"
      canvasSubtle: "#F1F3F5"
      surface: "#FFFFFF"
      surfaceElevated: "#F8F9FA"
      border: "#E5E7EB"
      borderSubtle: "#F3F4F6"
      borderStrong: "#D1D5DB"
      textPrimary: "#111827"
      textSecondary: "#4B5563"
      textMuted: "#9CA3AF"
      accent: "#111827"
      accentHover: "#000000"
      brandBlue: "#2563EB"
      brandBlueSubtle: "rgba(37, 99, 235, 0.08)"
      focusRing: "#2563EB"
    dark:
      canvas: "#09090B"
      canvasSubtle: "#121215"
      surface: "#18181B"
      surfaceElevated: "#27272A"
      border: "#27272A"
      borderSubtle: "#1F1F23"
      borderStrong: "#3F3F46"
      textPrimary: "#F9FAFB"
      textSecondary: "#A1A1AA"
      textMuted: "#71717A"
      accent: "#FFFFFF"
      accentHover: "#F3F4F6"
      brandBlue: "#3B82F6"
      brandBlueSubtle: "rgba(59, 130, 246, 0.12)"
      focusRing: "#3B82F6"
  typography:
    display: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
  radius:
    sm: "6px"
    md: "8px"
    lg: "12px"
    xl: "16px"
    full: "9999px"
  shadows:
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)"
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)"
---

# Design System: Cal.com Calendar-First Minimalist

## 1. Visual Philosophy
- **Calendar-Native Precision**: Purpose-built for scheduling and time calculation. Replaces generic gradient fluff and outdated serif styling with crisp, modern typography and functional white space.
- **Stark Contrast & Clarity**: Uses deep black primary elements on clean soft-neutral backdrops in light mode, and obsidian surfaces in dark mode.
- **Subtle Micro-Borders**: Avoids heavy drop-shadows; uses crisp 1px borders (`#E5E7EB` / `#27272A`) to define elevation and structure.

## 2. Typography Rules
- **Headlines**: Inter with tight negative tracking (`-0.025em`) and strong font-weight (`font-extrabold` / 800) for punchy authority.
- **Body & Labels**: Inter with standard tracking, relaxed line-height (1.5–1.6), and muted contrast for secondary metadata.
- **Numbers**: JetBrains Mono with tabular figures (`tabular-nums`) to ensure zero layout shift during countdowns and tickers.

## 3. Component Patterns
- **Primary CTA**: Solid high-contrast button (`bg-[#111827]` in light mode / `bg-white` in dark mode) with high-contrast text and 8px border-radius.
- **Segmented Control**: Pill-style background container with active white card pill and subtle border.
- **Input Fields**: 44px+ height with subtle border, soft background, and a sharp blue focus ring (`#2563EB`).
- **Stat Tiles**: Minimalist cards with quiet borders, muted uppercase labels, and bold tabular numbers.

