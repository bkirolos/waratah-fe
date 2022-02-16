<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="connectWithPlugin">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        {{ connectText }}
      </span>
    </button>
    <button
      v-if="isConnected"
      class="hover-transition p-2"
      @click="clearConnection"
    >
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        Disconnect
      </span>
    </button>
  </div>
</template>

<script>
// import { ethers } from 'ethers'
// import { mapActions, mapGetters } from 'vuex'
// import { Token } from '../contracts/token'
import web3 from '@/mixins/web3'

export default {
  data() {
    return {}
  },
  mixins: [web3],
  computed: {
    connectText() {
      return this.accounts ? 'Connected' : 'Connect Wallet'
    }
  }
}
</script>

<style></style>
