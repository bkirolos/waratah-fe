import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftAsset"] {
    _id,
    slug {
      current
    },
    nftId,
    title,
    shoeSize,
    image {
      alt,
      asset-> {
        _id,
        altText,
        metadata {
          dimensions {
            height,
            width
          }
        }
      }
    },
    description,
  }
`