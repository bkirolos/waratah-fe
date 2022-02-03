import { Block } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'

export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  icon: Block,
  fields: [
    {
      type: 'string',
      name: 'heading',
      title: 'Heading',
      validation: Rule => Rule.required().error('Heading is required')
    },
    {
      type: 'string',
      name: 'subheading',
      title: 'Subeading'
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
      type: 'imagePlus',
      name: 'image',
      title: 'Image',
      description: 'Aspect ratio: ~16:10',
      validation: Rule => Rule.required().error('Image is required')
    },
    {
      type: 'imagePlus',
      name: 'mobileImage',
      title: 'Mobile Image',
      description: 'Aspect ratio: ~2:1'
    }
  ]
}
