import { groq } from '@nuxtjs/sanity'
import { metaInfo } from '@/groq/abstractions'

export default groq`
  *[_type == "homePage"] | order(_updatedAt desc) [0] {
    "carouselSections": sections[] {
      anchorId,
      "bgColor": bgColor.class,
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
      },
      "textColor": textColor.class
    },
    emailCaptureSection {
      "bgColor": bgColor.class,
      cta {
        icon,
        link,
        text
      },
      ctaSubheading,
      emailCaptureSubheading,
      heading,
      "textColor": textColor.class
    },
    faqSection {
      "bgColor": bgColor.class,
      cta {
        icon,
        link,
        text
      },
      faqs[]-> {
        _id,
        slug {
          current
        },
        answer,
        question
      },
      heading,
      "textColor": textColor.class
    },
    hero {
      "bgColor": bgColor.class,
      closing,
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
      introduction,
      signatureImage {
        alt,
        asset
      },
      subheading,
      "textColor": textColor.class
    },
    ${metaInfo}
  }
`
