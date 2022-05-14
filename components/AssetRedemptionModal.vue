<template>
  <TwoUp v-if="twoUp" :cta="setRedemptionModalClosed" :two-up="twoUp" />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    redemptionModal: {
      type: Object,
      required: true
    }
  },
  computed: {
    twoUp() {
      return this.redemptionModal
    }
  },
  methods: {
    ...mapActions({
      setRedemptionModalClosed: 'ui/setRedemptionModalClosed'
    })
  }
}
</script>
