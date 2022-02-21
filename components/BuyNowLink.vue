<template>
  <NavLink
    v-if="$config.nftGoLive"
    url="/flyingformations"
    :large="large"
  >
    THE COLLECTION
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
