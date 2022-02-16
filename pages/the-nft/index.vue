<template>
  <section class="grid grid-cols-1">
    <div class="grid row-1 grid-cols-12 bg-navy py-20">
      <div class="col-span-12 md:col-span-5">
        <h1 class="heading-2">{{this.heading}}</h1>
        <p class="body">
          {{ description }}
        </p>
      </div>
      <div class="col-span-12 md:col-span-7">
         <p class="base font-bold my-4">
          Sale ends Feburary 24th at 11:45pm PST at 1ETH
        </p>
        <p>ADD TIMER</p>
        <hr class="my-6" />
        <h2 class="heading-5 base font-bold my-2">Current Price</h2>
        <p class="heading-4 font-serif">{{ price }} ETH</p>
      </div>
    </div>
    <div class="grid bg-white row-start-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-4 py-20 gap-5">
      <NftThumbnail
        v-for="nft in nfts"
        :key="nft.tokenId"
        class="col-span-1"
        :nft="nft"
      />
    </div>
  </section>
</template>

<script>
import allNfts from '@/groq/allNfts'

export default {
  data() {
    return {
      nfts: null
    }
  },
  async fetch() {
    const nfts = await this.$sanity.fetch(allNfts)
    this.nfts = nfts.sort((a, b) => a.tokenId - b.tokenId)
  },
  computed: {
     heading() {
      return 'Ducks are Flying'
    },
    description() {
      return "Get one of 120 NFTs created by Tinker Hatfield benefitting Universty of Oregon Duck Athletes. Each NFT comes with a physical pair of Nik Air Max 1 sneakers designed by Tinker himself. Click here for offical rules."
    },
    price() {
      return this.$web3?.price ? this.$web3.formatPrice(this.$web3?.price) : '-'
    }
  }
}
</script>
