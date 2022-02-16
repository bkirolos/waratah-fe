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
      connectionStatus: 'web3/getConnectionStatus',
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
      updateConnectionStatus: 'web3/updateConnectionStatus',
      updateCurrentPrice: 'web3/updateCurrentPrice'
    }),
    async connectWallet() {
      this.updateConnectionStatus('disconnected')
      try {
        const instance = await this.$web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance, 'any')
        const accounts = await provider.listAccounts()

        // const network = await provider.getNetwork()

        instance.on('chainChanged', n => {
          this.updateConnectionStatus('disconnected')

          // const network = await provider.getNetwork()
          // TODO: update network
        })
        this.initializeAccounts(accounts)
        console.log(this.accounts, 'from store')

        this.updateConnectionStatus('wallet')
      } catch (e) {
        console.log(e)
        await this.connectWithInfura()
      }
    },
    
    async connectWithInfura() {
      // TODO: set up with env vars
      const infura = new ethers.providers.InfuraProvider('rinkeby')
      await this.connectToContract(infura)
      console.log('connect to infura')
      this.updateConnectionStatus('infura')
    },

    async connectToContract(providerOrSigner) {
      // TODO: use actual env vars here
      // const contractAddress =
      //   Token.address[process.env.ETHEREUM_NETWORK_NAME]
      // const contractAbi = Token.abi[process.env.ETHEREUM_NETWORK_NAME]

      const contractAddress = Token.address.rinkeby
      const contractAbi = Token.abi.rinkeby
      const contract = await new ethers.Contract(
        contractAddress,
        contractAbi,
        providerOrSigner
      )

      const currentPriceWei = await contract.getPrice()
      const currentPrice = ethers.utils.formatEther(currentPriceWei)
      this.price = currentPrice
      console.log(this.price, 'from store')

      const firstMintedDuckTokenId = await contract.tokenByIndex(0)
      const firstMintedDuckIPFSUrl = await contract.tokenURI(
        firstMintedDuckTokenId
      )
      console.log(firstMintedDuckIPFSUrl)

      this.contract = contract
    },

    async checkConnection() {
      console.log('checking connection')

      if (this.$web3Modal.cachedProvider) {
        try {
          if (this.$web3Modal.cachedProvider === 'injected') {
            const accounts = await window.ethereum.request({
              method: 'eth_accounts'
            })
            if (!accounts.length) {
              console.log('Having trouble re-connecting to Metamask')
              // TODO: handle this edge case
            }

            this.updateConnectionStatus('pending')
            await this.connectWallet()
          }
        } catch (e) {
          console.error(e)
          await this.connectWithInfura()
        }
      } else {
        await this.connectWithInfura()
      }
    },
    async mintDuck() {
      if (this.connectionStatus !== 'wallet') {
        return
      }

      const weiPrice = await this.contract.getPrice()
      const ethPrice = ethers.utils.formatEther(weiPrice)
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
      this.updateConnectionStatus('disconnected')
    }
  }
}
