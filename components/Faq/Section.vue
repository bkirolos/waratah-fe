<template>
  <section v-if="section" class="grid grid-cols-12 px-4 md:px-10 py-40">
    <div class="md:col-start-2 md:col-span-10 col-span-12">
      <div class="sm:flex justify-between">
        <h2 class="mb-12 md:mb-16">{{ title }}</h2>
        <div>
          <nuxt-link v-if="cta" class="cta" :to="cta.link">
            {{ cta.text }}
          </nuxt-link>
        </div>
      </div>
      <FaqAccordion v-for="(faq, ix) in faqs" :key="ix" :faq="faq" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    cta() {
      return this.section?.cta
    },
    faqs() {
      return this.section?.faqs
    },
    title() {
      return this.section?.heading
    }
  }
}
</script>
