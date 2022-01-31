import imageUrlBuilder from '@sanity/image-url'

export default {
  computed: {
    builder() {
      return imageUrlBuilder(this.$sanity.config)
    }
  },
  methods: {
    urlFor(source) {
      return this.builder.image(source).auto('format')
    }
  }
}
