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
import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {}
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
    // if this person has already connected to waratah, check for existing connection
    // and try to connect if we can
    if (
      this.$web3Modal.cachedProvider &&
      this.$web3Modal.cachedProvider === 'injected'
    ) {
      this.checkConnection()
    }
  },
  methods: {
    ...mapActions({
      clearAccounts: 'wallet/clearAccounts',
      initializeAccounts: 'wallet/initializeAccounts'
    }),
    async connectWithPlugin() {
      try {
        const instance = await this.$web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        const accounts = await provider.listAccounts()

        const network = await provider.getNetwork()

        if (network.name !== 'homestead') {
          alert(`Wrong network! You are connected to ${network.name}`)
        }

        const signer = await provider.getSigner()
        console.log('signer', signer)

        this.initializeAccounts(accounts)
        console.log(this.accounts, 'from store')
      } catch (e) {
        console.log(e)
      }
    },
    async checkConnection() {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        })
        if (accounts) {
          this.connectWithPlugin()
        }
      } catch (e) {
        console.error(e)
      }
    },
    clearConnection() {
      this.$web3Modal.clearCachedProvider()
      this.clearAccounts()
    }
  }
}
</script>

<style></style>
