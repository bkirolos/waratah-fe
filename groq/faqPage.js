import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "faqPage"] | order(_updatedAt desc) [0] {
    copy,
    faqs[]-> {
      _id,
      answer,
      question
    },
    heading
  }
`
