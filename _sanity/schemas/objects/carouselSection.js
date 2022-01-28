import { Block } from '../../lib/icons'

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
      type: 'array',
      name: 'slides',
      title: 'Carousel Slides',
      of: [{ type: 'carouselSlide' }]
    }
  ]
}
