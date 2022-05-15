export const state = () => ({
  showRedemptionModal: true
})

export const mutations = {
  SET_REDEMPTION_MODAL_CLOSED(state) {
    state.showRedemptionModal = false
  }
}

export const actions = {
  setRedemptionModalClosed({ commit }) {
    commit('SET_REDEMPTION_MODAL_CLOSED')
  }
}

export const getters = {
  showRedemptionModal: state => state.showRedemptionModal
}
