import { Image } from '../../lib/icons'

export default {
  type: 'image',
  name: 'imagePlus',
  title: 'Image',
  icon: Image,
  fields: [
    {
      type: 'string',
      name: 'alt',
      title: 'Alternative Text',
      options: {
        isHighlighted: true
      },
      validation: Rule =>
        Rule.custom((alt, context) => {
          const { parent } = context
          return parent?.asset && !alt
            ? 'Please add an alternative text description to help with accessibility'
            : true
        }).warning()
    }
  ],
  options: {
    hotspot: true
  }
}
