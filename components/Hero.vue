<template>
  <section class="hero">
    <LazyImage v-if="mobileImage" :image="mobileImage" class="md:hidden" />
    <LazyImage :image="image" :class="{ 'hidden md:block': mobileImage }" />
    <div class="grid grid-cols-12 items-center h-full px-4 md:px-10">
      <div class="hero-content-wrap col-span-full lg:col-start-2">
        <h1 class="heading-2 text-yellow">
          {{ heading }}
        </h1>
        <h2 v-if="subheading" class="font-sans md:text-md">
          {{ subheading }}
        </h2>
        <PortableText v-if="copy" :blocks="copy" class="mt-2 md:mt-6" />
        <CTA :cta="cta" class="mt-6" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    hero: {
      type: Object,
      required: true
    }
  },
  computed: {
    copy() {
      return this.hero?.copy
    },
    cta() {
      return this.hero?.cta
    },
    heading() {
      return this.hero?.heading
    },
    image() {
      return this.hero?.image
    },
    mobileImage() {
      return this.hero?.mobileImage
    },
    subheading() {
      return this.hero?.subheading
    }
  }
}
</script>

<style lang="scss">
.hero {
  background: theme('colors.green');
  height: calc(727 / 375 * 100vw);
  max-height: 727px;
  min-height: 727px;
  position: relative;
  width: 100vw;
  @media (min-width: theme('screens.md')) {
    height: calc(900 / 1440 * 100vw);
    max-height: 900px;
  }

  img {
    height: 100%;
    object-fit: cover;
    position: absolute;
    width: 100%;
  }

  &-content-wrap {
    max-width: 600px;
    position: relative;

    h1 {
      @media (max-width: calc(theme('screens.md') - 1px)) {
        font-size: clamp(theme('fontSize.md'), 25vw, theme('fontSize.lg'));
      }
    }
  }
}
</style>
