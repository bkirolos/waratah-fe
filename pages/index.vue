<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <ConnectWallet />
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'

export default {
  name: 'IndexPage',
  data() {
    return {
      page: null,
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
    pageTitle() {
      return this.page?.pageTitle
    },
  },
}
</script>
