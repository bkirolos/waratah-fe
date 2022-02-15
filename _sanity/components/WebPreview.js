import React from 'react'

const WebPreview = ({ document }) => {
  const baseUrl = 'https://waratah-nuxt.netlify.app'

  const getTargetUrl = document => {
    if (document._type === 'homePage') {
      return baseUrl
    }
    if (document._type === 'faqPage') {
      return baseUrl + '/faq'
    }
    if (document._type === 'privacyPage') {
      return baseUrl + '/privacy-policy'
    }
    if (document._type === 'termsPage') {
      return baseUrl + '/terms-and-conditions'
    }
  }

  const targetUrl = getTargetUrl(document.displayed)

  return (
    <iframe
      src={targetUrl + '?preview=true'}
      frameBorder={0}
      width="100%"
      height="100%"
    />
  )
}

export default WebPreview
