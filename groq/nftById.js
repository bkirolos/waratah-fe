import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftAsset" && _id == $id] | order(_updatedAt desc) [0] {
    image {
      alt,
      asset,
      "url": asset->url
    },
    shoeSize,
    title,
    "tokenId": _id,
    video {
      poster {
         asset
      },
      url
    }
  }
`
