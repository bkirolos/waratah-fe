<template>
  <section class="grid bg-navy grid-cols-12 w-full px-4 py-20 gap-12 gap-y-40">
    <LazyImage
      v-if="image"
      class="md:col-start-4 md:col-span-6"
      :image="image"
    />
    <div class="row-2 md:col-span-6">
      <h1 class="heading-3">{{ title }}</h1>
      <p class="base">SHOE SIZE {{ shoeSize }}</p>
      <p>
        Flying Formations is the first series in the Ducks of a Feather project.
        It is a limited-edition series of 120 one-of-a-kind NFTs created by
        Tinker Hatfield to benefit University of Oregon Duck Athletes. Featuring
        a complementary pair of Air Max 1 UO Edition sneakers designed by
        Tinker. It represents the initial offering from “Ducks of A Feather” by
        Division Street, an ongoing marketing initiative featuring University of
        Oregon athletes. EDITION OF 120
      </p>
    </div>
    <div class="row-2 md:col-span-6">
      <p>Sale Ends When it Ends</p>
      <p>ADD TIMER</p>
      <hr />
      <h5>Current Price</h5>
      <p class="heading-4">{{ price }} ETH</p>
      <button class="cta bg-electric-green" @click="buy">Buy Now</button>
    </div>
  </section>
</template>

<script>
import nftBySlug from '@/groq/nftBySlug'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const params = { slug: String(this.slug) }
    const data = await this.$sanity.fetch(nftBySlug, params)
    this.page = data ? data[0] : null
  },
  computed: {
    title() {
      return this.page?.tokenId.current
        ? `Ducks of a Feather ${this.page?.tokenId.current}`
        : '404'
    },
    image() {
      return this.page?.image?.asset ? this.page.image : null
    },
    price() {
      return '00.0000'
    },
    shoeSize() {
      return this.page?.shoeSize
    },
    slug() {
      return this.$route.params.slug
    }
  },
  methods: {
    buy() {
      this.console('Buying')
    }
  }
}
</script>
