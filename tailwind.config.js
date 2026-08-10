/** @type {import('tailwindcss').Config} */
module.exports = {
  // Добавляем пути ко всем файлам с FSD-структурой
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};