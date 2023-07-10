// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  // typescript: {
  //   strict: true,
  // },
  app: {
    head: {
      title: 'Nuxt App',
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@unlok-co/nuxt-stripe',
    '@vee-validate/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
  ],
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  headlessui: {
    prefix: 'Headless',
  },
  veeValidate: {
    autoImports: true,
  },
})
