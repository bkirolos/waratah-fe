import { string } from 'prop-types'
import { Block } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'
import { bgColors, textColors } from '../../lib/colors'

export default {
  type: 'object',
  name: 'emailCaptureSection',
  title: 'Email Capture Section',
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
      name: 'ctaSubheading',
      title: 'CTA Subheading'
    },
    {
      type: 'cta',
      name: 'cta',
      title: 'CTA',
      inputComponent: OptionalCTA
    },
    {
      type: 'string',
      name: 'emailCaptureSubheading',
      title: 'Email Capture Subheading'
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
