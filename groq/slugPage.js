import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "slugPage" && slug.current == $slug] | order(_updatedAt desc) [0] {
    sections[] {
      _type == "portableTextSection" => {
        _type,
        content
      }
    }
  }
`
