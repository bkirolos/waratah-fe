import { Link } from '../../lib/icons'

export default {
  type: 'object',
  name: 'cta',
  title: 'CTA',
  icon: Link,
  fields: [
    {
      type: 'string',
      name: 'text',
      title: 'Text',
      validation: Rule => Rule.required().error('Text is required')
    },
    {
      type: 'url',
      name: 'link',
      title: 'Link',
      description: 'Should start with https://, mailto:, tel:, or /',
      validation: Rule =>
        Rule.required()
          .error('Link is required')
          .uri({
            scheme: ['https', 'http', 'mailto', 'tel'],
            allowRelative: true
          })
          .custom(value => {
            const isRelative = value?.startsWith('/') || value?.startsWith('#')
            const validProtocols = ['https://', 'mailto:', 'tel:']
            const hasValidProtocol = validProtocols.some(protocol =>
              value?.startsWith(protocol)
            )
            const isValid =
              value === undefined || isRelative || hasValidProtocol
            return isValid || 'Link does not match any of the accepted formats'
          })
    },
    {
      type: 'string',
      name: 'icon',
      title: 'Icon',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Discord', value: 'discord' },
          { title: 'Twitter', value: 'twitter' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    }
  ]
}
