<template>
  <Hyperlink :url="slug" :aria-label="`View details of nft ${title}`">
    <article class="nft-item text-navy center border border-stroke-gray pb-4">
      <div class="nft-thumbnail pb-4">
        <div
          v-if="sold"
          class="small-cta absolute z-10 border text-navy bg-electric-green font-semibold right-2 top-2"
        >
          SOLD
        </div>
        <LazyImage v-if="image" :image="image" />
      </div>
      <div class="mt-4 ml-4">
        <p class="heading-4 text-base my-1">{{ title }}</p>
        <p class="heading-6">Shoe Size {{ shoeSize }}</p>
        <Hyperlink :url="slug" class="small-cta text-navy bg-stroke-gray mt-6">
          View Details
        </Hyperlink>
      </div>
    </article>
  </Hyperlink>
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
      return `/flyingformations/${this.tokenId}`
    },
    sold() {
      if (this.$web3?.ownedTokens) {
        return this.$web3.ownedTokens.includes(this.tokenId)
      }
      return false
    },
    title() {
      return this.nft?.title
    },
    tokenId() {
      return Number(this.nft?.tokenId)
    }
  }
}
</script>
<style lang="scss">
$asset-width: clamp(1px, 100%, 600px);
.nft-thumbnail {
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
