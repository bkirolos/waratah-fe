<template>
  <img
    v-if="src"
    :data-src="src"
    :data-srcset="srcset"
    :src="src"
    :srcset="transparentPixel"
    data-sizes="auto"
    :alt="alt"
    class="lazyload fade-up"
  />
</template>

<script>
import imageBuilder from '@/mixins/imageBuilder'

export default {
  mixins: [imageBuilder],
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  computed: {
    alt() {
      return this.image?.alt || ''
    },
    src() {
      return this.image && this.urlFor(this.image)
    },
    srcset() {
      const widths = [640, 768, 1024, 1366, 1600, 1960]
      return widths.map(width => `${this.src}&w=${width} ${width}w`).join()
    },
    transparentPixel() {
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    }
  }
}
</script>

<style lang="scss">
.fade-up {
  opacity: 0;
}

.fade-up.lazyloaded {
  opacity: 1;
  transition: opacity 750ms ease;
}
</style>
