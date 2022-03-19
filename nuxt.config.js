import { shopifyApolloClient, shopifyGenerate } from './generate-config'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ducks of a Feather',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css'
      }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/preview', mode: 'client' },
    { src: '~/plugins/vue-observe-visibility' },
    { src: '~/plugins/vue-plyr', mode: 'client' },
    { src: '~/plugins/web-3', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  env: {
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN, // prettier-ignore
    apiEndpoint: process.env.SHOPIFY_API_ENDPOINT
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sanity/module',
    '@nuxtjs/svg',
    '@nuxtjs/tailwindcss',
    'nuxt-lazysizes'
  ],
  googleFonts: {
    families: {
      'Open+Sans': {
        wght: [400, 800],
        ital: [400, 800]
      }
    },
    display: 'swap'
  },
  lazySizes: {
    extendAssetUrls: {
      img: ['src', 'srcset', 'data-src', 'data-srcset']
    },
    plugins: {
      blurUp: true
    }
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    withCredentials: true,
    useCdn: false,
    minimal: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/dayjs', '@nuxtjs/axios', '@nuxtjs/apollo'],
  dayjs: {
    defaultTimeZone: 'America/Los_Angeles',
    plugins: ['utc', 'timezone', 'advancedFormat']
  },

  // Runtime config
  publicRuntimeConfig: {
    auctionEndTime: process.env.AUCTION_END_TIME || null,
    auctionStartTime: process.env.AUCTION_START_TIME || null,
    ethereumNetwork: process.env.ETHEREUM_NETWORK,
    infuraId: process.env.INFURA_ID,
    nftGoLive: process.env.NFT_GO_LIVE,
    openSeaCollectionUrl:
      process.env.OPEN_SEA_COLLECTION_URL || 'https://opensea.io/'
  },
  privateRuntimeConfig: {
    sanity: {
      token: process.env.SANITY_PREVIEW_TOKEN
    }
  },

  apollo: {
    clientConfigs: {
      default: '@/apollo/clients/shopifyClient.js'
    },
    includeNodeModules: true
  },

  // Generate configuration
  generate: {
    fallback: true,
    routes() {
      return ['/products/limited-edition-nike-air-max-1-uo-edition']
    }
  },

  // Build configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
