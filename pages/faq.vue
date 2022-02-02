<template>
  <div class="bg-black text-white">
    <FaqSection :section="faqSection" />
  </div>
</template>

<script>
import homePage from '@/groq/homePage'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    this.page = await this.$sanity.fetch(homePage)
  },
  computed: {
    faqSection() {
      return this.page?.faqSection
    }
  }
}
</script>