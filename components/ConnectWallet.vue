<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="$web3.connectWallet()">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        {{ connectText }}
      </span>
    </button>
    <button
      v-if="isConnected"
      class="hover-transition p-2"
      @click="$web3.clearConnection()"
    >
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        Disconnect
      </span>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isConnected() {
      return this.$web3?.accounts
    },
    connectText() {
      return this.isConnected
        ? `Connected to ${this.$web3.network.name}`
        : 'Connect Wallet'
    }
  }
}
</script>

<style></style>
