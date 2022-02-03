export default {
  type: 'array',
  name: 'portableTextLite',
  title: 'PortableText',
  of: [
    {
      type: 'block',
      styles: [],
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
