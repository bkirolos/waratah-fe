import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftAsset" && slug.current == $slug] {
    _id,
    tokenId {
      current
    },
    slug {
      current
    },
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
    video {
      poster {
         asset
      },
      url
    },
    shoeSize,
    stripes,
    backgroundColor
  }
`
