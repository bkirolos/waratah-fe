import { Settings } from '../../lib/icons'

export default {
  type: 'document',
  name: 'siteSettings',
  title: 'Site Settings',
  icon: Settings,
  fields: [
    {
      type: 'string',
      name: 'documentName',
      title: 'Document Name',
      hidden: true,
      readOnly: true
    },
    {
      type: 'object',
      name: 'metaInfo',
      title: 'Default Meta Info',
      fields: [
        {
          type: 'string',
          name: 'titleBase',
          title: 'Page Title Base',
          description: 'Appended to the end of all page titles'
        },
        {
          type: 'string',
          name: 'title',
          title: 'Page Title Fallback',
          description:
            'Default page title used when none is provided for a specific page',
          validation: Rule =>
            Rule.max(50).warning('Optimal length is 50–60 characters or less')
        },
        {
          type: 'text',
          name: 'description',
          title: 'Meta Description Fallback',
          description:
            'Default description used when none is provided for a specific page',
          rows: 3,
          validation: Rule =>
            Rule.max(160).warning('Optimal length is 50–160 characters')
        },
        {
          type: 'image',
          name: 'image',
          title: 'OpenGraph + Twitter Image Fallback',
          description:
            'Default image used when link is shared on social media or via SMS'
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
