<template>
  <section
    :class="[
      'hero',
      bgColor,
      textColor,
      'grid grid-cols-12 place-items-center w-screen'
    ]"
  >
    <div
      class="grid grid-cols-12 col-span-full xl:col-span-6 py-12 xl:py-16 w-full"
    >
      <div class="col-start-2 col-span-10 xl:col-start-3 xl:col-span-9">
        <p v-if="introduction" class="content-block heading-6">
          {{ introduction }}
        </p>
        <h1 class="heading-2 leading-negative mt-6">{{ heading }}</h1>
        <h2 v-if="subheading" class="content-block heading-5">
          {{ subheading }}
        </h2>
        <LazyImage :image="signatureImage" class="content-block mt-6" />
        <CTA :cta="cta" class="bg-lime border-lime text-black mt-6" />
        <div
          data-widget="m-oauth-connect"
          :data-client-id="manifoldClientId"
          data-app-name="Waratah"
          data-redirect-uri="https://ducksofafeather.xyz/"
          data-network="1"
        ></div>
        <p v-if="closing" class="content-block heading-6 mt-6">
          {{ closing }}
        </p>
      </div>
    </div>
    <div class="hero-image-wrap col-span-full xl:col-span-6">
      <LazyImage :image="image" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    hero: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://connect.manifoldxyz.dev/connect.umd.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://connect.manifoldxyz.dev/connect.css'
        }
      ]
    }
  },
  computed: {
    bgColor() {
      return this.hero?.bgColor ? `bg-${this.hero.bgColor}` : ''
    },
    closing() {
      return this.hero?.closing
    },
    cta() {
      return this.hero?.cta
    },
    heading() {
      return this.hero?.heading
    },
    image() {
      return this.hero?.image
    },
    introduction() {
      return this.hero?.introduction
    },
    manifoldClientId() {
      return process.env.MANIFOLD_CLIENT_ID
    },
    signatureImage() {
      return this.hero?.signatureImage
    },
    subheading() {
      return this.hero?.subheading
    },
    textColor() {
      return this.hero?.textColor ? `text-${this.hero.textColor}` : ''
    }
  }
}
</script>

<style lang="scss">
.hero {
  .content-block {
    max-width: 357px;
    width: 100%;
  }

  .hero-image-wrap {
    height: 100%;
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    img {
      height: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
