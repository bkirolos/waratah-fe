<template>
  <section v-if="section" class="faq-section">
    <h2>{{ title }}</h2>
    <FaqAccordion v-for="(faq, ix) in faqs" :key="ix" :faq="faq" />
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
    faqs() {
      return this.section.faqs
    },
    title() {
      return this.section.title
    }
  }
}
</script>

<style lang="scss">
.faq-section {
  &:not(:first-child) {
    margin-top: 40px;
  }

  .section-title {
    margin-bottom: 16px;
  }
}
</style>
