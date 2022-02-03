<template>
  <SanityContent
    v-if="blocks"
    :blocks="blocks"
    :serializers="serializers"
    class="rich-text"
  />
</template>

<script>
import Hyperlink from '@/components/Hyperlink'

export default {
  props: {
    blocks: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      serializers: {
        marks: {
          link: Hyperlink
        }
      }
    }
  }
}
</script>

<style lang="scss">
.rich-text {
  ul {
    list-style-type: disc;
    list-style-position: inside;
    color: inherit;
  }
  ol {
    list-style-type: numeric;
    list-style-position: inside;
    color: inherit;
  }
}
</style>
