<template>
  <div class="bg-black text-white grid grid-cols-12 pt-24">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="col-span-full md:col-start-2 md:col-span-10 px-4 md:px-10"
    >
      <PortableText
        v-if="section._type === 'portableTextSection'"
        :blocks="section.content"
      />
    </div>
  </div>
</template>

<script>
import slugPage from '@/groq/slugPage'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const params = { slug: this.$route.params.slug }
    this.page = await this.$sanity.fetch(slugPage, params)
  },
  computed: {
    sections() {
      return this.page?.sections
    }
  }
}
</script>
