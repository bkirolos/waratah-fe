import { Question } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'
import { bgColors, textColors } from '../../lib/colors'

export default {
  type: 'object',
  name: 'faqSection',
  title: 'FAQ Section',
  icon: Question,
  fields: [
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
      name: 'faqs',
      title: 'FAQs',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }]
        }
      ]
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
