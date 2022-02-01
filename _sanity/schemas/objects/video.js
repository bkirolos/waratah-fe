import { Video } from '../../lib/icons'

export default {
  type: 'object',
  name: 'video',
  title: 'Video',
  icon: Video,
  fields: [
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      validation: Rule => Rule.uri()
    },
    {
      type: 'image',
      name: 'poster',
      title: 'Poster'
    }
  ]
}
