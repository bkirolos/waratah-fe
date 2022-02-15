import { groq } from '@nuxtjs/sanity'
import { metaInfo } from '@/groq/abstractions'

export default groq`
  *[_type == "faqPage"] | order(_updatedAt desc) [0] {
    copy,
    faqs[]-> {
      _id,
      answer,
      question
    },
    heading,
    ${metaInfo}
  }
`
