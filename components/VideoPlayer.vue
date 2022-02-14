<template>
  <!-- TODO: add support for options prop? -->
  <client-only>
    <vue-plyr v-if="url" ref="plyr" v-observe-visibility="options">
      <video controls playsinline :data-poster="poster">
        <source :src="url" type="video/mp4" />
      </video>
    </vue-plyr>
  </client-only>
</template>

<script>
import imageBuilder from '@/mixins/imageBuilder'

export default {
  mixins: [imageBuilder],
  props: {
    video: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: {
        callback: this.handleVisibilityChange,
        intersection: {
          threshold: 0.5
        }
      }
    }
  },
  computed: {
    player() {
      return this.$refs.plyr.player
    },
    poster() {
      return this.urlFor(this.video?.poster)
    },
    url() {
      return this.video?.url
    }
  },
  methods: {
    handleVisibilityChange(isVisible) {
      const isPlaying = this.player.playing
      if (!isVisible && isPlaying) {
        this.player.pause()
      }
    }
  }
}
</script>

<style lang="scss">
.plyr {
  --plyr-color-main: theme('colors.white');
  --plyr-video-control-background-hover: transparent;
  @media (max-width: calc(theme('screens.sm') - 1px)) {
    --plyr-control-icon-size: 14px;
  }

  // hide controls row / only show large play button when paused
  &.plyr--paused {
    .plyr__controls {
      opacity: 0;
    }
  }

  // custom styles for large play button
  .plyr__control--overlaid {
    --plyr-control-spacing: 9px;
    --plyr-video-control-background-hover: theme('colors.white');
    --plyr-video-control-color: theme('colors.black');
    --plyr-video-control-color-hover: theme('colors.black');
    opacity: 1;
    @media (min-width: theme('screens.sm')) {
      --plyr-control-spacing: 19px;
    }
  }

  video {
    object-fit: cover;
  }

  .plyr__video-wrapper {
    z-index: -1;
  }

  .plyr__poster {
    background-size: cover;
  }
}
</style>
