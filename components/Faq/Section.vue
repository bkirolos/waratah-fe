<template>
  <section :id="anchorId" class="py-14">
    <div class="grid grid-cols-12 gap-y-4 mb-12 md:mb-16 px-4 md:px-10">
      <div class="md:col-start-2 md:col-span-10 col-span-12">
        <div class="sm:flex justify-between">
          <h2 class="mb-12 md:mb-16">{{ title }}</h2>
          <div>
            <Hyperlink v-if="cta" class="cta" :url="ctaLink">
              {{ ctaText }}
            </Hyperlink>
          </div>
        </div>
        <FaqAccordion v-for="(faq, ix) in faqs" :key="ix" :faq="faq" />
      </div>
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
    anchorId() {
      return 'faq'
    },
    cta() {
      return this.section?.cta
    },
    ctaLink() {
      return this.cta?.link
    },
    ctaText() {
      return this.cta?.text
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
