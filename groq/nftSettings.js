import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "nftSettings"] | order(_updatedAt desc) [0] {
    nftDescription,
    shoeDescription,
    nftCollectionHeading,
    nftCollectionDescription,
    shoeImage {
      alt,
      asset,
      crop
    }
  }
`
