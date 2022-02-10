<template>
  <article class="nft-item text-navy">
    <LazyImage v-if="image" class="w-full" :image="image" />
    <h5>{{ title }}</h5>
    <p>Shoe Size {{ shoeSize }}</p>
    <nuxt-link :to="`${slug}`">View Details</nuxt-link>
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
    title() {
      return this.nft?.tokenId.current
        ? `Ducks of a Feather ${this.nft?.tokenId.current}`
        : '404'
    },
    image() {
      return this.nft?.image?.asset ? this.nft.image : null
    },
    shoeSize() {
      return this.nft?.shoeSize
    },
    slug() {
      return this.nft?.slug.current
        ? `/the-nft/${this.nft?.slug.current}`
        : null
    }
  }
}
</script>
