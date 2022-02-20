import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftAsset"] {
    image {
      alt,
      asset
    },
    shoeSize,
    title,
    "tokenId": _id,
  }
`
