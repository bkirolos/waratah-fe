<template>
  <div
    class="product-detail bg-lime text-navy grid grid-cols-12 place-items-center w-screen"
  >
    <div
      class="grid grid-cols-12 col-span-full xl:col-span-6 py-12 xl:py-16 w-full"
    >
      <div class="col-start-2 col-span-10 xl:col-start-3 xl:col-span-9">
        <h1 class="heading-2 leading-negative mt-6">{{ title }}</h1>
        <h2 class="content-block heading-5" v-html="description"></h2>
        <div class="manifold-widgets mt-6 flex-column">
          <div
            data-widget="m-oauth-connect"
            :data-client-id="manifoldClientId"
            data-app-name="Waratah"
            data-redirect-uri="https://ducksofafeather.xyz/"
            data-override-connect-text="Connect Wallet"
            data-network="1"
          ></div>
          <div
            data-widget="m-campaign"
            :data-campaign-id="manifoldCampaignId"
            :data-client-id="manifoldClientId"
            data-app-name="Waratah"
            data-network="1"
          ></div>
        </div>
      </div>
    </div>
    <div class="product-image-wrap col-span-full xl:col-span-6">
      <img :src="src" />
    </div>
  </div>
</template>

<script>
import productByHandle from '@/apollo/queries/productByHandle.gql'

export default {
  data() {
    return {
      product: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: productByHandle,
      variables: { handle: params.slug }
    })

    if (data.product) {
      this.product = data.product
    } else {
      error({ statusCode: 404 })
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://connect.manifoldxyz.dev/connect.umd.js'
        },
        {
          src: 'https://campaign.manifoldxyz.dev/campaign.umd.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://connect.manifoldxyz.dev/connect.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://campaign.manifoldxyz.dev/campaign.css'
        }
      ]
    }
  },
  computed: {
    description() {
      return this.product?.descriptionHtml
    },
    manifoldCampaignId() {
      return '1049966459'
    },
    manifoldClientId() {
      return process.env.MANIFOLD_CLIENT_ID
    },
    src() {
      return this.product?.images.edges[0].node.originalSrc
    },
    title() {
      return this.product?.title
    }
  }
}
</script>

<style lang="scss">
.product-detail {
  .content-block {
    max-width: 357px;
    width: 100%;
  }

  .product-image-wrap {
    height: 100%;
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    img {
      height: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
