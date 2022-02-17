<template>
  <section class="grid grid-cols-1">
    <div class="grid row-1 grid-cols-12 bg-navy py-20">
      <div class="col-start-2 md:col-start-2 col-span-10 md:col-span-5 ">
        <h1 class="heading-2">{{this.heading}}</h1>
        <p class="body my-4 md:my-8 mr-8">
          {{ description }}
        </p>
        <CTA :cta="discordCta" class="bg-lime text-navy mt-4 md:mt-0" />
      </div>
      <div class="col-start-2 col-span-10 md:col-span-5 col-start-2 md:col-start-7 my-auto">
         <p class="base font-bold my-4">
          Sale ends Feburary 10th at 10:00pm PST at 1ETH
        </p>
        <p>ADD TIMER</p>
        <hr class="my-6" />
        <h2 class="heading-5 base font-bold my-2">Current Price</h2>
        <p class="heading-4 font-serif">{{ price }} ETH</p>
        <div class="py-8 md:flex md:flex-row md:justify-between">
          <p class="heading-4 font-serif md:pt-2">{{ minted }} / 120 Minted</p>
          <CTA :cta="openSeaCta" class="text-lime border-lime mt-8 md:mt-0" />
        </div>
      </div>
    </div>
    <div class="grid bg-white row-start-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 py-20 gap-5">
      <NftThumbnail
        v-for="nft in nfts"
        :key="nft.tokenId"
        class="col-span-1"
        :nft="nft"
        :sold="true"
      />
    </div>
  </section>
</template>

<script>
import allNfts from '@/groq/allNfts'
import nftSettings from '@/groq/nftSettings'

export default {
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
      return this.nftGeneral?.nftCollectionDescription || "Get one of 120 NFTs created by Tinker Hatfield benefitting Universty of Oregon Duck Athletes. Each NFT comes with a physical pair of Nik Air Max 1 sneakers designed by Tinker himself. Click here for offical rules."
    },
    heading() {
      return this.nftGeneral?.nftCollectionHeading || 'Ducks are Flying'
    },
    minted() {
      return 0
    },
    openSeaCta() {
      return {
        text: 'View On OpenSea',
        icon: 'opensea',
        link: 'https://opensea.io/assets/'
      }
    },
    price() {
      return this.$web3?.price ? this.$web3.formatPrice(this.$web3?.price) : '-'
    }
  }
}
</script>
