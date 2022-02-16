<template>
  <article class="nft-item text-navy">
    <LazyImage v-if="image" class="w-full" :image="image" />
    <p class="heading-4 text-base">{{ title }}</p>
    <p class="heading-6">Shoe Size {{ shoeSize }}</p>
    <Hyperlink :url="slug" class="text-xs">View Details</Hyperlink>
  </article>
</template>

<script>
export default {
  props: {
    nft: {
      type: Object,
      required: true
    }
  },
  computed: {
    image() {
      return this.nft?.image?.asset ? this.nft.image : null
    },
    shoeSize() {
      return this.nft?.shoeSize
    },
    slug() {
      return `/the-nft/${this.tokenId}`
    },
    title() {
      return this.nft?.title
    },
    tokenId() {
      return this.nft?.tokenId
    }
  }
}
</script>
