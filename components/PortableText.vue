<template>
  <SanityContent
    v-if="blocks"
    :blocks="blocks"
    :serializers="serializers"
    class="portable-text"
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
.portable-text {
  & > :not(:first-child) {
    margin-top: theme('margin.6');
  }

  a {
    color: theme('colors.yellow');
    font-weight: theme('fontWeight.bold');
  }

  ol {
    color: inherit;
    list-style-position: inside;
    list-style-type: numeric;
  }

  ul {
    color: inherit;
    list-style-position: inside;
    list-style-type: disc;
  }
}
</style>
