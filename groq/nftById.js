import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftAsset" && _id == $id] | order(_updatedAt desc) [0] {
    _id,
    image {
      alt,
      asset
    },
    shoeSize,
    title,
    video {
      poster {
         asset
      },
      url
    }
  }
`
