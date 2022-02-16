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
