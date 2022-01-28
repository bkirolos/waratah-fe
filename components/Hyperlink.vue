<template>
  <NuxtLink v-if="internalLink" :to="internalLink">
    <slot />
  </NuxtLink>

  <a
    v-else-if="externalLink"
    :href="externalLink"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>

  <span v-else>
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    externalLink() {
      return this.url?.includes(':') || this.url?.includes('//')
        ? this.url
        : null
    },
    internalLink() {
      return this.url?.startsWith('/') || this.url?.startsWith('#')
        ? this.url
        : null
    }
  }
}
</script>
