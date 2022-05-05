export default {
  type: 'object',
  name: 'twoUp',
  title: 'Two Up',
  fields: [
    {
      type: 'portableTextSuite',
      name: 'copy',
      title: 'Copy'
    },
    {
      type: 'imagePlus',
      name: 'image',
      title: 'Image',
      description: 'Image should have a square aspect ratio',
      validation: Rule => Rule.required().error('Image is required')
    }
  ]
}
