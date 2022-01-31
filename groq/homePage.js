import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "homePage"] | order(_updatedAt desc) [0] {
    sections[] {
      copy,
      cta {
        link,
        text
      },
      heading,
      slides[] {
        image {
          alt,
          asset
        },
        video {
          poster {
            asset
          },
          url
        },
        width
      }
    }
  }
`
