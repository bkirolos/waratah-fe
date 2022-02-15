import siteSettings from '@/groq/siteSettings'

export const state = () => ({})

export const actions = {
  async nuxtServerInit({ dispatch }, { $sanity }) {
    const settings = await $sanity.fetch(siteSettings)
    const { metaInfo } = settings
    dispatch('metaInfo/setMetaInfo', metaInfo)
  }
}
