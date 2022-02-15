<template>
  <article class="nft-item text-navy center">
    <div class="nft-thumbail">
      <LazyImage v-if="image" :image="image" />
    </div>
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
<style lang="scss">
$asset-width: clamp(1px, 100%, 260px);
.nft-thumbnail{
  flex-shrink: 0;
  height: 0;
  margin-right: 0.5rem;
  padding-bottom: $asset-width;
  position: relative;
  width: $asset-width;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>
