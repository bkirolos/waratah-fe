export const state = () => ({
  showRedemptionModal: true,
  redemptionSettings: null
})

export const mutations = {
  SET_REDEMPTION_MODAL_CLOSED(state) {
    state.showRedemptionModal = false
  },
  SET_REDEMPTION_SETTINGS(state, settings) {
    state.redemptionSettings = settings
  }
}

export const actions = {
  setRedemptionModalClosed({ commit }) {
    commit('SET_REDEMPTION_MODAL_CLOSED')
  },
  setRedemptionSettings({ commit }, settings) {
    commit('SET_REDEMPTION_SETTINGS', settings)
  }
}

export const getters = {
  showRedemptionModal: state => state.showRedemptionModal,
  redemptionSettings: state => state.redemptionSettings
}
