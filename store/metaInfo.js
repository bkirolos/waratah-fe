export const state = () => ({
  description: '',
  image: null,
  title: '',
  titleBase: ''
})

export const mutations = {
  SET_DESCRIPTION(state, description) {
    state.description = description
  },
  SET_IMAGE(state, image) {
    state.image = image
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_TITLE_BASE(state, titleBase) {
    state.titleBase = titleBase
  }
}

export const actions = {
  setMetaInfo({ commit }, metaInfo) {
    if (!metaInfo) return
    const { description, image, title, titleBase } = metaInfo
    description && commit('SET_DESCRIPTION', description)
    image && commit('SET_IMAGE', image)
    title && commit('SET_TITLE', title)
    titleBase && commit('SET_TITLE_BASE', titleBase)
  }
}

export const getters = {
  description: state => state.description,
  image: state => state.image,
  title: state => state.title,
  titleBase: state => state.titleBase
}
