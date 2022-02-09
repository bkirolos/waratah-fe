<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="connectPlugin">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        {{ connectText }}
      </span>
    </button>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      accounts: null,
      web3ModalLocal: null,
      providerOptionsConstant: {
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
    // plugin
    console.log(this.$web3Modal)
    if (this.$web3Modal.cachedProvider) {
      this.connectPlugin()
      return
    }

    // local 
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions: this.providerOptionsConstant // required
    })
    this.web3ModalLocal = web3Modal
    if (this.web3ModalLocal?.cachedProvider) {
      this.connectLocal()
    }
   /* // store
    this.initiateConnect()
    if (this.web3Modal?.cachedProvider) {
      this.connectStore()
     }
    */

    // const instance = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(instance)
    // const signer = provider.getSigner()
  },
  methods: {
    ...mapActions({
      connectProvider: 'wallet/connectProvider',
      initiateConnect: 'wallet/initiateConnect',
      initializeProvider: 'wallet/initializeProvider',
      initializAccounts: 'wallet/initializeAccounts'
    }),
    async connectPlugin() {
      try {
        console.log('connected with plugin')
        const instance = await this.$web3Modal.connect()
        console.log(instance)
        const provider = new ethers.providers.Web3Provider(instance)
        console.log(provider)
        const accounts = await provider.listAccounts()
        console.log(accounts, 'local')
        this.initializAccounts(accounts)
        console.log(this.accountsStore, 'store')
      } catch(e) {
        console.log(e)
      }
    },
    async connectLocal(){
      try {
        const instance = await this.web3ModalLocal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        this.initializeProvider(provider)
        const accounts = await this.provider.listAccounts()
        this.initializAccounts(accounts)
      } catch (e) {
        console.log(e)
      }
    },
    async connectStore() {
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
