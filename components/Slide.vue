<template>
  <article :class="['carousel-slide', width]">
    <!-- <LazyImage :image="image" /> -->
    <client-only>
      <vue-plyr>
        <video controls playsinline>
          <!-- TODO: add support for poster image (data-poster) -->
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/319104997/rendition/720p/720p.mp4?loc=external&signature=fb9b84b97b4bbb1d4a6ee87f91054a58288cb755ba75aed313d1829f7a0279c5"
            type="video/mp4"
          />
        </video>
      </vue-plyr>
    </client-only>
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
