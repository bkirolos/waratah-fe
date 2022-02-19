import Vue from 'vue'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Token } from '../contracts/token'

export default ({ $config: { infuraId, ethereumNetwork } }, inject) => {
  const web3 = Vue.observable({
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
    contractAddress: null,
    price: null,
    connectionStatus: 'disconnected',
    ownedTokens: [],

    async getAllOwnedTokens() {
      if (!this.contract) return null

      try {
        const tokenIds = await this.contract.getAllTokens()
        const mappedTokens = tokenIds.map(bn => bn.toNumber())
        this.ownedTokens = mappedTokens
      } catch (e) {
        console.error(e)
      }
    },
    async connectWallet() {
      this.connectionStatus = 'disconnected'
      try {
        const instance = await web3.web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance, 'any')
        const accounts = await provider.listAccounts()
        this.accounts = accounts

        this.provider = provider

        const network = await provider.getNetwork()
        this.network = network

        instance.on('chainChanged', async n => {
          const network = await provider.getNetwork()
          this.network = network
        })

        const signer = await provider.getSigner()
        await this.connectToContract(signer)
        this.connectionStatus = 'wallet'
      } catch (e) {
        console.log(e)
        await this.connectWithInfura()
      }
    },
    async connectWithInfura() {
      // TODO: set up with env vars
      const infura = new ethers.providers.InfuraProvider('rinkeby')

      this.provider = infura
      this.connectionStatus = 'infura'

      await this.connectToContract(infura)
    },
    async connectToContract(providerOrSigner) {
      // TODO: use actual env vars here
      // const contractAddress =
      //   Token.address[process.env.ETHEREUM_NETWORK_NAME]
      // const contractAbi = Token.abi[process.env.ETHEREUM_NETWORK_NAME]

      const contractAddress = Token.address[ethereumNetwork]
      const contractAbi = Token.abi[ethereumNetwork]
      const contract = await new ethers.Contract(
        contractAddress,
        contractAbi,
        providerOrSigner
      )
      this.contractAddress = contractAddress

      const currentPriceWei = await contract.getPrice()
      this.price = currentPriceWei

      // fetch the price every block
      this.provider.on('block', async () => {
        const price = await contract.getPrice()
        this.price = price

        await this.getAllOwnedTokens()
      })

      this.contract = contract
    },
    formatPrice(weiPrice) {
      if (!weiPrice) return
      const ethPrice = ethers.utils.formatEther(weiPrice)

      return (+ethPrice)?.toFixed(2)
    },
    async clearConnection() {
      this.web3Modal.clearCachedProvider()
      this.accounts = null
      this.connectionStatus = 'disconnected'
      this.provider = null

      await this.connectWithInfura()
    },

    async mintDuck(tokenId) {
      if (this.connectionStatus !== 'wallet') {
        throw new Error('Not connected to wallet!')
      } else if (this.network.name !== 'rinkeby') {
        throw new Error('Wrong network!')
      }

      const weiPrice = await this.contract.getPrice()
      const ethPrice = ethers.utils.formatEther(weiPrice)
      const activeTx = await this.contract.buy(this.accounts[0], tokenId, {
        value: ethers.utils.parseEther(ethPrice.toString())
      })
      const txResult = await activeTx.wait()

      console.log('txResult', txResult)
    },
    parseError(message) {
      if (message.includes('User has already bought'))
        return 'Only one Duck per wallet'

      if (message.includes('insufficient funds for gas * price'))
        return 'Insufficient funds'

      // If none of these, try to parse it out and if that really doesn't work,
      // just return the raw message
      return (
        message?.split('FlyingFormations: ')?.[1]?.split(`"`)?.[0] || message
      )
    },
    async getTokenOwner(tokenId) {
      try {
        const ownerOfDuck = await this.contract?.ownerOf(tokenId)
        return ownerOfDuck
      } catch (e) {
        console.error(e)
      }
    },
    async init() {
      if (web3.web3Modal.cachedProvider) {
        try {
          if (web3.web3Modal.cachedProvider === 'injected') {
            const accounts = await window.ethereum.request({
              method: 'eth_accounts'
            })
            if (!accounts.length) {
              console.log('Having trouble re-connecting to Metamask')
              // TODO: handle this edge case
            }

            this.connectionStatus = 'pending'
            await this.connectWallet()
          }
        } catch (e) {
          console.error(e)
          await this.connectWithInfura()
        }
      } else {
        await this.connectWithInfura()
      }
    }
  })

  web3.init()

  inject('web3', web3)
}
