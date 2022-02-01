<template>
  <article :class="['carousel-slide', width]">
    <!-- <LazyImage :image="image" /> -->
    <VideoPlayer
      src="https://player.vimeo.com/progressive_redirect/playback/220494102/rendition/480p/480p.mp4?loc=external&signature=4427b747d05bdfb8b36c69aa21fdbd69fe89e5fb054e75f8fe0bad9ac8e240e8"
    />
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
$slide-wide: clamp(1px, 100%, 1123px);
$slide-medium: calc(#{$slide-wide} * 0.63846838824577);
$slide-thin: calc(#{$slide-wide} * 0.36153161175423);

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
