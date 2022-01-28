<template>
  <SanityContent v-if="blocks" :blocks="blocks" :serializers="serializers" />
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
