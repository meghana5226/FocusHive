/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#6366f1",  // indigo
        secondary: "#f59e0b", // amber
        background: "#f8fafc",
        card: "#ffffff",
      },
    },
  },
  plugins: [],
}
