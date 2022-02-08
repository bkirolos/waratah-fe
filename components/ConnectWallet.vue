<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="connect">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        {{ connectText }}
      </span>
    </button>
  </div>
</template>

<script>
import WalletConnectProvider from '@walletconnect/web3-provider'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      accounts: null,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'ee82f9968cb640d898581a26a5e5e369'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      web3Modal: 'wallet/getWeb3Modal',
      provider: 'wallet/getProvider',
      accountsStore: 'wallet/getAccounts'
    }),
    connectText() {
      return this.accountsStore ? 'Connected' : 'Connect Wallet'
    }
  },
  mounted() {
    this.initiateConnect()
    if (this.web3Modal?.cachedProvider) {
      this.connectProvider()
    }

    // const instance = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(instance)
    // const signer = provider.getSigner()
  },
  methods: {
    ...mapActions({
      connectProvider: 'wallet/connectProvider',
      initiateConnect: 'wallet/initiateConnect'
    }),
    async connect() {
      try {
        await this.connectProvider()
      } catch (e) {
        console.log('error')
      }
    }
  }
}
</script>

<style></style>
