export const state = () => ({
  accounts: null,
  connectionStatus: null, // "disconnected" | "pending" | "wallet" | "infura"
  price: null
})

export const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts
  },
  setConnectionStatus(state, status) {
    state.connectionStatus = status
  },
  setPrice(state, price) {
    state.price = price
  }
}

export const actions = {
  initializeAccounts({ commit }, accounts) {
    commit('setAccounts', accounts)
  },
  clearAccounts({ commit }) {
    commit('setAccounts', null)
  },
  updateConnectionStatus({ commit }, status) {
    commit('setConnectionStatus', status)
  },
  updateCurrentPrice({ commit }, price) {
    commit('setPrice', price)
  }
}

export const getters = {
  getAccounts: state => state.accounts,
  getConnectionStatus: state => state.connectionStatus,
  getPrice: state => state.price
}
