<template>
  <section class="py-14">
    <div class="grid grid-cols-12 gap-y-4 mb-12 md:mb-16 px-4 md:px-10">
      <h2 class="col-span-full md:col-start-2 md:col-span-5">
        {{ heading }}
      </h2>
      <PortableText
        :blocks="copy"
        class="col-span-full md:col-start-8 md:col-span-4"
      />
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
    copy() {
      return this.section?.copy
    },
    heading() {
      return this.section?.heading
    },
    slides() {
      return this.section?.slides
    }
  }
}
</script>

<style lang="scss"></style>
