<template>
  <NavLink :url="url" round aria-label="OpenSea">
    <OpenSeaIcon aria-hidden="true" />
  </NavLink>
</template>

<script>
import OpenSeaIcon from '@/assets/svg/open-sea-logo.svg?inline'

export default {
  components: {
    OpenSeaIcon
  },
  computed: {
    contractAddress() {
      return this.$web3?.contractAddress || ''
    },
    url() {
      return `https://opensea.io/assets/${this.contractAddress}`
    }
  }
}
</script>
