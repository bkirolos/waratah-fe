<template>
  <div class="bg-white">
    <div class="grid grid-cols-12 bg-navy min-h-300 py-20 px-10">
      <div class="row-1 md:col-span-5">
        <h1 class="heading-2">Ducks are Flying</h1>
        <p>
          Get one of 120 NFTs created by Tinker Hatfield benefitting Universty
          of Oregon Duck Athletes. Each NFT comes with a physical pair of Nike
          Air Max 1 sneakers designed by Tinker himself. Click here for offical
          rules.
        </p>
      </div>
      <div class="row-1 md:col-span-7">
        <p>Sale Ends when it ends</p>
        <p>Add a countdown clock</p>
        <hr />
        <h5>Current Price</h5>
        <p class="heading-4">{{ price }} ETH</p>
      </div>
    </div>
    <div class="grid px-4 py-20 grid-cols-5 gap-5">
      <NftThumbnail
        v-for="nft in nfts"
        :key="nft._id"
        class="col-span-1"
        :nft="nft"
      />
    </div>
  </div>
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
    this.nfts = nfts.sort((a, b) => a._id - b._id)
  }
}
</script>
