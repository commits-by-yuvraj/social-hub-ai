import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        shell: '14px',
        'shell-lg': '16px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.24), 0 2px 8px rgba(0, 0, 0, 0.12)',
        premium: '0 1px 2px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        surface: {
          base: '#0a0a0b',
          raised: '#111113',
          elevated: '#18181b',
          hover: '#1f1f23',
        },
        accent: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'slide-in-left': 'slideInLeft 0.25s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
} satisfies Config
