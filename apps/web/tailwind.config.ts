import type { Config } from 'tailwindcss';
import sharedConfig from '../../packages/config/tailwind-preset';

const config: Config = {
  presets: [sharedConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
      backgroundColor: {
        background: 'hsl(var(--background))',
      },
      textColor: {
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
