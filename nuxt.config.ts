// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/icon', '@nuxt/eslint'],

  typescript: {
    strict: true,
    typeCheck: false, // Disabled for dev - types still checked by IDE
    shim: false,
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  // Path aliases
  alias: {
    '@': '.',
    '~': '.',
    '@components': './components',
    '@composables': './composables',
    '@types': './types',
    '@utils': './utils',
    '@store': './store',
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (server-side only)
    // apiSecret: process.env.NUXT_API_SECRET || '',

    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Nuxt Starter',
      appDescription:
        process.env.NUXT_PUBLIC_APP_DESCRIPTION || 'A modern Nuxt.js starter template',
    },
  },

  // App config for SEO
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt Starter Theme',
      meta: [
        {
          name: 'description',
          content:
            'A production-grade Nuxt.js v4 starter template with TypeScript, Tailwind CSS v4, and TanStack Query',
        },
        { name: 'theme-color', content: '#0ea5e9' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // Nitro config for API routes
  nitro: {
    routeRules: {
      '/api/**': { cors: true },
    },
  },

  // Build optimizations
  build: {
    transpile: ['vue-sonner'],
  },

  experimental: {
    typedPages: true,
  },
})
