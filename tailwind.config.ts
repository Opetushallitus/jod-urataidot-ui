import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '300px',
      sm: '640px',
      md: '1024px',
      lg: '1440px',
    },
    fontSize: {
      'heading-1': [
        '2.25rem',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'heading-2': ['1.75rem', { lineHeight: '140%', fontWeight: '600' }],
      'heading-3': ['1.25rem', { lineHeight: '140%', fontWeight: '600' }],
      'heading-4': ['1rem', { lineHeight: '140%', fontWeight: '600' }],
      'heading-5': ['0.875rem', { lineHeight: '140%', fontWeight: '600' }],
      body: ['1rem', { lineHeight: '140%', fontWeight: '400' }],
      'body-lg': ['1.125rem', { lineHeight: '140%', fontWeight: '400' }],
      'body-sm': ['0.875rem', { lineHeight: '140%', fontWeight: '400' }],
      'body-sm-bold': ['0.875rem', { lineHeight: '140%', fontWeight: '700' }],
      'body-bold': ['1rem', { lineHeight: '140%', fontWeight: '700' }],
      'overline-sm': ['0.750rem', { lineHeight: '140%', fontWeight: '700' }],
    },
    fontFamily: {
      display: 'Poppins, system-ui-bold, sans-serif',
      sans: 'Arial, system-ui, sans-serif',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'rgba(0, 0, 0, 0)',
      'text-disabled': '#7D7F85',
      primary: '#006DB3',
      'primary-light': '#99CEEF',
      'primary-hover': '#0065A6',
      'primary-contrast': '#004E82',
      'primary-contrast-hover': '#00426E',
      'primary-muted': '#E5F2FB',
      'primary-muted-hover': '#D6EBF9',
      'success-muted': '#DDF2EB',
      'surface-hover': '#F5F6FA',
      background: '#F0F2F5',
      'background-dark': '#E4E6EC',
      'neutral-1': '#55575E',
      'neutral-2': '#92969D',
      'neutral-3': '#D4D6DB',
      'neutral-4': '#E4E5E9',
      'neutral-5': '#F0F1F5',
      'visualization-peach': '#F8CBB5',
      'visualization-orange': '#F5B08F',
      'visualization-turquoise': '#66CBD1',
      'visualization-sky': '#ADD8F2',
      'visualization-blue': '#85C4EC',
      'visualization-pink': '#E195D1',
    },
    extend: {
      height: {
        'button-lg': '44px',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        DEFAULT: 'rgba(0, 0, 0, 0.25)',
        light: 'rgba(0, 0, 0, 0.1)',
      },
    },
    variants: {
      extend: {
        backgroundColor: ['disabled'],
        textColor: ['disabled'],
      },
    },
  },
  plugins: [
    // https://tailwindcss.com/docs/plugins#adding-variants
    plugin(function ({ addVariant }) {
      addVariant('slider-thumb', ['&::-webkit-slider-thumb', '&::-moz-range-thumb']);
      addVariant('slider-track', ['&::-webkit-slider-runnable-track', '&::-moz-range-track']);
    }),
    containerQueries,
  ],
} satisfies Config;
