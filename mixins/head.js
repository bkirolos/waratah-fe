import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      metaDescription: 'metaInfo/description',
      metaImage: 'metaInfo/image',
      pageTitle: 'metaInfo/title',
      pageTitleBase: 'metaInfo/titleBase'
    })
  },
  methods: {
    formatMetaImageUrl(image) {
      if (!image?.url) return null
      return image.url + '?max-w=1200'
    },
    formatMetaDescription(description) {
      return description.length > 175
        ? description.substring(0, 172) + '...'
        : description
    },
    formatPageTitle(title) {
      if (!title) return null
      return [title, this.pageTitleBase].join(' ')
    }
  },
  head() {
    return {
      title: this.formatPageTitle(this.pageTitle),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.formatMetaDescription(this.metaDescription)
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.formatMetaDescription(this.metaDescription)
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.formatMetaImageUrl(this.metaImage)
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.formatMetaImageUrl(this.metaImage)
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: 'en_US'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Ducks of a Feather'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.formatPageTitle(this.pageTitle)
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://ducksofafeather.xyz'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.formatMetaDescription(this.metaDescription)
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.formatMetaImageUrl(this.metaImage)
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.formatPageTitle(this.pageTitle)
        }
      ]
    }
  }
}
