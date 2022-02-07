<template>
  <Hyperlink v-if="cta" :url="ctaLink" class="cta">
    <DiscordIcon v-if="showDiscordIcon" aria-hidden="true" class="mr-2" />
    <TwitterIcon v-if="showTwitterIcon" aria-hidden="true" class="mr-2" />
    {{ ctaText }}
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
