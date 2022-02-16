import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'
import { Token } from '../contracts/token'

export default {
  data() {
    return {
      contract: null
    }
  },
  computed: {
    ...mapGetters({
      accounts: 'web3/getAccounts',
      network: 'web3/getNetwork',
      price: 'web3/getPrice'
    }),
    isConnected() {
      return this.accounts
    }
  },
  methods: {
    ...mapActions({
      clearAccounts: 'web3/clearAccounts',
      initializeAccounts: 'web3/initializeAccounts',
      updateCurrentNetwork: 'web3/updateCurrentNetwork',
      updateCurrentPrice: 'web3/updateCurrentPrice'
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

          this.contract = contract

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
    async mintDuck() {
      // honestly if the wallet is disconnected, the button should be disabled anyway but if somehow this is called:
      // if (!connectedToWallet) {
      // maybe display error
      // return
      // }

      console.log(this.accounts)
      console.log(this.contract)
      const weiPrice = await this.contract.getPrice()
      console.log('weiPrice', weiPrice)
      const ethPrice = ethers.utils.formatEther(weiPrice)
      console.log('ethprice', ethPrice)
      const activeTx = await this.contract.buy(this.accounts[0], 2, {
        value: ethers.utils.parseEther(ethPrice.toString())
      })

      console.log('activeTx', activeTx)
      const txResult = await activeTx.wait()

      console.log('txResult', txResult)
    },
    clearConnection() {
      this.$web3Modal.clearCachedProvider()
      this.clearAccounts()
    }
  }
}
