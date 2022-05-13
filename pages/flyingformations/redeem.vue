<template>
  <div class="relative bg-white">
    <transition name="landing">
      <AssetRedemptionModal
        v-if="showRedemptionModal"
        class="transition-opacity ease-out duration-2000 absolute"
        :redemption-modal="redemptionModalData"
      />
    </transition>
    

    <transition name="landing">
      <div v-if="!showRedemptionModal">
        <div class="flex flex-col w-full bg-white">
          <section
            class="bg-navy grid grid-cols-12 gap-y-10 px-4 py-12 md:px-10 md:py-20"
          >
            <div
              class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5"
            >
              <h1 class="heading-2">{{ heading }}</h1>
              <client-only>
                <Countdown
                  :live-text="countdownLiveText"
                  :end-time="countdownEndTime"
                  class="py-4"
                />
              </client-only>
            </div>
            <div
              class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5 lg:col-start-7"
            >
              <PortableText :blocks="description" />
            </div>
          </section>
          <div class="py-10 md:p-10">
          <transition name="landing">

            <section
              v-if="!walletConnected"
              class="flex w-full justify-center"
            >
              <div class="heading-4 text-navy text-center max-w-2xl px-2">  
                <p class="my-8">Looks like there is no wallet connected</p>
                <p class="my-8">Please connect your wallet using the "connect wallet" button in the top navigation.</p>
              </div>
            </section>
            </transition>
            <transition name="landing">

            <section
              v-if="walletConnected"
              class="bg-white flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-2"
            >
              <RedeemNftThumbnail
                v-for="nft in nftDisplay"
                :key="nft.tokenId"
                class="col-span-1"
                :nft="nft"
              />
            </section>
            </transition>
            <transition name="landing">
              <section
                v-if="walletConnected && !hasAssets"
                class="flex w-full justify-center"
              >
                <div class="heading-4 text-navy text-center max-w-4xl px-2">
                  <p class="my-8">
                    Looks like you don't own a Flying Formations NFT in the connected wallet. Please make sure you have connected
                    the correct wallet.
                  </p>
                  <p class="my-8">
                    If you don’t own an NFT but really want the shoes, you can
                    buy one on Opensea.
                  </p>
                  <p class="my-8">
                    PLEASE NOTE: make sure the nft you purchase has the AIRMAX1:
                    AVAILABLE TRAIT
                  </p>
                  <CTA
                    :cta="openSeaCta"
                    class="text-navy bg-lime cursor-pointer w-full md:w-3/6 text-base"
                  />
                </div>
              </section>
            </transition>
          </div>
        </div>
      </div>
    </transition>
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
    hasAssets(){
      return this.$web3.accountTokenCount ? this.$web3.accountTokenCount?._hex !== "0x00" : null
    },
    heading() {
      return this.nftRedeemSettings?.redeemHeading
    },
    metaDescription() {
      return this.metaDescriptionFallback
    },
    ownedTokens() {
      return this.$web3?.ownedTokens || []
    },
    nftDisplay() {
      if (!this.ownedTokens && !this.nfts) {
        return null
      }
      return this.nfts?.filter(nft =>
        this.ownedTokens.includes(Number(nft.tokenId))
      )
    },
    pageTitle() {
      return this.pageTitleFallback
    },
    openSeaCta() {
      return {
        text: 'View On OpenSea',
        link: this.$config.openSeaCollectionUrl
      }
    },
    redemptionModalData() {
      return this.nftRedeemSettings?.redeemLanding
    },
    walletConnected() {
      return this.$web3?.accounts
    }
  }
}
</script>

<style lang="scss">
.landing-enter-active,
.landing-leave-active {
  transition: opacity 0.75s;
}

.landing-enter,
.landing-leave-to {
  opacity: 0;
}
</style>
