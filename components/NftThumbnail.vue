<template>
  <article class="nft-item text-navy center">
    <div class="nft-thumbail">
      <LazyImage v-if="image" class="w-full" :image="image" />
    </div>
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
