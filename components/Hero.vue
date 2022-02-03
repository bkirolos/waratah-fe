<template>
  <section class="hero bg-green grid grid-cols-12 items-center px-4 md:px-10">
    <div class="hero-content-wrap col-span-full md:col-start-2">
      <h1 class="text-yellow">
        {{ heading }}
      </h1>
      <h2 v-if="subheading" class="font-sans md:text-md">
        {{ subheading }}
      </h2>
      <p v-if="copy" class="mt-2 md:mt-6">
        {{ copy }}
      </p>
      <Hyperlink v-if="cta" :url="ctaLink" class="cta mt-6">
        {{ ctaText }}
      </Hyperlink>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    copy() {
      return `Limited edition NFT and physical shoe designed by Tinker Hatfield,
        Auction taking place July 20, 2022, for athletes by athletes (or other
        concept tying project to the team)`
    },
    cta() {
      return true
    },
    ctaLink() {
      return '/#the-nft'
    },
    ctaText() {
      return 'Learn More'
    },
    heading() {
      return 'Ducks of a Feather'
    },
    subheading() {
      return 'For Athletes By Athletes'
    }
  }
}
</script>

<style lang="scss">
.hero {
  height: 727px;
  position: relative;
  @media (min-width: theme('screens.md')) {
    height: 900px;
  }

  &-content-wrap {
    max-width: 600px;

    h1 {
      @media (max-width: calc(theme('screens.md') - 1px)) {
        font-size: clamp(theme('fontSize.md'), 25vw, theme('fontSize.lg'));
      }
    }
  }
}
</style>
