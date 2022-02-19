<template>
  <NavLink :url="$config.openSeaCollectionUrl" round aria-label="OpenSea">
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
