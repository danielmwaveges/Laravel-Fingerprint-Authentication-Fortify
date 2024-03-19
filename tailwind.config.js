/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.js",
      "./resources/**/*.vue",
    ],
    theme: {
      extend: {
        colors: {
          'carmen-pink' : '#eb4c42',
          'light-carmen-pink' : '#e66771'
        },
      },
      
    },
    plugins: [],
  }