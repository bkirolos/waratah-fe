<template>
  <article v-if="isOwner || isRedeemer" class="nft-item text-navy center border border-stroke-gray">
    <div class="nft-thumbnail">
      <Hyperlink :url="slug">
        <LazyImage v-if="image" :image="image" />
      </Hyperlink>
    </div>
    <div class="p-2 md:p-4">
      <Hyperlink :url="slug">
        <p class="heading-4 text-sm md:text-base">{{ title }}</p>
      </Hyperlink>
      <Hyperlink :url="slug">
        <p class="heading-6 mt-1">Shoe Size {{ shoeSize }}</p>
      </Hyperlink>
      <button v-if="!isRedeemer && isOwner" class="wide-thin-cta text-white bg-navy mt-8" @click="redeem">
        Redeem
      </button>
      <button v-if="isRedeemer && hasAvailabileStock" class="wide-thin-cta text-navy bg-lime mt-8" @click="checkout">
        Checkout
      </button>
      <button v-if="isRedeemer && !hasAvailabileStock" class="wide-thin-cta text-navy bg-stroke-gray mt-8" disabled> 
        Completed
      </button>
    </div>
  </article>
</template>

<script>
import productByHandle from '@/apollo/queries/productByHandle.gql'
import {
  CheckoutCreate,
} from '@/apollo/mutations/checkout.gql'

export default {
  props: {
    nft: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tokenOwner: null,
      tokenRedeemer: null,
      checkoutUrl: null,
      product: null
    }
  },
  computed: {
    image() {
      return this.nft?.image?.asset ? this.nft.image : null
    },
    hasAvailabileStock() {
      return this.product && this.productVariantAvailability > 0
    },
    isRedeemer() {
      return this.tokenRedeemer 
      ? String(this.tokenRedeemer).toUpperCase() === String(this.$web3?.accounts?.[0]).toUpperCase()
      : false  
    },
    isOwner () {
       return this.tokenOwner 
       ? String(this.tokenOwner).toUpperCase() === String(this.$web3?.accounts?.[0]).toUpperCase()
       : false 
    },
    productVariant() {
      return this.product?.variants?.edges[0].node
    },
    productVariantId() {
      return this.productVariant?.id
    },
    productVariantAvailability() {
      return this.productVariant?.quantityAvailable || 0
    },
    shoeSize() {
      return this.nft?.shoeSize
    },
    slug() {
      return `/flyingformations/${this.tokenId}`
    },
    title() {
      return this.nft?.title
    },
    tokenId() {
      return Number(this.nft?.tokenId)
    },
    walletConnected() {
      return this.$web3?.accounts
    }
  },
  watch: {
    walletConnected() {
      this.getOwner()
      this.getRedeemer()
    },
    isRedeemer() {
      this.getProduct()
    },
  },
  mounted() {
    this.getOwner()
    this.getRedeemer()
  },
  methods: {
    async checkout() {
      await this.getCheckout()
      if (this.checkoutUrl) {
        window.open(`${this.checkoutUrl}`)
      }
    },
    // Shopify Checkout URL
    async getCheckout() {
      const { app } = this.$nuxt.context
      const client = app.apolloProvider.defaultClient
      const variantId =  this.productVariantId
      const quantity = 1
      try { 
        const checkout = await client.mutate({
          mutation: CheckoutCreate,
          variables: {
            variantId,
            quantity,
          }
        })
        this.checkoutUrl = checkout?.data?.checkoutCreate?.checkout?.webUrl
       }catch(e) {
        console.log(e)
      }
    },
    async getProduct() {
      const { app } = this.$nuxt.context
      const client = app.apolloProvider.defaultClient
      const { data } = await client.query({
        query: productByHandle,
        variables: { handle: `flying-formations-${this.tokenId}` }
      })

      if (data?.product) {
        this.product = data.product
      } else {
        console.log("product not available")
      }
    },
    async getOwner() {
      this.tokenOwner = await this.$web3.getTokenOwner(this.tokenId)
    },
    async getRedeemer() {
      this.tokenRedeemer = await this.$web3.getTokenRedeemer(this.tokenId)
    },
    async redeem() {
      try {
        await this.$web3.redeemDuck(this.tokenId)
      }
      catch(e) {
        console.log(e)
        return
      }
      await this.getProduct()
      this.getRedeemer()
    }   
  },
}
</script>
<style lang="scss">
.nft-thumbnail {
  height: 0;
  padding-bottom: 100%;
  position: relative;
  width: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
