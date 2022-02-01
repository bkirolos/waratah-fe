import { Question } from '../../lib/icons'

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
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'faq' },
          ]
         }
      ]
    }
  ]
}
