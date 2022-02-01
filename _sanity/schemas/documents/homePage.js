import { Page } from '../../lib/icons'

export default {
  type: 'document',
  name: 'homePage',
  title: 'Home Page',
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
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [{ type: 'carouselSection' }]
    },
    {
      type: 'array',
      name: 'faqSection',
      title: 'FAQ Section',
      of: [{ type: 'faqSection' }]
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
