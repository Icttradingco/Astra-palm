/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic Palette
        midnight: {
          DEFAULT: "#0B0E14",
          light: "#161B22",
          deep: "#05070A",
        },
        spirit: {
          purple: "#6D28D9",
          violet: "#7C3AED",
          indigo: "#4F46E5",
          blue: "#2563EB",
          cyan: "#06B6D4",
        },
        cosmic: {
          text: "#F8FAFC",
          muted: "#94A3B8",
          glow: "rgba(34, 211, 238, 0.3)",
        }
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      backgroundImage: {
        'cosmic-gradient': "linear-gradient(to bottom right, #0B0E14, #1E1B4B, #4C1D95)",
        'premium-glass': "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
        'glow-conic': "conic-gradient(from 180deg at 50% 50%, #22D3EE 0deg, #818CF8 120deg, #C084FC 240deg, #22D3EE 360deg)",
      },
      animation: {
        'cosmic-pulse': 'cosmic-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'cosmic-pulse': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
