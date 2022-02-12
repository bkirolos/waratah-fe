import { groq } from '@nuxtjs/sanity'
import { metaInfo } from '@/groq/abstractions'

export default groq`
  *[_type == "termsPage"] | order(_updatedAt desc) [0] {
    copy,
    heading,
    ${metaInfo}
  }
`
