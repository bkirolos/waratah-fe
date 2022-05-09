<template>
  <div class="flex flex-col w-full">
    <section
      class="bg-navy grid grid-cols-12 gap-y-10 px-4 py-12 md:px-10 md:py-20"
    >
      <div class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5">
        <h1 class="heading-2">Redeem</h1>
        <client-only>
          <Countdown live-text="Redemption ends June 30th at 10pm PST" :end-time="1656651600"/>
        </client-only>
      </div>
      <div
        class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5 lg:col-start-7"
      >
        <PortableText :blocks="description" class="mt-6" />
      </div>
    </section>
    <section
      class="bg-white flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-2 py-10 md:p-10"
    >
      <RedeemNftThumbnail
        v-for="nft in nftDisplay"
        :key="nft.tokenId"
        class="col-span-1"
        :nft="nft"
      />
    </section>
    <section>
      {{ errorMessage }}
    </section>
  </div>
</template>

<script>
import allNfts from '@/groq/allNfts'
import nftSettings from '@/groq/nftSettings'
import head from '@/mixins/head'

export default {
  mixins: [head],
  data() {
    return {
      nfts: null,
      nftGeneral: null,
      owned: null,
      nftsOwned: null
    }
  },
  async fetch() {
    const nftGeneral = await this.$sanity.fetch(nftSettings)
    this.nftGeneral = nftGeneral
    const nfts = await this.$sanity.fetch(allNfts)
    this.nfts = nfts.sort((a, b) => a.tokenId - b.tokenId)
  },
  computed: {
    currentAccount() {
      return this.$web3?.accounts?.[0]
    },
    displayAccount () {
      return this.currentAccount?.slice(0, 4)
    },
    discordCta() {
      return {
        text: 'Join The Discord',
        icon: 'discord',
        link: 'https://discord.gg/DzJHVXJM'
      }
    },
    description() {
      return this.nftGeneral?.nftCollectionDescription
    },
    errorMessage() {
      return this.walletConnected 
      ? this.nftDisplay 
        ? null 
        : "Looks like you dont own any assets"
      : "Please Connect Your Wallet" 
    },
    heading() {
      return this.nftGeneral?.nftCollectionHeading
    },
    metaDescription() {
      return (
        this.nftGeneral?.metaInfo?.description || this.metaDescriptionFallback
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
      return this.nftGeneral?.metaInfo?.title || this.pageTitleFallback
    },
    openSeaCta() {
      return {
        text: 'View On OpenSea',
        icon: 'opensea',
        link: this.$config.openSeaCollectionUrl
      }
    },
    walletConnected() {
      return this.$web3?.accounts
    }
  },
}
</script>