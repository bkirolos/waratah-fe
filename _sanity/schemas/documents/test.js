import { Smiley } from '../../lib/icons'

export default {
  type: 'document',
  name: 'test',
  title: 'Test',
  icon: Smiley,
  fields: [
    {
      type: 'string',
      name: 'pageTitle',
      title: 'Page Title'
    },
    {
      type: 'array',
      name: 'faqGroups',
      title: 'FAQ Groups',
      of: [{ type: 'faqGroup' }]
    }
  ]
}
