import defaultResolve, {
  DiscardChangesAction,
  PublishAction
} from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
  const singletons = [
    'faqPage',
    'homePage',
    'privacyPage',
    'siteSettings',
    'termsPage'
  ]
  if (singletons.includes(props.type)) {
    return [PublishAction, DiscardChangesAction]
  } else {
    return [...defaultResolve(props)]
  }
}
