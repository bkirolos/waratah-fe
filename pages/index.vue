<template>
  <div class="bg-white text-navy">
    <Hero :hero="hero" />
    <CarouselSection
      v-for="(section, index) in sections"
      :key="index"
      :section="section"
    />
    <EmailCaptureSection :section="emailCaptureSection" />
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
    emailCaptureSection() {
      return this.page?.emailCaptureSection
    },
    faqSection() {
      return this.page?.faqSection
    },
    hero() {
      return this.page?.hero
    },
    sections() {
      return this.page?.sections
    }
  }
}
</script>
