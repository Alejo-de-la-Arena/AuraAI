import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          950: '#09090B',
          900: '#0D0D10',
          800: '#111113',
          700: '#1C1C1F',
          600: '#27272A',
          500: '#3F3F46',
        },
        'cyan-aura': '#00E5FF',
        'green-aura': '#00FF88',
        'violet-aura': '#7C5CFF',
        fog: {
          400: '#8A8FA3',
          200: '#C4C7D4',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '400': '400ms',
        '700': '700ms',
        '1200': '1200ms',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '10px',
        lg: '14px',
        xl: '20px',
        '2xl': '28px',
      },
      boxShadow: {
        'sm-dark': '0 1px 2px rgba(0,0,0,0.4)',
        'md-dark': '0 4px 12px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.4)',
        'lg-dark': '0 16px 40px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4)',
        'xl-dark': '0 32px 80px rgba(0,0,0,0.55), 0 8px 16px rgba(0,0,0,0.4)',
        'glow-cyan': '0 0 0 1px rgba(0, 229, 255, 0.25), 0 8px 32px rgba(0, 229, 255, 0.2)',
        'glow-cyan-soft': '0 0 0 1px rgba(0, 229, 255, 0.1), 0 4px 24px rgba(0, 229, 255, 0.1)',
        'glow-green': '0 0 0 1px rgba(0, 255, 136, 0.2), 0 8px 32px rgba(0, 255, 136, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
