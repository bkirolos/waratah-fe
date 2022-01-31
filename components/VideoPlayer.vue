<template>
  <!-- TODO: add support for options prop? -->
  <client-only>
    <vue-plyr v-if="src" ref="plyr" v-observe-visibility="options">
      <video controls playsinline>
        <!-- TODO: add support for poster image (data-poster) -->
        <source :src="src" type="video/mp4" />
      </video>
    </vue-plyr>
  </client-only>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
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
  @media (max-width: theme('screens.sm')) {
    --plyr-control-icon-size: 14px;
  }

  .plyr__control--overlaid {
    --plyr-control-spacing: 9px;
    --plyr-video-control-background-hover: theme('colors.white');
    --plyr-video-control-color: theme('colors.black');
    --plyr-video-control-color-hover: theme('colors.black');
    @media (min-width: theme('screens.sm')) {
      --plyr-control-spacing: 19px;
    }
  }

  video {
    object-fit: cover;
  }
}
</style>
