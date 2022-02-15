<template>
  <section class="grid grid-cols-12 content-start px-4 md:px-10 py-14 w-full">
    <div class="col-span-full md:col-start-2 md:col-span-10">
      <h1 class="heading-2 mb-10 md:mb-16">
        {{ heading }}
      </h1>
      <PortableText :blocks="copy" class="terms-content" />
    </div>
  </section>
</template>

<script>
import privacyPage from '@/groq/privacyPage'
import head from '@/mixins/head'

export default {
  mixins: [head],
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    this.page = await this.$sanity.fetch(privacyPage)
  },
  computed: {
    copy() {
      return this.page?.copy
    },
    heading() {
      return this.page?.heading
    }
  }
}
</script>
