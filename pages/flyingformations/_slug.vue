<template>
  <section class="nft-slug w-full">
    <div class="bg-light-blue bg-opacity-20 grid grid-cols-12 0 py-14 md:py-20">
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
      class="grid grid-cols-12 md:gap-x-12 gap-y-10 px-4 md:px-10 pt-5 pb-14"
    >
      <Hyperlink class="body back-link" url="/flyingformations">Back</Hyperlink>
      <div class="col-span-full md:col-start-1 md:col-span-6 relative">
        <h1 class="nft-title heading-3">
          {{ title }}
        </h1>
        <p class="nft-shoe-size heading-4 text-lime font-serif mt-2 mb-4">
          Shoe Size: {{ shoeSize }}
        </p>
        <PortableText :blocks="nftDescription" />
      </div>
      <div class="col-span-full md:col-start-7 md:col-span-6">
        <div v-if="!nftIsOwned">
          <client-only>
            <Countdown />
          </client-only>
          <hr class="my-6" />
          <CurrentPrice />
          <button
            v-if="auctionStarted"
            class="wide-cta bg-lime text-navy my-6"
            @click="buy"
          >
            {{ buyButtonText }}
          </button>
          <p v-if="errorMessage" class="error-text">
            Error: {{ errorMessage }}
          </p>
        </div>
        <div v-else>
          <p class="heading-4 my-2">MINTED</p>
          <p class="body truncate">
            Owned By
            <Hyperlink :url="ownedByUrl" class="text-lime">
              {{ ownedByText }}
            </Hyperlink>
          </p>
          <Hyperlink
            :url="openSeaUrl"
            class="wide-cta text-lime border-lime my-6 cursor-pointer"
          >
            View On OpenSea
          </Hyperlink>
        </div>
      </div>
      <hr class="col-span-full" />
      <div class="col-span-full md:col-span-6">
        <div class="shoe-asset">
          <LazyImage v-if="shoeImage" :image="shoeImage" />
        </div>
      </div>
      <div class="col-span-full md:col-span-6">
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
      transactionInProgress: false,
      errorMessage: null
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
    auctionStarted() {
      return !this.$web3?.auctionNotStarted()
    },
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
      if (this.$config.ethereumNetwork !== 'mainnet') {
        return `https://testnets.opensea.io/assets/${this.readableContractAddress}/${this.tokenId}`
      }
      return `https://opensea.io/assets/${this.readableContractAddress}/${this.tokenId}`
    },
    ownedByText() {
      return this.owner
        ? String(this.owner).toUpperCase() ===
          String(this.$web3?.accounts?.[0]).toUpperCase()
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
      if (this.transactionInProgress) return

      this.transactionInProgress = true
      try {
        await this.$web3.mintDuck(this.tokenId)
        this.errorMessage = null
      } catch (e) {
        this.errorMessage = this.$web3.parseError(e.message)
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
.nft-slug {
  .nft-video-asset,
  .shoe-asset {
    height: 0;
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    img,
    .plyr {
      height: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
    }
  }

  .nft-title {
    @media (max-width: calc(theme('screens.md') - 1px)) {
      font-size: 36px;
    }
  }

  .nft-shoe-size {
    @media (max-width: calc(theme('screens.md') - 1px)) {
      font-size: 28px;
    }
  }

  .error-text {
    color: red !important;
    font-size: 1rem;
    text-align: center;
  }
}
</style>
