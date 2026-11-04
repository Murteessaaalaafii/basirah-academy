/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../shared/**/*.{js,ts,jsx,tsx,mdx,json}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: "#07162F",
        deepspace: "#0B2044",
        cobalt: "#145BD7",
        electric: "#287BFF",
        cyan: {
          DEFAULT: "#16D9F5",
          400: "#38e0f7",
          500: "#16D9F5",
          600: "#0bbbd4"
        },
        gold: {
          DEFAULT: "#D9A83F",
          champagne: "#F2D18B",
          luxury: "#D9A83F",
          dark: "#B88728"
        },
        pearl: "#F4F7FC",
        icewhite: "#E7F1FF",
        slate: {
          soft: "#91A4C1",
          dim: "#6B7C96"
        },
        status: {
          success: "#19B887",
          warning: "#F3B544",
          error: "#EF5D69",
          info: "#4BA9F5",
          violet: "#8568F5"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        display: ['Manrope', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'midnight-cobalt': 'linear-gradient(135deg, #07162F 0%, #145BD7 100%)',
        'electric-cyan': 'linear-gradient(135deg, #287BFF 0%, #16D9F5 100%)',
        'champagne-gold': 'linear-gradient(135deg, #F2D18B 0%, #D9A83F 100%)',
        'prismatic-glass': 'linear-gradient(180deg, rgba(22, 217, 245, 0.08) 0%, rgba(11, 32, 68, 0.5) 100%)'
      },
      boxShadow: {
        'prismatic': '0 8px 32px 0 rgba(7, 22, 47, 0.45)',
        'cyan-glow': '0 0 25px rgba(22, 217, 245, 0.25)',
        'gold-glow': '0 0 25px rgba(217, 168, 63, 0.25)',
        'card-elevated': '0 10px 30px -5px rgba(7, 22, 47, 0.7)'
      }
    },
  },
  plugins: [],
};

