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
    <section class="px-4 md:px-10 py-14">
      <Carousel class="test-carousel md:container md:mx-auto">
        <Slide v-for="n in 10" :key="n" class="test-slide">
          <article>
            <p>{{ n }}</p>
          </article>
        </Slide>
      </Carousel>
    </section>
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

<style lang="scss">
.test-slide {
  flex-basis: 200px;
  &:nth-child(2n) {
    flex-basis: 400px;
  }
  &:nth-child(3n) {
    flex-basis: 600px;
  }

  article {
    background: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    text-align: center;
  }
}
</style>
