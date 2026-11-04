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
        cosmic: "#030914",
        midnight: "#07162F",
        deepspace: "#0B2044",
        cobalt: "#145BD7",
        electric: "#287BFF",
        cyan: {
          DEFAULT: "#16D9F5",
          300: "#70F0FF",
          400: "#00F0FF",
          500: "#16D9F5",
          600: "#0bbbd4"
        },
        gold: {
          DEFAULT: "#D9A83F",
          24: "#FFD700",
          amber: "#F59E0B",
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
        category: {
          aiml: "#00F0FF",
          prog: "#10B981",
          agents: "#C084FC",
          data: "#F97316",
          tech: "#06B6D4"
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
        'gold-metallic': 'linear-gradient(135deg, #FFD700 0%, #F59E0B 50%, #D9A83F 100%)',
        'prismatic-glass': 'linear-gradient(180deg, rgba(22, 217, 245, 0.08) 0%, rgba(11, 32, 68, 0.5) 100%)'
      },
      boxShadow: {
        'prismatic': '0 8px 32px 0 rgba(7, 22, 47, 0.45)',
        'cyan-glow': '0 0 25px rgba(22, 217, 245, 0.35)',
        'gold-glow': '0 0 25px rgba(217, 168, 63, 0.35)',
        'gold-glass': '0 0 20px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'cyan-glass': '0 0 20px rgba(0, 240, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'card-elevated': '0 10px 30px -5px rgba(7, 22, 47, 0.7)'
      }
    },
  },
  plugins: [],
};
