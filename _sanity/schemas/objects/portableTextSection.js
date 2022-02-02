import { Block } from '../../lib/icons'

export default {
  type: 'object',
  name: 'portableTextSection',
  title: 'PortableText Section',
  icon: Block,
  fields: [
    {
      type: 'string',
      name: 'internalName',
      title: 'Internal Name'
    },
    {
      type: 'portableTextSuite',
      name: 'content',
      title: 'Content'
    }
  ]
}
