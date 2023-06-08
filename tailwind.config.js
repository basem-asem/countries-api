/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      colors: {
        dark: {
          blue: 'hsl(209, 23%, 22%)',
          veryDarkBlue: 'hsl(207, 26%, 17%)',
          text: 'hsl(200, 15%, 8%)',
        },
        light: {
          gray: 'hsl(0, 0%, 52%)',
          veryLightGray: 'hsl(0, 0%, 98%)',
          white: 'hsl(0, 0%, 100%)',
        },
      },
      },
  },
  plugins: [],
}

