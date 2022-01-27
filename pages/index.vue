<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <ConnectWallet />
    <div v-for="(group, i) in faqGroups" :key="i">
      <h2>{{ group.heading }}</h2>
      <div v-for="(faq, ix) in group.faqs" :key="ix">
        <h3>{{ faq.question }}</h3>
        <PortableText :blocks="faq.answer" />
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const query = groq`
      *[_type == "test"] | order(_updatedAt desc) [0] {
        _id,
        faqGroups[] {
          heading,
          faqs[] {
            question,
            answer
          }
        },
        pageTitle
      }
    `
    this.page = await this.$sanity.fetch(query)
  },
  computed: {
    faqGroups() {
      return this.page?.faqGroups
    },
    pageTitle() {
      return this.page?.pageTitle
    }
  }
}
</script>
