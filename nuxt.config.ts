// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/ellignton-pay-logo-black.png" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" },
      ],
      title: "Ellignton Business",
      meta: [
        { name: "author", content: "Ellignton Business, p" },
        { hid: "description", name: "description", content: "Spend less time speculating and more time running your business. The future of business is yours to shape." },
        { name: "Keywords", content: "Ellignton Business, Business Simplified" },
        { name: "theme-color", content: "#86872d" },
      ],
    },
  },

  devtools: {
    enabled: false,
  },

  imports: {
    dirs: ["constants/**", "composables/**"],
  },

  build: {},

  modules: [],

  plugins: [],

  css: [
    "materialize-css/dist/css/materialize.min.css",
    "@/assets/css/fonts.css",
    "@/assets/css/style.css",
    "@/assets/css/auth.css",
  ],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {},

  compatibilityDate: "2024-04-03",

})