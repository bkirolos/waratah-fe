<template>
  <article v-if="ownedByCurrentOwner || redeemedByCurrentAccount" class="nft-item text-navy center border border-stroke-gray">
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
      <button v-if="!redeemer && ownedByCurrentOwner" class="wide-cta text-navy bg-stroke-gray mt-8" @click="redeem">
        Redeem
      </button>
      <button v-if="redeemedByCurrentAccount && !productVariantAvailability <= 0" class="wide-cta text-navy bg-stroke-gray mt-8" @click="checkout">
        Checkout
      </button>
      <button v-if="redeemedByCurrentAccount && product && productVariantAvailability <= 0" class="wide-cta text-navy bg-stroke-gray mt-8" disabled> 
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
      owner: null,
      redeemer: null,
      checkoutUrl: null,
      product: null
    }
  },
  computed: {
    image() {
      return this.nft?.image?.asset ? this.nft.image : null
    },
    shoeSize() {
      return this.nft?.shoeSize
    },
    slug() {
      return `/flyingformations/${this.tokenId}`
    },
    minted() {
      if (this.$web3?.ownedTokens) {
        return this.$web3.ownedTokens.includes(this.tokenId)
      }
      return false
    },
    title() {
      return this.nft?.title
    },
    tokenId() {
      return Number(this.nft?.tokenId)
    },
    redeemedByCurrentAccount() {
      if (this.redeemer) {
        if (
          String(this.redeemer).toUpperCase() ===
          String(this.$web3?.accounts?.[0]).toUpperCase()
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    ownedByCurrentOwner () {
      if (this.owner) {
        if (
          String(this.owner).toUpperCase() ===
          String(this.$web3?.accounts?.[0]).toUpperCase()
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
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
    walletConnected() {
      return this.$web3?.accounts
    }
  },
  watch: {
    walletConnected() {
      this.getOwner()
      this.getRedeemer()
    },
    redeemedByCurrentAccount() {
      this.getProduct()
    },
  },
  mounted() {
    this.getOwner()
    this.getRedeemer()
  },
  methods: {
    async getOwner() {
      this.owner = await this.$web3.getTokenOwner(this.tokenId)
    },
    async getRedeemer() {
      this.redeemer = await this.$web3.getTokenRedeemer(this.tokenId)
    },
    async redeem() {
      await this.$web3.redeemDuck(this.tokenId)
      await this.getProduct()
      this.getRedeemer()
    },
    async checkout() {
      await this.getCheckout()
      console.log(this.checkoutUrl)
      if (this.checkoutUrl) {
        window.open(`${this.checkoutUrl}`)
      }
    },
    // Shopify 
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
