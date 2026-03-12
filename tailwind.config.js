/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./.storybook/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          frame: {
            dark: "#00072D",
            navy: "#001C55",
            primary: "#0A2472",
            accent: "#A6E1FA"
          }
        }
      }
    },
    plugins: [],
  }