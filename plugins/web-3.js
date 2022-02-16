import Vue from 'vue'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Token } from '../contracts/token'

export default ({ $config: { infuraId, ethereumNetwork } }, inject) => {
  const web3 = Vue.observable ({

    web3Modal: new Web3Modal({
      network: ethereumNetwork, // optional
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId
          }
        }
      }
    }),

    instance: null,
    provider: null,
    accounts: null,
    network: null,
    signer: null,
    contract: null,
    price: null,
    connectionStatus: 'disconnected',

    async checkConnection() {
      try {
        this.accounts = await window.ethereum.request({
          method: 'eth_accounts'
        })
        if (this.accounts) {
          this.init()
        }
      } catch (e) {
        console.error(e)
      }
    },
    clearConnection() {
      this.web3Modal.clearCachedProvider()
      this.accounts = null
      this.connectionStatus = 'disconnected'
    },

    async connectWithInfura() {
      // TODO: set up with env vars
      const infura = new ethers.providers.InfuraProvider('rinkeby')
      await this.connectToContract(infura)
      console.log('connect to infura')
      this.connectionStatus = 'infura'
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

    async mintDuck() {
      // if (this.connectionStatus !== 'wallet') {
      //   return
      // }

      const weiPrice = await this.contract.getPrice()
      const ethPrice = ethers.utils.formatEther(weiPrice)
      const activeTx = await this.contract.buy(this.accounts[0], 2, {
        value: ethers.utils.parseEther(ethPrice.toString())
      })

      console.log('activeTx', activeTx)
      const txResult = await activeTx.wait()

      console.log('txResult', txResult)
    },

    async init() {
      try {
        this.instance = await this.web3Modal.connect()
        this.provider = new ethers.providers.Web3Provider(this.instance)
        this.accounts = await this.provider.listAccounts()

        this.network = await this.provider.getNetwork()

        // This could change at any time; we can hook into it with events
        // TODO: create event subscription and use env var
        if (this.network.name !== 'rinkeby') {
          alert(`Wrong network! You are connected to ${this.network.name}`)
        }

        // this.initializeAccounts(this.accounts)
        console.log(this.accounts, 'from plugin')
        if (this.accounts) {
          this.connectionStatus = 'wallet'
        }

        this.signer = await this.provider.getSigner()

        // TODO: use actual env vars here
        // const contractAddress = Token.address[process.env.ETHEREUM_NETWORK_NAME]
        // const contractAbi = Token.abi[process.env.ETHEREUM_NETWORK_NAME]
        console.log(ethereumNetwork, 'env for network')
        const contractAddress = Token.address.rinkeby
        const contractAbi = Token.abi.rinkeby
        this.contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          this.signer
        )

        // in wei
        const currentPrice = await this.contract.getPrice()
        console.log(
          'current price:',
          ethers.utils.formatEther(currentPrice)
        )

        this.price = ethers.utils.formatEther(currentPrice)

        const firstMintedDuckTokenId = await this.contract.tokenByIndex(0)
        const firstMintedDuckIPFSUrl = await this.contract.tokenURI(
          firstMintedDuckTokenId
        )
        console.log(firstMintedDuckIPFSUrl)
      } catch (e) {
        console.log(e)
      }
    }
  })
  if (
    web3.web3Modal?.cachedProvider &&
    web3.web3Modal?.cachedProvider === 'injected'
  ) {
    web3.checkConnection()
  }
  inject('web3', web3)
}
