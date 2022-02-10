<template>
  <section class="grid w-full grid-cols-12 px-4 py-20">
    <h1 class="heading-2 md:col-start-2 col-span-10">The NFT's</h1>
    <div class="md:col-start-2 col-span-10 grid nft-asset-grid">
      <div
        v-for="item in nftList"
        :key="item.tokenId.current"
        class="nft-grid-item"
      >
        <LazyImage v-if="item.image" class="w-full" :image="item.image" />
        <h5>Flying Formation #{{ item.tokenId.current }}</h5>
        <p>Shoe Size {{ item.shoeSize }}</p>
        <nuxt-link :to="`/the-nft/${item.slug.current}`">
          View Details
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import allNfts from '@/groq/allNfts'

export default {
  data() {
    return {
      nftList: null
    }
  },
  async fetch() {
    const data = await this.$sanity.fetch(allNfts)
    this.nftList = data
  }
}
</script>
<style lang="scss">
.nft-asset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
