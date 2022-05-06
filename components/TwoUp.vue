<template>
  <section class="grid grid-cols-12 place-items-center w-screen h-max bg-navy">
    <div
      class="grid grid-cols-12 col-span-full xl:col-span-6 py-2 xl:py-2 w-full"
    >
      <div class="col-start-2 col-span-10 xl:col-start-3 xl:col-span-9">
        <h1 class="heading-2 mt-6">
          {{ heading }}
        </h1>
        <PortableText class="content-block" :blocks="copy" />
        <div class="w-full flex pt-6">
          <button
            class="flex flex-1 cta bg-lime border-lime text-navy content-center"
            @click="cta"
          >
            <span class="heading-4 pt-2">{{ ctaText }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="image-wrap col-span-full xl:col-span-6 py-6">
      <image v-if="imageUrl" :src="imageUrl" :alt="imageAlt" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    cta: {
      type: Function,
      default: () => {}
    },
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    twoUp() {
      return this.page?.twoUp
    },
    heading() {
      return this.twoUp?.heading
    },
    copy() {
      return this.twoUp?.copy
    },
    ctaText() {
      return this.twoUp?.ctaCopy
    },
    image() {
      return this.twoUp?.image
    },
    imageAlt() {
      return this.image?.alt
    },
    imageUrl() {
      return this.image?.url
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrap {
  height: 0;
  padding-bottom: 100%;
  position: relative;
  width: 100%;
  img {
    height: 100%;
    object-fit: cover;
    position: absolute;
    width: 100%;
  }
}
</style>
