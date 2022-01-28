<template>
  <div class="bg-black text-white">
    <h1>{{ pageTitle }}</h1>
    <ConnectWallet />
    <div v-for="(group, i) in faqGroups" :key="i">
      <h2>{{ group.heading }}</h2>
      <div v-for="(faq, ix) in group.faqs" :key="ix">
        <h3>{{ faq.question }}</h3>
        <PortableText :blocks="faq.answer" />
      </div>
    </div>
    <CarouselSection
      v-for="(section, index) in sections"
      :key="index"
      :section="section"
    />
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
        pageTitle,
        sections[] {
          copy,
          heading,
          slides[] {
            image {
              alt,
              asset
            },
            width
          }
        }
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
    },
    sections() {
      return this.page?.sections
    }
  }
}
</script>

<style lang="scss"></style>
