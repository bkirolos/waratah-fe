import defaultResolve, {
  DiscardChangesAction,
  PublishAction
} from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
  const singletons = [
    'faqPage',
    'homePage',
    'nftSettings',
    'privacyPage',
    'siteSettings',
    'termsPage'
  ]
  const isSingleton = singletons.includes(props.type)
  const isNftAsset = props.type === 'nftAsset'
  if (isSingleton || isNftAsset) {
    return [PublishAction, DiscardChangesAction]
  } else {
    return [...defaultResolve(props)]
  }
}
