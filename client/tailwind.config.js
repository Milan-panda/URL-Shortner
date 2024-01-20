/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*"
],
daisyui: {
  themes: [],
},
  theme: {
    extend: {
      colors:{
        "border-rgba" : 'rgba(255, 255, 255, 0.37)',
      },
    },
  },
  plugins: [require("daisyui")],
}