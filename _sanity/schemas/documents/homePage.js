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
      title: 'Document Name'
    },
    {
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [{ type: 'carouselSection' }]
    },
    {
      type: 'faqSection',
      name: 'faqSection',
      title: 'FAQ Section'
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
