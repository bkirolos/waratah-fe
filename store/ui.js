export const state = () => ({
  showTwoUpModal: true
})

export const mutations = {
  SET_MODAL_CLOSED(state) {
    state.showTwoUpModal = false
  }
}

export const actions = {
  setModalClosed({ commit }) {
    commit('SET_MODAL_CLOSED')
  }
}

export const getters = {
  showTwoUpModal: state => state.showTwoUpModal
}
