export default {
  type: 'array',
  name: 'portableText',
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
          // TODO: add support for internal + external links
        ]
      }
    }
  ]
}
