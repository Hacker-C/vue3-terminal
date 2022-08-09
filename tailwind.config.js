/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        body: '#0c0c0c', // 可以在类中使用 bg-primary
        header: '#39393b' // 可以在类中使用 bg-secondary
      }
    }
  },
  plugins: []
}
