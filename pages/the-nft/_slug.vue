<template>
  <section class="grid grid-cols-12 px-4 py-20">
    <h1 class="heading-2 md:col-start-2">
      {{ heading }}
    </h1>
  </section>
</template>

<script>
import nftBySlug from '@/groq/nftBySlug'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const params = { slug: String(this.slug) }
    console.log(params)
    const data = await this.$sanity.fetch(nftBySlug, params)
    this.page = data ? data[0] : null
  },
  computed: {
    heading() {
      return this.page?.title || '404'
    },
    slug() {
      return this.$route.params.slug
    }
  }
}
</script>
