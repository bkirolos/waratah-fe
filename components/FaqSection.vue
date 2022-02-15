<template>
  <section id="faq" :class="[bgColor, 'text-white py-14']">
    <div class="grid grid-cols-12 px-4 md:px-10">
      <div
        class="col-span-full md:col-start-2 md:col-span-10 md:flex md:flex-wrap md:justify-between md:items-start mb-5 md:mb-9"
      >
        <h2 :class="[textColor, 'md:mr-16 md:max-w-heading']">{{ heading }}</h2>
        <CTA :cta="cta" class="mt-4 md:mt-0" />
      </div>
      <div class="col-span-full md:col-start-2 md:col-span-10 mt-3 md:mt-1">
        <Accordion
          v-for="(faq, ix) in faqs"
          :key="ix"
          :content="faq.answer"
          :heading="faq.question"
          :unique-id="faq._id"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      default: null
    }
  },
  computed: {
    bgColor() {
      return this.section?.bgColor ? `bg-${this.section.bgColor}` : ''
    },
    cta() {
      return this.section?.cta
    },
    faqs() {
      return this.section?.faqs
    },
    heading() {
      return this.section?.heading
    },
    textColor() {
      return this.section?.textColor ? `text-${this.section.textColor}` : ''
    }
  }
}
</script>
