import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "homePage"] | order(_updatedAt desc) [0] {
    hero {
      copy,
      cta {
        icon,
        link,
        text
      },
      heading,
      image {
        alt,
        asset,
        crop
      },
      mobileImage {
        alt,
        asset,
        crop
      },
      subheading
    },
    sections[] {
      anchorId,
      copy,
      cta {
        icon,
        link,
        text
      },
      heading,
      slides[] {
        image {
          alt,
          asset,
          crop
        },
        video {
          poster {
            asset
          },
          url
        },
        width
      }
    },
    faqSection {
      heading,
      cta {
        icon,
        link,
        text
      },
      faqs[]-> {
        _id,
        _type,
        question,
        answer
      }
    }
  }
`
