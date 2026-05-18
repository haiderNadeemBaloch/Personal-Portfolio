const { colors, spacing, typography, radii, transitions } = require('./src/styles/tokens.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        accent: colors.accent,
        neutral: colors.neutral,
        success: colors.success,
        error: colors.error,
        gray: colors.neutral,
      },
      spacing: spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      borderRadius: radii,
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.easing,
      screens: {
        mobile: '320px',
        'mobile-lg': '375px',
        tablet: '768px',
        'tablet-lg': '1024px',
        desktop: '1280px',
        'desktop-lg': '1536px',
      },
    },
  },
  plugins: [],
};

