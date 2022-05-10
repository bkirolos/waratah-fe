// import redemptionSettings from '@/groq/redemptionSettings'
import siteSettings from '@/groq/siteSettings'

export const state = () => ({})

export const actions = {
  async nuxtServerInit({ dispatch }, { $sanity }) {
    const settings = await $sanity.fetch(siteSettings)
    // const redemptionSettingsRes = await this.$sanity.fetch(redemptionSettings)
    const { metaInfo } = settings
    dispatch('metaInfo/setMetaInfo', metaInfo)
    // dispatch('ui/setRedemptionSettings', redemptionSettingsRes)
  }
}
