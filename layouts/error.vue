<template>
  <section
    class="flex flex-col justify-center items-center px-4 md:px-10 py-14 text-center w-full"
  >
    <h1 class="heading-2 text-xl">
      {{ heading }}
    </h1>
    <h2 class="heading-5 text-base">
      {{ subheading }}
    </h2>
    <CTA
      :cta="cta"
      class="bg-lime border-lime text-black mt-6 px-12 normal-case"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import siteSettings from '@/groq/siteSettings'
import head from '@/mixins/head'

export default {
  mixins: [head],
  async fetch() {
    const settings = await this.$sanity.fetch(siteSettings)
    const { metaInfo } = settings
    this.setMetaInfo(metaInfo)
  },
  computed: {
    cta() {
      return {
        icon: 'none',
        link: '/',
        text: 'Back To Home'
      }
    },
    heading() {
      return '404'
    },
    pageTitle() {
      return this.heading
    },
    subheading() {
      return "We can't find the page you are looking for"
    }
  },
  methods: {
    ...mapActions({
      setMetaInfo: 'metaInfo/setMetaInfo'
    })
  }
}
</script>
