<template>
  <div class="flex">
    <button class="hover-transition p-2" @click="connect">
      <span class="cta flex items-center h-10 leading-none px-5 py-0">
        Connect Wallet
      </span>
    </button>
    <!-- <Web3Modal
      v-if="mounted"
      ref="web3modal"
      :provider-options="providerOptions"
      cache-provider
    /> -->
  </div>
</template>

<script>
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
// import Web3Modal from 'web3modal-vue'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default {
  // components: {
  //   Web3Modal
  // },
  data() {
    return {
      web3Modal: null,
      // mounted: false,
      // theme: 'light',
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'ee82f9968cb640d898581a26a5e5e369'
          }
        }
      }
      // number: 0,
      // balance: 0,
    }
  },
  mounted() {
    // const providerOptions = {
    //   walletconnect: {
    //     package: WalletConnectProvider,
    //     options: {
    //       infuraId: 'ee82f9968cb640d898581a26a5e5e369'
    //     }
    //   }
    // }

    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions: this.providerOptions // required
    })

    this.web3Modal = web3Modal

    // const instance = await web3Modal.connect()

    // const provider = new ethers.providers.Web3Provider(instance)
    // const signer = provider.getSigner()

    // this.mounted = true
    // TODO: run connect logic if this.$refs.web3modal.cachedProdvider is true ?
    // this.$nextTick(async () => {
    //   const web3modal = this.$refs.web3modal
    //   this.$store.commit('setWeb3Modal', web3modal)
    //   if (web3modal.cachedProvider) {
    //     await this.$store.dispatch('connect')
    //     // this.subscribeMewBlockHeaders()
    //   }
    // })
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
      // console.log('connect ran')
      // const provider = await this.$refs.web3modal.connect()
      // console.log('provider', provider)
      // const library = new ethers.providers.Web3Provider(provider)

      // library.pollingInterval = 12000
      // commit('setLibrary', library)

      // const accounts = await library.listAccounts()
      // if (accounts.length > 0) {
      //   commit('setAccount', accounts[0])
      // }
      // const network = await library.getNetwork()
      // commit('setChainId', network.chainId)
      // commit('setActive', true)

      // provider.on('connect', async (info) => {
      //   const chainId = parseInt(info.chainId)
      //   commit('setChainId', chainId)
      //   await console.log('connect', info)
      // })

      // provider.on('accountsChanged', async (accounts) => {
      //   if (accounts.length > 0) {
      //     commit('setAccount', accounts[0])
      //   } else {
      //     await dispatch('resetApp')
      //   }
      //   console.log('accountsChanged')
      // })
      // provider.on('chainChanged', async (chainId) => {
      //   chainId = parseInt(chainId)
      //   commit('setChainId', chainId)
      //   await console.log('chainChanged', chainId)
      // })
    }
  }
}
</script>

<style></style>
