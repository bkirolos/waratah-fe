<template>
  <section class="grid grid-cols-1">
    <div
      class="grid grid-cols-12 bg-light-blue bg-opacity-20 py-20 row-start-1 row-span-1"
    >
      <div class="nft-video-asset col-start-4 col-span-6">
        <VideoPlayer v-if="video" :video="video" autoplay loop />
        <LazyImage v-else-if="image" :image="image" />
      </div>
    </div>
    <div class="grid grid-cols-12 row-start-2 row-span-1 p-10 gap-10">
      <div class="md:col-span-6 col-span-12">
        <h1 class="heading-3">{{ title }}</h1>
        <p class="base font-serif text-lime mt-2 mb-4">
          SHOE SIZE: {{ shoeSize }}
        </p>
        <PortableText :blocks="nftDescription" />
      </div>
      <div class="md:col-span-6 col-span-12">
        <p class="base font-bold my-4">
          Sale ends Feburary 24th at 11:45pm PST at 1ETH
        </p>
        <p>ADD TIMER</p>
        <hr class="my-6" />
        <h2 class="heading-5 base font-bold my-2">Current Price</h2>
        <p class="heading-4 font-serif">{{ price }} ETH</p>
        <button
          class="cta bg-lime text-navy w-full my-6"
          :disabled="disableButton"
          @click="buy"
        >
          {{ buyButtonText }}
        </button>
      </div>
      <hr class="col-span-12" />
    </div>
    <div class="grid grid-cols-12 row-start-3 row-span-1 p-10 gap-x-10">
      <div class="md:col-span-6 col-span-12">
        <div class="shoe-asset">
          <LazyImage v-if="shoeImage" :image="shoeImage" />
        </div>
      </div>
      <div class="md:col-span-6 col-span-12">
        <PortableText :blocks="shoeDescription" />
      </div>
    </div>
  </section>
</template>

<script>
import nftById from '@/groq/nftById'
import nftSettings from '@/groq/nftSettings'

export default {
  data() {
    return {
      nft: null,
      nftGeneral: null,
      owner: null
    }
  },
  async fetch() {
    const params = { id: this.$route.params.slug }
    const nft = await this.$sanity.fetch(nftById, params)
    const nftGeneral = await this.$sanity.fetch(nftSettings)
    this.nft = nft
    this.nftGeneral = nftGeneral
  },
  computed: {
    buyButtonText() {
      if (this.$web3?.ownedTokens) {
        const mappedTokens = this.$web3.ownedTokens.map(bn => bn.toNumber())
        return mappedTokens.includes(this.tokenId) ? 'OWNED' : 'AVAILABLE'
      }
      return this.$web3?.connectionStatus === 'wallet'
        ? 'BUY'
        : 'CONNECT WALLET TO BUY'
    },
    disableButton() {
      return this.$web3?.connectionStatus !== 'wallet'
    },
    image() {
      return this.nft?.image?.asset ? this.nft.image : null
    },
    nftTitle() {
      return this.tokenId
        ? `Ducks of a Feather ${this.tokenId}`
        : '404'
    },
    nftDescription() {
      return this.nftGeneral?.nftDescription
    },
    price() {
      return this.$web3?.price ? this.$web3.formatPrice(this.$web3?.price) : '-'
    },
    shoeDescription() {
      return this.nftGeneral?.shoeDescription
    },
    shoeImage() {
      return this.nftGeneral?.shoeImage?.asset
        ? this.nftGeneral.shoeImage
        : null
    },
    shoeSize() {
      return this.nft?.shoeSize
    },
    title() {
      return this.nft?.title
    },
    tokenId() {
      return parseInt(this.nft?.tokenId) || null
    },
    video() {
      return this.nft?.video?.url ? this.nft.video : null
    }
  },
  methods: {
    buy() {
      console.log('Buying for', this.$web3.accounts)
      this.$web3.mintDuck()
    }
  }
}
</script>

<style lang="scss">
$slide-width: clamp(1px, 100%, 670px);
.nft-video-asset,
.shoe-asset {
  flex-shrink: 0;
  height: 0;
  margin-right: 0.5rem;
  padding-bottom: $slide-width;
  position: relative;
  width: $slide-width;
  img,
  .plyr {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.shoe-asset {
  width: clamp(1px, 100%, 660px);
}
</style>
