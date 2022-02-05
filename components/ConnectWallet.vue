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
/*
import { ethers } from 'ethers'
*/
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      web3Modal: null,
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
      provider: 'wallet/getProvider',
      accountsStore: 'wallet/getAccounts'
    }),
    connectText() {
      return this.accountsStore ? 'Connected' : 'Connect Wallet'
    }
  },
  mounted() {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions: this.providerOptions // required
    })

    this.web3Modal = web3Modal
    // const instance = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(instance)
    // const signer = provider.getSigner()
  },
  methods: {
    ...mapActions({
      setProvider: 'wallet/setProvider'
    }),
    async connect() {
      try {
        await this.setProvider(this.web3Modal)
      } catch (error) {
        console.log(error)
      }
      /*
      try {
        const instance = await this.web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        console.log(provider)

        this.accounts = await provider.listAccounts()
        console.log(this.accounts)
      } catch (error) {
        console.log(error)
      }
      */
    }
  }
}
</script>

<style></style>
