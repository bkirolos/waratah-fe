import { Question } from '../../lib/icons'

export default {
  type: 'document',
  name: 'faq',
  title: 'FAQ',
  icon: Question,
  fields: [
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'question',
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        validation: Rule => Rule.required()
      }
    },
    {
      type: 'string',
      name: 'question',
      title: 'Question'
    },
    {
      type: 'portableTextSuite',
      name: 'answer',
      title: 'Answer'
    }
  ]
}
