<template>
  <section id="faq" :class="[bgColor, textColor, 'py-14']">
    <div class="grid grid-cols-12 gap-y-4 mb-12 md:mb-16 px-4 md:px-10">
      <h2 class="col-span-full md:col-start-2 md:col-span-5">
        {{ heading }}
      </h2>
      <div
        :class="[
          'col-span-full md:col-start-8 md:col-span-4',
          { 'flex md:justify-end items-start': !blocks }
        ]"
      >
        <PortableText :blocks="copy" class="mb-6" />
        <CTA :cta="cta" />
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
      required: true
    }
  },
  computed: {
    bgColor() {
      return this.section?.bgColor ? `bg-${this.section?.bgColor}` : ''
    },
    copy() {
      return this.section?.copy
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
      return this.section?.textColor ? `text-${this.section?.textColor}` : ''
    }
  }
}
</script>
