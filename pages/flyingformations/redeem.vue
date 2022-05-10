<template>
  <AssetRedemptionModal v-if="showRedemptionModal" :redemption-modal="redemptionModalData" />
  <div v-else class="flex flex-col w-full">
    <section
      class="bg-navy grid grid-cols-12 gap-y-10 px-4 py-12 md:px-10 md:py-20"
    >
      <div class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5">
        <h1 class="heading-2">{{ heading }}</h1>
        <client-only>
          <Countdown :live-text="countdownLiveText" :end-time="countdownEndTime" class="py-4"/>
        </client-only>
      </div>
      <div
        class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5 lg:col-start-7"
      >
        <PortableText :blocks="description" />
      </div>
    </section>
    <section v-if="errorMessage" class="bg-white heading-4 text-navy w-full text-center py-20 md:py-48">
        {{ errorMessage }}
    </section>
    <section
      v-else
      class="bg-white flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-2 py-10 md:p-10"
    >
      <RedeemNftThumbnail
        v-for="nft in nftDisplay"
        :key="nft.tokenId"
        class="col-span-1"
        :nft="nft"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import allNfts from '@/groq/allNfts'
import redeemSettings from '@/groq/redeemSettings'
import head from '@/mixins/head'

export default {
  mixins: [head],
  data() {
    return {
      nfts: null,
      nftRedeemSettings: null
    }
  },
  async fetch() {
    const params = { slug: 'flyingformations' }
    const nftRedeemSettings = await this.$sanity.fetch(redeemSettings, params)
    if (!nftRedeemSettings) {
      return this.$nuxt.error({ statusCode: 404 })
    }
    this.nftRedeemSettings = nftRedeemSettings?.redeemSettings
    const nfts = await this.$sanity.fetch(allNfts)
    this.nfts = nfts.sort((a, b) => a.tokenId - b.tokenId)
  },
  computed: {
    ...mapGetters({
      showRedemptionModal: 'ui/showRedemptionModal'
    }),
    countdown() {
      return this.nftRedeemSettings?.redeemCountdown
    },
    countdownEndTime() {
      return this.countdown?.endTime
    },
    countdownLiveText() {
      return this.countdown?.liveText
    },
    description() {
      return this.nftRedeemSettings?.redeemDescription
    },
    errorMessage() {
      return this.walletConnected 
      ? this.nftDisplay 
        ? null 
        : "Looks Like You Dont Own Any Assets."
      : "Please Connect Your Wallet To View Your Assets" 
    },
    heading() {
      return this.nftRedeemSettings?.redeemHeading
    },
    metaDescription() {
      return (
        this.metaDescriptionFallback
      )
    },
    ownedTokens() {
      return this.$web3?.ownedTokens || []
    },
    nftDisplay() {
      if (!this.ownedTokens && !this.nfts) {
        return null
      }
      return this.nfts?.filter(nft => this.ownedTokens.includes(Number(nft.tokenId)))
    },    
    pageTitle() {
      return this.pageTitleFallback
    },
    openSeaCta() {
      return {
        text: 'View On OpenSea',
        icon: 'opensea',
        link: this.$config.openSeaCollectionUrl
      }
    },
    redemptionModalData(){
      return this.nftRedeemSettings?.redeemLanding
    },
    walletConnected() {
      return this.$web3?.accounts
    }
  },
}
</script>

