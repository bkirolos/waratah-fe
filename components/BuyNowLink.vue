<template>
  <NavLink
    v-if="$config.nftGoLive"
    url="/flyingformations"
    :large="large"
    class="text-lime"
  >
    Buy Now
  </NavLink>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>
