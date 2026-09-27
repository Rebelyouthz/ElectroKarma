/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 5px currentColor' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
