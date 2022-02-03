import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "termsPage"] | order(_updatedAt desc) [0] {
    heading,
    copy
  }
`
