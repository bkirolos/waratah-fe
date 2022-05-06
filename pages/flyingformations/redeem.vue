<template>
  <div class="flex flex-col w-full">
    <AssetRedemptionModal v-if="showRedepmtionModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import head from '@/mixins/head'

export default {
  mixins: [head]
  computed: {
    ...mapGetters({
      showRedepmtionModal: 'ui/showRedepmtionModal'
    }),
  }
}
</script>
