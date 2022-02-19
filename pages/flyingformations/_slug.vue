<template>
  <section class="grid grid-cols-1 w-full">
    <div class="row-span-1 grid grid-cols-12 bg-light-blue bg-opacity-20 py-20">
      <div
        class="nft-video-asset col-start-2 col-span-10 md:col-start-4 md:col-span-6"
      >
        <VideoPlayer
          v-if="video"
          :video="video"
          :autopause="false"
          autoplay
          hide-controls
          loop
        />
        <LazyImage v-else-if="image" :image="image" />
      </div>
    </div>
    <div
      class="row-span-1 grid grid-cols-12 p-10 sm:gap-y-5 md:gap-y-10 md:gap-x-10"
    >
      <div class="col-start-1 col-span-12 md:col-start-1 md:col-span-6">
        <h1 class="heading-3">{{ title }}</h1>
        <p class="base font-serif text-lime mt-2 mb-4">
          SHOE SIZE: {{ shoeSize }}
        </p>
        <PortableText :blocks="nftDescription" />
      </div>
      <div class="md:col-start-7 md:col-span-6 col-span-12">
        <div v-if="!nftIsOwned">
          <Countdown />
          <hr class="my-6" />
          <CurrentPrice />
          <button class="wide-cta text-navy my-6" @click="buy">
            {{ buyButtonText }}
          </button>
        </div>
        <div v-else>
          <p class="heading-4 my-2">SOLD</p>
          <p class="base truncate">
            Owned By
            <Hyperlink :url="ownedByUrl" class="text-lime">
              {{ ownedByText }}
            </Hyperlink>
          </p>
          <Hyperlink
            :url="openSeaUrl"
            class="wide-cta text-lime border-lime my-6"
          >
            View On OpenSea
          </Hyperlink>
        </div>
      </div>
      <hr class="col-span-12" />
    </div>
    <div
      class="row-span-1 grid grid-cols-12 p-10 sm:gap-y-5 md:gap-y-10 md:gap-x-10"
    >
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
import head from '@/mixins/head'

export default {
  mixins: [head],
  data() {
    return {
      nft: null,
      nftGeneral: null,
      owner: null,
      transactionInProgress: false
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
      if (this.transactionInProgress) {
        return 'Transaction In Progress'
      }
      if (this.$web3?.connectionStatus === 'wallet') {
        return 'Buy Now'
      }
      return 'Connect Wallet To Buy'
    },
    image() {
      return this.nft?.image?.asset ? this.nft.image : null
    },
    metaImage() {
      return this.image
    },
    metaDescription() {
      return (
        this.nftGeneral?.metaInfo?.description || this.metaDescriptionFallback
      )
    },
    nftTitle() {
      return this.tokenId ? `Ducks of a Feather ${this.tokenId}` : '404'
    },
    nftDescription() {
      return this.nftGeneral?.nftDescription
    },
    nftIsOwned() {
      return this.$web3?.ownedTokens.includes(this.tokenId)
    },
    pageTitle() {
      return `Flying Formation | ${this.nftTitle}`
    },
    openSeaUrl() {
      return `https://opensea.io/assets/${this.readableContractAddress}/${this.tokenId}`
    },
    ownedByText() {
      return this.owner
        ? String(this.owner) === String(this.$web3?.accounts[0]?.address)
          ? 'You!'
          : `${this.owner.slice(0, 8)}...`
        : 'Owned By --'
    },
    ownedByUrl() {
      return `https://etherscan.io/address/${this.owner}`
    },
    readableContractAddress() {
      return String(this.$web3?.contractAddress)
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
  watch: {
    nftIsOwned() {
      this.getOwner()
    }
  },
  mounted() {
    this.getOwner()
  },
  methods: {
    async buy() {
      if (this.$web3?.connectionStatus !== 'wallet') {
        this.$web3.connectWallet()
        return
      }
      this.transactionInProgress = true
      try {
        await this.$web3.mintDuck(this.tokenId)
      } catch (e) {
        console.log(e)
      }
      this.transactionInProgress = false
    },
    async getOwner() {
      this.owner = await this.$web3.getTokenOwner(this.tokenId)
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
