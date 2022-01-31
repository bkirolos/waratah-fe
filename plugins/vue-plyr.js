import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'

Vue.use(VuePlyr, {
  plyr: {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'fullscreen'
    ]
  }
})
