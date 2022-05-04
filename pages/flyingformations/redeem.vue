<template>
  <div class="flex flex-col w-full">
    <AssetRedemptionModal
      :isRedeemable="isRedeemable"
      :startRedemption="startRedemption"
    />
  </div>
</template>

<script>
import head from '@/mixins/head'

export default {
  mixins: [head],
  data() {
    return {
      isRedeemable: true
    }
  },

  methods: {
    startRedemption() {
      this.isRedeemable = false
    }
  }
}
</script>
