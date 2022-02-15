import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'
import { Token } from '../contracts/token'

export default {
  computed: {
    ...mapGetters({
      accounts: 'wallet/getAccounts',
      network: 'wallet/getNetwork',
      price: 'wallet/getPrice'
    }),
    isConnected() {
      return this.accounts
    }
  },
  methods: {
    ...mapActions({
      clearAccounts: 'wallet/clearAccounts',
      initializeAccounts: 'wallet/initializeAccounts',
      updateCurrentNetwork: 'wallet/updateCurrentNetwork',
      updateCurrentPrice: 'wallet/updateCurrentPrice'
    }),
    async connectWithPlugin() {
      try {
        const instance = await this.$web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance, 'any')
        const accounts = await provider.listAccounts()

        const network = await provider.getNetwork()

        this.updateCurrentNetwork(network)

        instance.on('chainChanged', async n => {
          const network = await provider.getNetwork()
          this.updateCurrentNetwork(network)
        })
        this.initializeAccounts(accounts)
        console.log(this.accounts, 'from store')

        const signer = await provider.getSigner()

        if (this.network.name === 'rinkeby') {
          // TODO: use actual env vars here
          // const contractAddress =
          //   Token.address[process.env.ETHEREUM_NETWORK_NAME]
          // const contractAbi = Token.abi[process.env.ETHEREUM_NETWORK_NAME]
          const contractAddress = Token.address.rinkeby
          const contractAbi = Token.abi.rinkeby
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          )

          // // in wei
          const currentPriceWei = await contract.getPrice()
          const currentPrice = ethers.utils.formatEther(currentPriceWei)
          this.updateCurrentPrice(currentPrice)
          console.log(this.price, 'from store')

          const firstMintedDuckTokenId = await contract.tokenByIndex(0)
          const firstMintedDuckIPFSUrl = await contract.tokenURI(
            firstMintedDuckTokenId
          )
          console.log(firstMintedDuckIPFSUrl)
        }
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
