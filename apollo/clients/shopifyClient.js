export default ({ env }) => ({
  httpEndpoint: env.apiEndpoint,
  httpLinkOptions: {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': env.storefrontAccessToken
    }
  }
})
