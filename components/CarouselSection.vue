<template>
  <section :id="anchorId" :class="[bgColor, textColor, 'py-14']">
    <div class="grid grid-cols-12 gap-y-4 mb-12 md:mb-16 px-4 md:px-10">
      <h2 class="col-span-full md:col-start-2 md:col-span-5">
        {{ heading }}
      </h2>
      <div class="col-span-full md:col-start-8 md:col-span-4">
        <PortableText :blocks="copy" />
        <CTA if="cta" :cta="cta" class="mt-6" />
      </div>
    </div>
    <Carousel :slides="slides" />
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
      return this.section?.anchorId
    },
    bgColor() {
      return this.section?.bgColor ? `bg-${this.section.bgColor}` : ''
    },
    copy() {
      return this.section?.copy
    },
    cta() {
      return this.section?.ctas
    },
    heading() {
      return this.section?.heading
    },
    slides() {
      return this.section?.slides
    },
    textColor() {
      return this.section?.textColor ? `text-${this.section.textColor}` : ''
    }
  }
}
</script>

<style lang="scss"></style>
