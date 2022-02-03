<template>
    <section class="grid grid-cols-12 px-4 py-20">
      <h1 class="heading-2 md:col-start-2">
        {{ heading }}
      </h1>
      <div class="md:col-start-2 md:col-span-10 col-span-12">
        <FaqAccordion v-for="(faq, ix) in faqs" :key="ix" :faq="faq" />
      </div>
    </section>
</template>

<script>
import faqPage from '@/groq/faqPage'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    this.page = await this.$sanity.fetch(faqPage)
  },
  computed: {
    faqs() {
      return this.page?.faqs
    },
    heading() {
      return this.page?.heading
    }
  }
}
</script>
