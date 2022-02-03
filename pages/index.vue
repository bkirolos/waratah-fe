<template>
  <div class="bg-black text-white">
    <section class="grid grid-cols-12 px-4 md:px-10 py-20">
      <h1 class="md:col-start-2 md:col-span-10 col-span-12">{{ heading }}</h1>
      <div class="md:col-start-2 md:col-span-10 col-span-12">
        <FaqAccordion v-for="(faq, ix) in faqs" :key="ix" :faq="faq" />
      </div>
    </section>
  </div>
</template>

<script>
import termsPage from '@/groq/termsPage'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    this.page = await this.$sanity.fetch(termsPage)
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
