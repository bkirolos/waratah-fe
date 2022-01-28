import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "homePage"] | order(_updatedAt desc) [0] {
    sections[] {
      copy,
      heading,
      slides[] {
        image {
          alt,
          asset
        },
        width
      }
    }
  }
`
