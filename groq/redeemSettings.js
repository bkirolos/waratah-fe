import { groq } from '@nuxtjs/sanity'

export default groq`
  *[_type == "drops" && slug.current == $slug] | order(_updatedAt desc) [0] {
    drop,
    slug {
      current
    },
    redeemSettings {
      redeemLanding {
        heading,
        copy,
        image {
          alt,
          asset,
          "url": asset->url
        },
        ctaCopy
      },
      redeemHeading,
      redeemDescription,
      redeemCountdown {
        startTime,
        endTime,
        beforeText,
        liveText,
        completedText
      }
    }
  }
`
