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
      type: 'metaInfo',
      name: 'metaInfo',
      title: 'Meta Info'
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
