import T from '@sanity/base/initial-value-template-builder'

export default [
  // include all default initial value templates except for 'Media Tag'
  ...T.defaults().filter(template => template.spec.schemaType !== 'media.tag')
]
