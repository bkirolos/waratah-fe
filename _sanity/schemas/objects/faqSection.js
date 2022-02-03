import { Question } from '../../lib/icons'
import OptionalCTA from '../../components/OptionalCTA'

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
      validation: Rule => Rule.required()
    },
    {
      type: 'cta',
      name: 'cta',
      title: 'CTA',
      inputComponent: OptionalCTA
    },
    {
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }]
        }
      ]
    }
  ]
}
