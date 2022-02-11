<template>
  <section class="grid grid-cols-12 content-start px-4 md:px-10 py-14 w-full">
    <div class="col-span-full md:col-start-2 md:col-span-10">
      <h1 class="heading-2 mb-3 md:mb-10">
        {{ heading }}
      </h1>
      <Accordion
        v-for="(faq, ix) in faqs"
        :key="ix"
        :content="faq.answer"
        :heading="faq.question"
        heading-tag="h2"
        :unique-id="faq._id"
      />
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
