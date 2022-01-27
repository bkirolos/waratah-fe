import { Link } from '../../lib/icons'

export default {
  type: 'object',
  name: 'link',
  title: 'Link',
  icon: Link,
  fields: [
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      description: 'Should start with https://, mailto:, tel:, or /',
      validation: Rule =>
        Rule.uri({
          scheme: ['https', 'http', 'mailto', 'tel'],
          allowRelative: true
        }).custom(value => {
          const isRelative = value?.startsWith('/') || value?.startsWith('#')
          const validProtocols = ['https://', 'mailto:', 'tel:']
          const hasValidProtocol = validProtocols.some(protocol =>
            value?.startsWith(protocol)
          )
          const isValid = value === undefined || isRelative || hasValidProtocol
          return isValid || 'URL does not match any of the accepted formats'
        })
    }
  ]
}
