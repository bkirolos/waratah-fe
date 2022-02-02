<template>
  <div class="bg-black text-white">
    <h1 class="text-yellow">DUCKS OF A FEATHER</h1>
    <CarouselSection
      v-for="(section, index) in sections"
      :key="index"
      :section="section"
    />
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
    sections() {
      return this.page?.sections
    }
  }
}
</script>
