import { Block } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'

export default {
  type: 'object',
  name: 'carouselSection',
  title: 'Carousel Section',
  icon: Block,
  fields: [
    {
      type: 'string',
      name: 'heading',
      title: 'Heading',
      validation: Rule => Rule.required().error('Heading is required')
    },
    {
      type: 'portableText',
      name: 'copy',
      title: 'Copy'
    },
    {
      type: 'cta',
      name: 'cta',
      title: 'CTA',
      inputComponent: OptionalCTA
    },
    {
      type: 'array',
      name: 'slides',
      title: 'Carousel Slides',
      of: [{ type: 'carouselSlide' }]
    }
  ]
}
