<template>
  <TwoUp
    v-if="showRedepmtionModal"
    :cta="setRedemptionModalClosed"
    :twoUp="twoUp"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      redemptionSettings: 'ui/redemptionSettings',
      showRedepmtionModal: 'ui/showRedepmtionModal'
    }),
    twoUp() {
      return this.redemptionSettings?.redeemSettings
    }
  },
  methods: {
    ...mapActions({
      setRedemptionModalClosed: 'ui/setRedemptionModalClosed'
    })
  }
}
</script>
