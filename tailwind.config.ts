import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts,js}',
    './composables/**/*.{vue,ts,js}',
    './layouts/**/*.{vue,ts,js}',
    './pages/**/*.{vue,ts,js}',
    './app.vue',
    './error.vue',
    './plugins/**/*.{ts,js}',
    './utils/**/*.{ts,js}',
    './types/**/*.{ts,js}',
  ],

  plugins: [],
} satisfies Config
