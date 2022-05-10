require('dotenv').config()
const gql = require('graphql-tag')
const { ApolloClient } = require('apollo-client')
const { createHttpLink } = require('apollo-link-http')
const { setContext } = require('apollo-link-context')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

export const shopifyGenerate = gql`
  query {
    products(first: 50) {
      edges {
        node {
          handle
        }
        cursor
      }
    }
  }
`

const shopifyHttpLink = createHttpLink({
  uri: process.env.SHOPIFY_API_ENDPOINT,
  fetch
})

const shopifyAuthLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(headers || {}, {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    })
  }
})

export const shopifyApolloClient = new ApolloClient({
  link: shopifyAuthLink.concat(shopifyHttpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
})
