import { Question } from '../../lib/icons'

export default {
  type: 'document',
  name: 'faq',
  title: 'FAQ',
  icon: Question,
  fields: [
    {
      type: 'string',
      name: 'question',
      title: 'Question'
    },
    {
      type: 'portableText',
      name: 'answer',
      title: 'Answer'
    }
  ]
}