<template>
  <TwoUp v-if="showTwoUpModal" :cta="setModalClosed" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      showTwoUpModal: 'ui/showTwoUpModal'
    })
  },
  methods: {
    ...mapActions({
      setModalClosed: 'ui/setModalClosed'
    })
  }
}
</script>
