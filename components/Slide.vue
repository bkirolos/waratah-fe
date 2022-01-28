<template>
  <article :class="['carousel-slide', width]">
    <LazyImage :image="image" />
  </article>
</template>

<script>
export default {
  name: 'Slide',
  props: {
    slide: {
      type: Object,
      required: true
    }
  },
  computed: {
    image() {
      return this.slide?.image
    },
    width() {
      return this.slide?.width
    }
  }
}
</script>

<style lang="scss">
$slide-wide: clamp(0px, 100%, 1123px);
$slide-medium: calc(#{$slide-wide} * 0.63846838824577);
$slide-thin: calc(#{$slide-wide} * 0.36153161175423);

.carousel-slide {
  flex-shrink: 0;
  height: 0;
  margin-right: 0.5rem;
  padding-bottom: $slide-medium;
  position: relative;
  width: 100%;

  &.wide {
    width: $slide-wide;
  }

  &.medium {
    width: $slide-medium;
  }

  &.thin {
    width: $slide-thin;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
