import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .showIcons(false)
    .items([
      S.documentListItem().schemaType('homePage').id('homePage'),
      S.documentListItem().schemaType('faqPage').id('faqPage'),
      S.documentListItem().schemaType('termsConditions').id('termsConditions'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs')
    ])
