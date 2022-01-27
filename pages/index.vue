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
    <section class="py-14">
      <div class="grid grid-cols-12 mb-16 px-4 md:px-10">
        <p class="col-span-full md:col-start-2 md:col-span-4">Section Title</p>
        <p class="col-span-full md:col-start-8 md:col-span-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus odio
          dignissim sagittis hendrerit. Arcu pharetra tellus id eu. In dignissim
          faucibus metus amet. Ipsum proin urna dolor aenean vestibulum quisque
          urna.
        </p>
      </div>
      <Carousel class="test-carousel">
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
$slide-size-wide: clamp(0px, 100%, 1123px);
$slide-size-medium: calc(#{$slide-size-wide} * 0.63846838824577);
$slide-size-thin: calc(#{$slide-size-wide} * 0.36153161175423);

.test-slide {
  position: relative;
  height: 0;
  padding-bottom: $slide-size-medium;
  width: $slide-size-thin;
  &:nth-child(2n) {
    width: $slide-size-medium;
  }
  &:nth-child(3n) {
    width: $slide-size-wide;
  }

  article {
    background: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: absolute;
    text-align: center;
    width: 100%;
  }
}
</style>
