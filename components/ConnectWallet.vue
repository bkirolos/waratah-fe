<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="connectWithPlugin">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        {{ connectText }}
      </span>
    </button>
    <button v-if="isConnected" class="hover-transition p-2" @click="clearConnection">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        Disconnect
      </span>
    </button>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      accounts: 'wallet/getAccounts'
    }),
    connectText() {
      return this.accounts ? 'Connected' : 'Connect Wallet'
    },
    isConnected() {
      return this.accounts
    }
  },
  mounted() {
    // plugin flow
    if (this.$web3Modal.cachedProvider) {
      this.connectWithPlugin()
    }
  },
  methods: {
    ...mapActions({
      clearAccounts: 'wallet/clearAccounts',
      initializeAccounts: 'wallet/initializeAccounts',
    }),
    async connectWithPlugin() {
      try {
        const instance = await this.$web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        const accounts = await provider.listAccounts()

        this.initializeAccounts(accounts)
        console.log(this.accounts, 'from store')
      } catch(e) {
        console.log(e)
      }
    },
    clearConnection() {
      this.$web3Modal.clearCachedProvider()
      this.clearAccounts()
    },
  }
}
</script>

<style></style>
