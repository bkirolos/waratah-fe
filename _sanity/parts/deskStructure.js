import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .showIcons(false)
    .items([S.documentListItem().schemaType('homePage').id('homePage')])
