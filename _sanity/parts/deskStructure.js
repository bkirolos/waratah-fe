import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem().schemaType('test').id('test').title('Testin it out')
    ])
