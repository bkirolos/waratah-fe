export const state = () => ({
  accounts: null
})

export const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts
  }
}

export const actions = {
  initializeAccounts({ commit }, accounts) {
    commit('setAccounts', accounts)
  },
  clearAccounts({ commit }) {
    commit('setAccounts', null)
  }
}

export const getters = {
  getAccounts: state => state.accounts
}
