import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "faqPage"] | order(_updatedAt desc) [0] {
    heading,
    copy,
    faqs[]-> {
      _type,
      question,
      answer
    }
  }
`
