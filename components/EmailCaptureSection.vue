<template>
  <section :class="[bgColor, textColor, 'py-14']">
    <div class="grid grid-cols-12 md:gap-x-12 px-4 md:px-10">
      <h2
        class="col-span-full md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-5 mb-12 md:mb-16"
      >
        {{ heading }}
      </h2>
      <div
        class="col-span-full md:col-start-2 md-col-span-10 lg:col-start-2 lg:col-span-4 mb-12 lg:mb-0"
      >
        <h3 v-if="ctaSubheading" class="input-label">
          {{ ctaSubheading }}
        </h3>
        <CTA :cta="cta" class="bg-blue border-blue text-white text-base" />
      </div>
      <EmailCapture
        :heading="emailCaptureSubheading"
        class="col-span-full md:col-start-2 md:col-span-10 lg:col-start-6 lg:col-span-6"
      />
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
    ctaSubheading() {
      return this.section?.ctaSubheading
    },
    emailCaptureSubheading() {
      return this.section?.emailCaptureSubheading
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
