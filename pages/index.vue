<template>
  <div>
    <div>
      <button @click.self="connect">Connect Wallet</button>
    </div>
    <Web3Modal
      v-if="mounted"
      ref="web3modal"
      :provider-options="providerOptions"
      cache-provider
    />
  </div>
</template>

<script>
import Web3Modal from 'web3modal-vue'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default {
  name: 'IndexPage',
  components: {
    Web3Modal,
  },
  data() {
    return {
      mounted: false,
      theme: 'light',
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: '-',
          },
        },
      },
      number: 0,
      balance: 0,
    }
  },
  mounted() {
    this.mounted = true
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
    // async connect() {
    //   await this.$store.dispatch('connect')
    // },
    async connect() {
      const provider = await this.$refs.web3modal.connect()
      console.log('provider', provider)
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
    },
  },
}
</script>
