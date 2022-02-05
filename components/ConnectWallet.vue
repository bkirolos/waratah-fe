<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="connect">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        Connect Wallet
      </span>
    </button>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default {
  data() {
    return {
      web3Modal: null,
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
    async connect() {
      try {
        const instance = await this.web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        console.log(provider)

        const accounts = await provider.listAccounts()
        console.log(accounts)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
