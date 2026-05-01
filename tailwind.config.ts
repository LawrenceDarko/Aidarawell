import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f8f7',
          100: '#d1ebe8',
          200: '#b2dfd9',
          300: '#93d3ca',
          400: '#74c7bb',
          500: '#1B5E75',
          600: '#0B5345',
          700: '#084038',
          800: '#062b2c',
          900: '#041520',
        },
        'accent': {
          50: '#fefbf7',
          100: '#fce9d4',
          200: '#f9d8b0',
          300: '#f6c68d',
          400: '#f3b56a',
          500: '#D4A574',
          600: '#c4935d',
          700: '#b08247',
          800: '#9c7130',
          900: '#88601a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
