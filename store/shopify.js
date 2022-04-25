import _cloneDeep from 'lodash/cloneDeep'
import _findIndex from 'lodash/findIndex'
import _get from 'lodash/get'
import _sumBy from 'lodash/sumBy'
import Vue from 'vue'
import {
  CheckoutCreate,
  CheckoutReplace
} from '@/apollo/mutations/checkout.gql'
import { CheckoutById } from '@/apollo/queries/checkoutById.gql'
import {
  formatPrice,
  simplifyLineItems,
  stripLineItems
} from '@/utils/shopify.js'

export const state = () => ({
  cart: {
    count: 0,
    lineItems: [],
    subtotal: {}
  },
  checkout: {
    completedAt: null,
    id: '',
    webUrl: ''
  }
})

export const mutations = {
  CLEAR_CHECKOUT(state) {
    Vue.set(state, 'cart', {
      completedAt: null,
      id: '',
      webUrl: ''
    })
    Vue.set(state, 'checkout', {
      completedAt: null,
      id: '',
      webUrl: ''
    })
  },
  SET_CHECKOUT(state, checkout = {}) {
    state.checkout = checkout
    const lineItems = stripLineItems(checkout.lineItems)
    const totalQuantity = _sumBy(lineItems, 'quantity')
    Vue.set(state.cart, 'count', totalQuantity)
    Vue.set(state.cart, 'lineItems', lineItems)
    Vue.set(state.cart, 'subtotal', checkout.subtotalPriceV2)
  }
}

export const actions = {
  async addToCart({ state, dispatch }, { variantId, quantity }) {
    if (!state.checkout.id) {
      await dispatch('createCheckout', { variantId, quantity })
    } else {
      const lineItems = _cloneDeep(state.cart.lineItems)
      const currentVariantIndex = _findIndex(lineItems, obj => {
        return obj.variant.id === variantId
      })

      if (currentVariantIndex !== -1) {
        lineItems[currentVariantIndex].quantity += quantity
      } else {
        lineItems.push({
          variant: { id: variantId },
          quantity
        })
      }

      await dispatch('replaceCheckout', lineItems)
    }
  },

  async createCheckout({ commit }, { variantId, quantity }) {
    const client = this.app.apolloProvider.defaultClient

    const checkout = await client.mutate({
      mutation: CheckoutCreate,
      variables: {
        variantId,
        quantity
      }
    })
    if (checkout) {
      console.log(checkout)
      commit('SET_CHECKOUT', _get(checkout, 'data.checkoutCreate.checkout', {}))
    }
  },

  async decreaseQuantity({ state, dispatch }, { variantId, quantity }) {
    const lineItems = _cloneDeep(state.cart.lineItems)
    const currentVariantIndex = _findIndex(lineItems, obj => {
      return obj.variant.id === variantId
    })
    lineItems[currentVariantIndex].quantity -= quantity

    await dispatch('replaceCheckout', lineItems)
  },

  async getCheckout({ state, commit }) {
    const client = this.app.apolloProvider.defaultClient

    if (state.checkout.completedAt) {
      commit('CLEAR_CHECKOUT')
    } else if (state.checkout.id) {
      const response = await client.query({
        query: CheckoutById,
        variables: {
          checkoutId: state.checkout.id
        }
      })

      const checkout = _get(response, 'data.node', {})

      if (checkout.completedAt) {
        commit('CLEAR_CHECKOUT')
      } else {
        commit('SET_CHECKOUT', checkout)
      }
    } else {
      commit('CLEAR_CHECKOUT')
    }
  },

  async increaseQuantity({ state, dispatch }, { variantId, quantity }) {
    const lineItems = _cloneDeep(state.cart.lineItems)
    const currentVariantIndex = _findIndex(lineItems, obj => {
      return obj.variant.id === variantId
    })
    lineItems[currentVariantIndex].quantity += quantity

    await dispatch('replaceCheckout', lineItems)
  },

  async removeFromCart({ state, dispatch }, variantId) {
    const lineItems = state.cart.lineItems.filter(
      item => item.variant.id !== variantId
    )

    await dispatch('replaceCheckout', lineItems)
  },

  async replaceCheckout({ state, commit }, lineItems = []) {
    const client = this.app.apolloProvider.defaultClient

    lineItems = simplifyLineItems(lineItems)
    lineItems = lineItems.filter(obj => obj.quantity > 0)

    const checkout = await client.mutate({
      mutation: CheckoutReplace,
      variables: {
        checkoutId: state.checkout.id,
        lineItems
      }
    })

    commit(
      'SET_CHECKOUT',
      _get(checkout, 'data.checkoutLineItemsReplace.checkout', {})
    )
  }
}

export const getters = {
  getCartCount: state => state.cart.count,
  getCartItems: state => state.cart.lineItems,
  getCartSubtotal: state => formatPrice(state.cart.subtotal.amount),
  getCheckoutUrl: state => state.checkout.webUrl
}