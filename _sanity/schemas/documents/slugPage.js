import { Page } from '../../lib/icons'

export default {
  type: 'document',
  name: 'slugPage',
  title: 'Slug Page',
  icon: Page,
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name'
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description: "Click 'Generate' to auto-generate a slug for this page",
      options: {
        source: 'name'
      },
      validation: Rule => Rule.required().error('Slug is required')
    },
    {
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [{ type: 'portableTextSection' }]
    }
  ],
  preview: {
    select: {
      name: 'name'
    },
    prepare(selection) {
      const { name } = selection
      return {
        title: name
      }
    }
  }
}
