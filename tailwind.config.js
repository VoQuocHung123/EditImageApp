/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes :{
        dropDown: {
          '0%':{transform: 'translateY(-100%)'},
          '100%': {transform: 'translateY(0)'}
        }
      },
      animation: {
        dropDown: 'dropDown 0.5s ease-in-out '
      }
    },
  },
  plugins: [],
}

