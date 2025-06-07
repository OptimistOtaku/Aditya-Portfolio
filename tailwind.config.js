/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#b026ff',
        'neon-blue': '#4d4dff',
        'neon-cyan': '#00ffff',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px #b026ff, 0 0 20px #b026ff, 0 0 30px #b026ff' },
          '100%': { textShadow: '0 0 20px #b026ff, 0 0 30px #b026ff, 0 0 40px #b026ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} 