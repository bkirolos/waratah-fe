export default {
  type: 'object',
  name: 'twoUp',
  title: 'Two Up',
  options: {
    collapsable: true
  },
  fields: [
    {
      type: 'string',
      name: 'heading',
      title: 'Heading',
      validation: Rule => Rule.required().error('Heading is required')
    },
    {
      type: 'portableTextSuite',
      name: 'copy',
      title: 'Copy'
    },
    {
      type: 'imagePlus',
      name: 'image',
      title: 'Image',
      validation: Rule => Rule.required().error('Image is required')
    },
    {
      type: 'string',
      name: 'ctaCopy',
      title: 'CTA Copy',
      validation: Rule => Rule.required().error('CTA Copy is required')
    }
  ]
}
