export const state = () => ({
  accounts: null,
  network: null,
  price: null
})

export const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts
  },
  setNetwork(state, network) {
    state.network = network
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
  updateCurrentNetwork({ commit }, network) {
    commit('setNetwork', network)
  },
  updateCurrentPrice({ commit }, price) {
    commit('setPrice', price)
  }
}

export const getters = {
  getAccounts: state => state.accounts,
  getNetwork: state => state.network,
  getPrice: state => state.price
}
