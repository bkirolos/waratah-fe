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
import { Token } from '../contracts/token'

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

        // This could change at any time; we can hook into it with events
        // TODO: create event subscription and use env var
        if (network.name !== 'rinkeby') {
          alert(`Wrong network! You are connected to ${network.name}`)
        }

        this.initializeAccounts(accounts)
        console.log(this.accounts, 'from store')

        const signer = await provider.getSigner()

        // TODO: use actual env vars here
        // const contractAddress = Token.address[process.env.ETHEREUM_NETWORK_NAME]
        // const contractAbi = Token.abi[process.env.ETHEREUM_NETWORK_NAME]
        const contractAddress = Token.address.rinkeby
        const contractAbi = Token.abi.rinkeby
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        )

        // in wei
        const currentPrice = await contract.getPrice()
        console.log('current price:', ethers.utils.formatEther(currentPrice))

        const firstMintedDuckTokenId = await contract.tokenByIndex(0)
        const firstMintedDuckIPFSUrl = await contract.tokenURI(
          firstMintedDuckTokenId
        )
        console.log(firstMintedDuckIPFSUrl)
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
