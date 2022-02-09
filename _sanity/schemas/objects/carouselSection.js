import { Block } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'
import { bgColors, textColors } from '../../lib/colors'

export default {
  type: 'object',
  name: 'carouselSection',
  title: 'Carousel Section',
  icon: Block,
  fields: [
    {
      type: 'string',
      name: 'anchorId',
      title: 'Anchor ID'
    },
    {
      type: 'string',
      name: 'heading',
      title: 'Heading',
      validation: Rule => Rule.required().error('Heading is required')
    },
    {
      type: 'portableTextLite',
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
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'colorlist',
      description: 'Defaults to white when nothing is selected',
      options: {
        list: bgColors
      }
    },
    {
      title: 'Text Color',
      name: 'textColor',
      type: 'colorlist',
      description: 'Defaults to black when nothing is selected',
      options: {
        list: textColors
      }
    }
  ]
}
