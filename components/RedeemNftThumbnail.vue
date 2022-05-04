<template>
  <article v-if="ownedByCurrentOwner || redeemedByCurrentAccount" class="nft-item text-navy center border border-stroke-gray">
    <div class="nft-thumbnail">
      <div
        v-if="minted"
        class="small-cta absolute border text-navy bg-electric-green font-semibold right-2 top-2"
      >
        MINTED
      </div>
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
      <Hyperlink :url="slug" class="small-cta text-navy bg-stroke-gray mt-8">
        View Details
      </Hyperlink>
    </div>
  </article>
</template>

<script>
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
      redeemer: null
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
    walletConnected() {
      return this.$web3?.accounts
    }
  },
  watch: {
    walletConnected() {
      this.getOwner()
      this.getRedeemer()
    }
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
