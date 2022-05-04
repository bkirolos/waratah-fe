<template>
  <section
    v-if="show"
    class="
      asset-redemption-modal
      grid grid-cols-12
      place-items-center
      w-screen
      modal-overlay
      h-max
      right-0
      left-0
      z-50
      bg-navy
    "
  >
    <div
      class="
        grid grid-cols-12
        col-span-full
        xl:col-span-6
        py-12
        xl:py-16
        w-full
        bg-current
      "
    >
      <div class="col-start-2 col-span-10 xl:col-start-3 xl:col-span-9">
        <h1 class="heading-2 leading-negative mt-6">
          ARE YOU READY TO TAKE FLIGHT?
        </h1>
        <p class="content-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum et integer at condimentum placerat sodales sed. Justo
          eleifend netus maecenas enim condimentum. Aliquet non nisl fringilla
          tincidunt sociis a. Odio cras sed tincidunt feugiat.
        </p>
        <h2 class="content-block heading-4">Title goes here</h2>
        <p class="content-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum et integer at condimentum placerat sodales sed. Justo
          eleifend netus maecenas enim condimentum. Aliquet non nisl fringilla
          tincidunt sociis a. Odio cras sed tincidunt feugiat.
        </p>
        <button class="cta text-base space-x-2" @click="startRedemption">
          Start Redemption
        </button>
      </div>
    </div>
    <div class="image-wrap col-span-full xl:col-span-6">
      <img src="~/assets/png/shoe.png" />
    </div>
  </section>
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
