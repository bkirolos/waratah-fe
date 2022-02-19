<template>
  <div class="grid grid-cols-1 w-full">
    <section>
      <div class="grid row-1 grid-cols-12 bg-navy py-12 md:py-20">
        <div class="col-start-2 md:col-start-2 col-span-10 md:col-span-5 mr-12">
          <h1 class="heading-2">{{ heading }}</h1>
          <p class="body my-4 md:my-8">
            {{ description }}
          </p>
          <CTA :cta="discordCta" class="bg-lime text-navy my-4" />
        </div>
        <div
          class="col-start-2 col-span-10 md:col-span-5 col-start-2 md:col-start-7 my-auto"
        >
          <div class="col-span-full md:col-start-7 md:col-span-5">
            <Countdown />
            <hr class="my-6" />
            <CurrentPrice />
          </div>
          <div class="my-2 md:flex md:flex-row md:justify-between flex-wrap">
            <p class="heading-4 font-serif py-4 pr-4">
              {{ minted }} / 120 Minted
            </p>
            <CTA :cta="openSeaCta" class="text-lime border-lime" />
          </div>
        </div>
      </div>
    </section>
    <section
      class="grid bg-white row-start-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 px-4 py-20"
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
      if (this.$web3?.ownedTokens) {
        return this.$web3?.ownedTokens?.length
      }
      return '-'
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
