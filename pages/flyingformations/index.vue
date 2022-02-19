<template>
  <div>
    <section
      class="bg-navy grid grid-cols-12 gap-y-10 px-4 py-12 md:px-10 md:py-20"
    >
      <div class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5">
        <h1 class="heading-2">{{ heading }}</h1>
        <PortableText :blocks="description" class="mt-6" />
        <CTA :cta="discordCta" class="bg-lime text-navy mt-6" />
      </div>
      <div
        class="col-span-full md:col-start-2 md:col-span-10 lg:col-span-5 lg:col-start-7"
      >
        <div class="col-span-full md:col-start-7 md:col-span-5">
          <Countdown />
          <hr class="my-6" />
          <CurrentPrice />
        </div>
        <div
          class="md:flex md:flex-wrap md:justify-between md:items-center mt-8 space-y-4 md:space-y-0"
        >
          <p class="heading-4 text-md md:pt-3">{{ minted }} / 120 Sold</p>
          <CTA :cta="openSeaCta" class="text-lime border-lime" />
        </div>
      </div>
    </section>
    <section
      class="bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 p-4 md:p-10"
    >
      <NftThumbnail
        v-for="nft in nfts"
        :key="nft.tokenId"
        class="col-span-1"
        :nft="nft"
      />
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
      nftGeneral: null
    }
  },
  async fetch() {
    const nftGeneral = await this.$sanity.fetch(nftSettings)
    this.nftGeneral = nftGeneral
    const nfts = await this.$sanity.fetch(allNfts)
    this.nfts = nfts.sort((a, b) => a.tokenId - b.tokenId)
  },
  computed: {
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
    heading() {
      return this.nftGeneral?.nftCollectionHeading
    },
    metaDescription() {
      return (
        this.nftGeneral?.metaInfo?.description || this.metaDescriptionFallback
      )
    },
    minted() {
      if (!this.$web3?.ownedTokens?.length) return '-'

      return this.$web3?.ownedTokens?.length
    },
    ownedTokens() {
      return this.$web3?.ownedTokens
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
    }
  }
}
</script>
