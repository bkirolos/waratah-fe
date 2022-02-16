import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftAsset"] {
    _id,
    image {
      alt,
      asset
    },
    shoeSize,
    title
  }
`
