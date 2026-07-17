/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f8fa',
          100: '#eef0f4',
          200: '#dce0e8',
          300: '#bfc6d4',
          400: '#8b94a8',
          500: '#5b6478',
          600: '#3d4458',
          700: '#2a3043',
          800: '#1b2030',
          900: '#10131d',
          950: '#080a11',
        },
        accent: {
          50: '#eafaf3',
          100: '#cef3df',
          200: '#9ce6c0',
          300: '#5fd49c',
          400: '#2ebd78',
          500: '#14a25e',
          600: '#0a824a',
          700: '#0a663b',
          800: '#0b5131',
          900: '#0a4329',
        },
        warn: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(46,189,120,0.25), 0 0 24px rgba(46,189,120,0.18)',
        card: '0 1px 2px rgba(16,19,29,0.08), 0 8px 24px rgba(16,19,29,0.06)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-468px 0' },
          '100%': { backgroundPosition: '468px 0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'fade-up': 'fade-up 0.35s cubic-bezier(0.22,1,0.36,1)',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.66,0,0,1) infinite',
        shimmer: 'shimmer 1.4s linear infinite',
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
