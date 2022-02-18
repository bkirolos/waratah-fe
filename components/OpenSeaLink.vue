<template>
  <NavLink url="https://opensea.io" round aria-label="Open Sea">
    <OpenSeaIcon aria-hidden="true" />
  </NavLink>
</template>

<script>
import OpenSeaIcon from '@/assets/svg/open-sea-logo.svg?inline'

export default {
  components: {
    OpenSeaIcon
  }
}
</script>
