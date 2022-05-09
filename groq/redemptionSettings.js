import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "drops"] | order(_updatedAt desc) [0] {
    drop,
    redeemSettings {
      heading,
      copy,
      image {
        alt,
        asset,
        "url": asset->url
      },
      ctaCopy
    }
  }
`
