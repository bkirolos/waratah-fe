import { Code } from '../../lib/icons'

export default {
  type: 'object',
  name: 'metaInfo',
  title: 'Meta Info',
  icon: Code,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Page Title',
      description:
        'Portion of page title appearing before Page Title Base (see Site Settings)',
      validation: Rule =>
        Rule.max(50).warning('Optimal length is 50–60 characters or less')
    },
    {
      type: 'text',
      name: 'description',
      title: 'Meta Description',
      description: 'Brief description of page content',
      rows: 3,
      validation: Rule =>
        Rule.max(160).warning('Optimal length is 50–160 characters')
    },
    {
      type: 'image',
      name: 'image',
      title: 'OpenGraph + Twitter Image',
      description:
        'Image displayed when link is shared on social media or via SMS'
    }
  ]
}
