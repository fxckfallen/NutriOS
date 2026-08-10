/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app_layer/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // 🎨 ЦВЕТА (Colors)
      colors: {
        // Акцентный цвет и его вариации
        accent: {
          DEFAULT: '#1CF28A', // accent green
          border: 'rgba(28, 242, 138, 0.20)', // accent borders (20%)
          bg: 'rgba(28, 242, 138, 0.10)', // accent bg tint (10%)
        },
        // Фоны
        background: '#0A0A0A', // app background
        surface: {
          DEFAULT: '#141414', // primary surface (cards)
          secondary: '#1C1C1C', // secondary surface (inputs, row bg)
        },
        // Обводка (Borders)
        divider: 'rgba(255, 255, 255, 0.08)', // all borders (8%)
        // Тексты (Text) - назвал foreground, чтобы класс был text-foreground, а не text-text
        foreground: {
          DEFAULT: '#FFFFFF', // primary text
          muted: 'rgba(255, 255, 255, 0.50)', // secondary text (50%)
          placeholder: 'rgba(255, 255, 255, 0.24)', // placeholder or tertiary (24%)
        },
        // Дополнительные цвета
        amber: '#F59E0B',
        blue: '#60A5FA',
        red: '#F87171',
        green2: '#4ADE80',
      },

      // 📏 ЗАКРУГЛЕНИЯ (Border Radius)
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },

      // ↔️ ОТСТУПЫ (Spacing)
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        '3xl': '32px',
      },

      // 🔠 РАЗМЕРЫ ШРИФТОВ (Font Size)
      fontSize: {
        disp: '28px',
        titl: '20px',
        head: '17px',
        body: '14px',
        cap: '12px',
        micr: '11px',
      }
    },
  },
  plugins: [],
};