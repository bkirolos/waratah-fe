export const state = () => ({
  showRedepmtionModal: true,
  redemptionSettings: null
})

export const mutations = {
  SET_REDEMPTION_MODAL_CLOSED(state) {
    state.showRedepmtionModal = false
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
  showRedepmtionModal: state => state.showRedepmtionModal,
  redemptionSettings: state => state.redemptionSettings
}
