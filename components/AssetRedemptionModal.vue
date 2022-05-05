<template>
  <TwoUp :isRedeemable="isRedeemable" :startRedemption="startRedemption" />
</template>

<script>
export default {
  props: {
    isRedeemable: {
      type: Boolean,
      default: true
    },
    startRedemption: {
      type: Function,
      required: true
    }
  },
  computed: {
    image() {
      return '~/assets/shoe.png'
    },
    show() {
      return (
        this.$route.path === '/flyingformations/redeem' && this.isRedeemable
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.asset-redemption-modal {
  .image-wrap {
    height: 100%;
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    img {
      height: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
