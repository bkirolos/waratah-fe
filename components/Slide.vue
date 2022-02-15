<template>
  <article :class="['carousel-slide', width]">
    <LazyImage v-if="image" :image="image" />
    <VideoPlayer v-if="video" :video="video" />
  </article>
</template>

<script>
export default {
  name: 'Slide',
  props: {
    slide: {
      type: Object,
      default: null
    }
  },
  computed: {
    image() {
      return this.slide?.image?.asset ? this.slide.image : null
    },
    video() {
      return this.slide?.video?.url ? this.slide.video : null
    },
    width() {
      return this.slide?.width
    }
  }
}
</script>

<style lang="scss">
$slide-wide: clamp(1px, 100%, 1123px);
$slide-medium: calc(#{$slide-wide} * 0.5625);
$slide-thin: calc(#{$slide-wide} * 0.318515904921938);

.carousel-slide {
  flex-shrink: 0;
  height: 0;
  margin-right: 0.5rem;
  padding-bottom: $slide-medium;
  position: relative;

  &.wide {
    width: $slide-wide;
  }

  &.medium {
    width: $slide-medium;
  }

  &.thin {
    width: $slide-thin;
  }

  img,
  .plyr {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
