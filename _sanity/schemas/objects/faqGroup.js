import { Question } from '../../lib/icons'

export default {
  type: 'object',
  name: 'faqGroup',
  title: 'FAQ Group',
  icon: Question,
  fields: [
    {
      type: 'string',
      name: 'heading',
      title: 'Heading',
      validation: Rule => Rule.required()
    },
    {
      type: 'array',
      name: 'faqs',
      title: 'FAQs',
      of: [{ type: 'faq' }],
      validation: Rule => Rule.min(1).required()
    }
  ]
}
