<template>
  <client-only>
    <vue-plyr
      v-if="url"
      ref="plyr"
      v-observe-visibility="observeVisibilityOptions"
      :options="plyrOptions"
    >
      <video
        playsinline
        controls
        :data-poster="poster"
        :autoplay="autoplay"
        :loop="loop"
      >
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
    autopause: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    hideControls: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    video: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      observeVisibilityOptions: {
        callback: this.handleVisibilityChange,
        intersection: {
          threshold: 0.5
        }
      },
      plyrOptions: {}
    }
  },
  computed: {
    player() {
      return this.$refs.plyr.player
    },
    poster() {
      return this.video?.poster && this.urlFor(this.video.poster)
    },
    url() {
      return this.video?.url
    }
  },
  mounted() {
    // option to hide controls and prevent video from playing/pausing on click
    if (this.hideControls) {
      this.plyrOptions = {
        clickToPlay: false,
        controls: []
      }
    }

    // option to prevent video from automatically pausing when scrolling out of view
    if (!this.autopause) {
      this.observeVisibilityOptions = false
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

  .plyr__video-wrapper {
    z-index: -1;
  }

  video {
    object-fit: cover;
  }

  .plyr__poster {
    background-size: cover;
  }
}
</style>
