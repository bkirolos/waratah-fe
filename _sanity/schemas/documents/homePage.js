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
      type: 'hero',
      name: 'hero',
      title: 'Hero'
    },
    {
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [{ type: 'carouselSection' }]
    },
    {
      type: 'emailCaptureSection',
      name: 'emailCaptureSection',
      title: 'Email Capture Section'
    },
    {
      type: 'faqSection',
      name: 'faqSection',
      title: 'FAQ Section'
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
