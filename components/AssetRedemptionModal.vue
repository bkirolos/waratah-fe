<template>
  <TwoUp v-if="showTwoUpModal" :cta="setModalClosed" :page="page" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dropSettings from '@/groq/dropSettings'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    this.page = await this.$sanity.fetch(dropSettings)
  },
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
