/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        },

        secondary: {
          400: '#a5b4fc',
          500: '#818cf8',
          600: '#6366f1'
        },

        neutral: {
          50: '#f8fafc',
          900: '#0f172a'
        }
      },

      animation: {
        gradient: 'gradient 3s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite'
      },

      keyframes: {
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },

        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },

      boxShadow: {
        glass: '0 8px 32px 0 rgba(31,38,135,0.37)',
        glow: '0 0 20px rgba(59,130,246,0.5)'
      }
    }
  },

  plugins: []
}