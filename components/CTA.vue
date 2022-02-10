<template>
  <Hyperlink
    v-if="cta"
    :url="ctaLink"
    :class="['cta space-x-2', { 'text-base space-x-4': large }]"
  >
    <DiscordIcon v-if="showDiscordIcon" aria-hidden="true" />
    <TwitterIcon v-if="showTwitterIcon" aria-hidden="true" />
    <span>{{ ctaText }}</span>
  </Hyperlink>
</template>

<script>
import DiscordIcon from '@/assets/svg/discord-logo.svg?inline'
import TwitterIcon from '@/assets/svg/twitter-logo.svg?inline'

export default {
  components: {
    DiscordIcon,
    TwitterIcon
  },
  props: {
    cta: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ctaIcon() {
      return this.cta?.icon
    },
    ctaLink() {
      return this.cta?.link
    },
    ctaText() {
      return this.cta?.text
    },
    showDiscordIcon() {
      return this.ctaIcon === 'discord'
    },
    showTwitterIcon() {
      return this.ctaIcon === 'twitter'
    }
  }
}
</script>
