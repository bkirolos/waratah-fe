<template>
  <div>
    <section class="bg-navy grid grid-cols-12 gap-y-6 px-4 py-16 md:px-10">
      <div class="col-span-full md:col-span-5">
        <h1 class="heading-2 mb-6">Ducks are Flying</h1>
        <p>
          Get one of 120 NFTs created by Tinker Hatfield benefitting Universty
          of Oregon Duck Athletes. Each NFT comes with a physical pair of Nike
          Air Max 1 sneakers designed by Tinker himself. Click here for offical
          rules.
        </p>
      </div>
      <div class="col-span-full md:col-start-7 md:col-span-5">
        <Countdown />
        <hr class="my-6" />
        <CurrentPrice />
      </div>
    </section>
    <section class="bg-white grid grid-cols-10 gap-x-4 gap-y-3 p-4 md:p-10">
      <NftThumbnail
        v-for="nft in nfts"
        :key="nft.tokenId"
        class="col-span-full sm:col-span-5 lg:col-span-2"
        :nft="nft"
      />
    </section>
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
    this.nfts = nfts.sort((a, b) => a.tokenId - b.tokenId)
  }
}
</script>
