import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "siteSettings"] | order(_updatedAt desc) [0] {
    metaInfo {
      description,
      image {
        "url": asset->url
      },
      title,
      titleBase
    }
  }
`
