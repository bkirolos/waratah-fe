export default {
  type: 'array',
  name: 'portableTextSuite',
  title: 'PortableText',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Body', value: 'normal' }
      ],
      lists: [
        { title: 'Bulleted List', value: 'bullet' },
        { title: 'Numbered List', value: 'number' }
      ],
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
