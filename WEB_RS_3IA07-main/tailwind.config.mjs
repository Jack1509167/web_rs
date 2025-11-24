/** @type {import('tailwindcss').Config} */
module.exports = {
  // Pastikan content array ini sesuai dengan setup Astro Anda.
  // Ini memberi tahu Tailwind file mana yang harus dipindai.
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  // 👈 DI SINI TEMPAT ANDA MENONAKTIFKAN DARK MODE
  darkMode: false,

  theme: {
    extend: {},
  },
  plugins: [],
};
