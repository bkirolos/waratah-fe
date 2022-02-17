<template>
  <div class="flex">
    <button class="p-2" @click="handleClick">
      <span
        :class="[
          'connect-button cta flex items-center h-10 leading-none px-5 py-0 relative',
          { 'bg-salmon transition-colors': isConnected && isWrongNetwork }
        ]"
      >
        {{ connectText }}
        <span
          v-if="isConnected && isWrongNetwork"
          class="connect-button-helper left-0 pt-2 absolute right-0"
        >
          Connect to Mainnet
        </span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    connectText() {
      return this.isConnected
        ? this.isWrongNetwork
          ? 'Wrong Network'
          : 'Disconnect'
        : 'Connect Wallet'
    },
    isConnected() {
      return this.$web3?.accounts
    },
    isWrongNetwork() {
      if (this.network === 'mainnet') {
        return this.network !== 'homestead'
      } else {
        return this.netwrok !== this.$config.ethereumNetwork
      }
    },
    network() {
      return this.$web3?.network?.name
    }
  },
  methods: {
    handleClick() {
      this.isConnected
        ? this.$web3.clearConnection()
        : this.$web3.connectWallet()
    }
  }
}
</script>

<style lang="scss">
.connect-button {
  min-width: 176px;
  &-helper {
    bottom: -1rem;
    font-size: 10px;
  }
}
</style>
