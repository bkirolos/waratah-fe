import { Page } from '../../lib/icons'

export default {
  type: 'document',
  name: 'faqPage',
  title: 'FAQ Page',
  icon: Page,
  fields: [
    {
      type: 'string',
      name: 'documentName',
      title: 'Document Name',
      hidden: true,
      readOnly: true
    },
    {
      type: 'string',
      name: 'heading',
      title: 'Heading'
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
  ],
  preview: {
    select: {
      documentName: 'documentName'
    },
    prepare(selection) {
      const { documentName } = selection
      return {
        title: documentName
      }
    }
  }
}