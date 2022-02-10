import { Block } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'
import { bgColors, textColors } from '../../lib/colors'

export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  icon: Block,
  fields: [
    {
      type: 'string',
      name: 'introduction',
      title: 'Introduction'
    },
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
      type: 'imagePlus',
      name: 'signatureImage',
      title: 'Signature Image'
    },
    {
      type: 'cta',
      name: 'cta',
      title: 'CTA',
      inputComponent: OptionalCTA
    },
    {
      type: 'string',
      name: 'closing',
      title: 'Closing'
    },
    {
      type: 'imagePlus',
      name: 'image',
      title: 'Image',
      validation: Rule => Rule.required().error('Image is required')
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
