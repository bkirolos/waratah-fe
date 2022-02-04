<template>
  <Hyperlink :url="url" :class="classes">
    <div v-if="round" class="nav-item-round">
      <slot />
    </div>
    <slot v-else />
  </Hyperlink>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: '/'
    }
  },
  computed: {
    classes() {
      return [
        'nav-item hover-transition',
        { 'font-display text-md': this.large },
        this.round ? 'p-2' : 'p-3'
      ]
    }
  }
}
</script>
