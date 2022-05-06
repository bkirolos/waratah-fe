<template>
  <TwoUp :cta="setRedemptionModalClosed" :twoUp="twoUp" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      redemptionSettings: 'ui/redemptionSettings'
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
