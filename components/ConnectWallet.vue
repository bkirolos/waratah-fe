<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="$web3.init()">
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
  mounted() {
    console.log(this.$web3)
  },
  computed: {
    isConnected() {
      return this.$web3?.accounts
    },
    connectText() {
      return this.isConnected ? 'Connected' : 'Connect Wallet'
    }
  }
}
</script>

<style></style>
