export default {
  type: 'object',
  name: 'twoUp',
  title: 'Two Up',
  fields: [
    {
      type: 'string',
      name: 'heading',
      title: 'Heading'
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
      title: 'CTA Copy'
    }
  ]
}
