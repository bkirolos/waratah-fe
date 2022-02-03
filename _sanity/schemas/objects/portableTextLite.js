export default {
  type: 'array',
  name: 'portableTextLite',
  title: 'PortableText',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' }
        ],
        annotations: [
          {
            type: 'link',
            name: 'link',
            title: 'Link'
          }
        ]
      }
    }
  ]
}
