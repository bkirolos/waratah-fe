import { Page } from '../../lib/icons'

export default {
  type: 'document',
  name: 'termsPage',
  title: 'Terms & Conditions Page',
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
      type: 'portableTextSuite',
      name: 'copy',
      title: 'Copy'
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
