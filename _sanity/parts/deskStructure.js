import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'
import EyeIcon from 'part:@sanity/base/eye-icon'
import WebPreview from '../components/WebPreview'

export const getDefaultDocumentNode = ({ schemaType }) => {
  const pages = ['faqPage', 'homePage', 'privacyPage', 'termsPage']

  if (pages.includes(schemaType)) {
    return S.document().views([
      S.view.form().icon(EditIcon).title('Edit'),
      S.view.component(WebPreview).title('Preview').icon(EyeIcon)
    ])
  }
}

export default () =>
  S.list()
    .title('Content')
    .showIcons(false)
    .items([
      S.documentListItem().schemaType('siteSettings').id('siteSettings'),
      S.divider(),
      S.documentTypeListItem('drops').title('Drops'),
      S.divider(),
      S.documentListItem().schemaType('homePage').id('homePage'),
      S.documentListItem().schemaType('faqPage').id('faqPage'),
      S.documentListItem().schemaType('termsPage').id('termsPage'),
      S.documentListItem().schemaType('privacyPage').id('privacyPage'),
      S.divider(),
      S.documentTypeListItem('nftAsset').title('NFTs'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs'),
      S.divider(),
      S.documentListItem().schemaType('nftSettings').id('nftSettings')
    ])
