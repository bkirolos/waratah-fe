<template>
  <section class="grid grid-cols-1">
    <div
      class="grid grid-cols-12 bg-light-blue bg-opacity-20 py-20 row-start-1 row-span-1"
    >
      <div class="nft-video-asset col-start-4 col-span-6">
        <VideoPlayer v-if="video" :video="video" />
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
        <button class="cta bg-lime text-navy w-full my-6" @click="buy">
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
import { mapGetters } from 'vuex'
import nftBySlug from '@/groq/nftBySlug'
import nftSettings from '@/groq/nftSettings'

import web3 from '@/mixins/web3'

export default {
  data() {
    return {
      page: null,
      nftSettings: null
    }
  },
  mixins: [web3],
  async fetch() {
    const params = { slug: String(this.slug) }
    const data = await this.$sanity.fetch(nftBySlug, params)
    const nftSettingsData = await this.$sanity.fetch(nftSettings)

    this.page = data ? data[0] : null
    this.nftSettings = nftSettingsData
  },
  computed: {
    ...mapGetters({
      accounts: 'web3/getAccounts',
      price: 'web3/getPrice',
      connectionStatus: 'web3/getConnectionStatus'
    }),
    buyButtonText() {
      return this.connectionStatus === 'wallet'
        ? 'BUY'
        : 'CONNECT WALLET TO BUY'
    },
    title() {
      return this.page?.tokenId.current
        ? `Ducks of a Feather ${this.page?.tokenId.current}`
        : '404'
    },
    image() {
      return this.page?.image?.asset ? this.page.image : null
    },
    nftDescription() {
      return this.nftSettings?.nftDescription
    },
    shoeDescription() {
      return this.nftSettings?.shoeDescription
    },
    shoeImage() {
      return this.nftSettings?.shoeImage?.asset
        ? this.nftSettings.shoeImage
        : null
    },
    shoeSize() {
      return this.page?.shoeSize
    },
    slug() {
      return this.$route.params.slug
    },
    video() {
      return this.page?.video?.url ? this.page.video : null
    }
  },
  mounted() {
    // if this person has already connected to waratah, check for existing connection
    // and try to connect if we can
    if (
      this.$web3Modal.cachedProvider &&
      this.$web3Modal.cachedProvider === 'injected'
    ) {
      this.checkConnection()
    }
  },
  methods: {
    buy() {
      console.log('Buying for', this.accounts)
      this.mintDuck()
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
