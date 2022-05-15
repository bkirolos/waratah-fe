import Vue from 'vue'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Token } from '../contracts/token'

export default ({ $config: { infuraId, ethereumNetwork }, $axios}, inject) => {
  const web3 = Vue.observable({
    web3Modal: new Web3Modal({
      network: 'mainnet', // optional
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
    signedMessage: null,
    accountTokenCount: null,

    async getAllOwnedTokens() {
      if (!this.contract) return null

      try {
        const tokenIds = await this.contract.getAllTokens()
        const mappedTokens = tokenIds
          .filter(t => t._isBigNumber)
          .map(bn => bn.toNumber())
        this.ownedTokens = mappedTokens
      } catch (e) {
        console.error(e)
      }
    },
    async getTokensByOwnerCount(addressOwner) {
      if (!this.contract) return null
      try {
        const numberTokens = await this.contract.balanceOf(addressOwner)
        this.accountTokenCount = numberTokens
        console.log()
      } catch (e) {
        this.accountTokenCount = 0
        console.error(e)
      }
    },
    async connectWallet() {
      this.connectionStatus = 'disconnected'

      if (this.provider) {
        this.provider.removeAllListeners()
      }

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

        instance.on('accountsChanged', async accounts => {
          if (accounts.length > 0) {
            this.accounts = accounts
            const currentAccount = this.accounts[0]
            await this.getTokensByOwnerCount(currentAccount)
          } else {
            await this.clearConnection()
          }
        })

        const signer = await provider.getSigner()
        await this.connectToContract(signer)
        this.connectionStatus = 'wallet'
        const currentAccount = this.accounts[0]
        await this.getTokensByOwnerCount(currentAccount)
      } catch (e) {
        // console.log(e)
        await this.connectWithInfura()
      }
    },
    async connectWithInfura() {
      const infura = new ethers.providers.InfuraProvider(
        ethereumNetwork,
        infuraId
      )

      this.provider = infura
      this.connectionStatus = 'infura'

      await this.connectToContract(infura)
    },
    async connectToContract(providerOrSigner) {
      const contractAddress = Token.address[ethereumNetwork]
      const contractAbi = Token.abi[ethereumNetwork]
      const contract = await new ethers.Contract(
        contractAddress,
        contractAbi,
        providerOrSigner
      )
      this.contractAddress = contractAddress

      await this.updatePrice()

      // fetch the price every block
      this.provider.on('block', async () => {
        if (!this.price || !this.ownedTokens) {
          console.log('fetch')
          await this.updatePrice()

          await this.getAllOwnedTokens()
        }
      })

      this.contract = contract
    },
    formatPrice(weiPrice) {
      if (!weiPrice) return

      if (!weiPrice._isBigNumber) {
        return null
      }

      const ethPrice = ethers.utils.formatEther(weiPrice)
      return (+ethPrice)?.toFixed(3)
    },

    async clearConnection() {
      this.web3Modal.clearCachedProvider()
      this.accounts = null
      this.connectionStatus = 'disconnected'

      if (this.provider) {
        this.provider.removeAllListeners()
      }
      this.provider = null

      await this.connectWithInfura()
    },

    async updatePrice() {
      try {
        const price = await this.contract.getPrice()
        this.price = price
        return price
      } catch (e) {
        if (e.message.includes('auction has not started')) {
          this.price = -1
        }
      }
    },
    auctionNotStarted() {
      return this.price === -1
    },
    async mintDuck(tokenId) {
      if (this.connectionStatus !== 'wallet') {
        throw new Error('Not connected to wallet!')
      } else if (this.network.name !== ethereumNetwork) {
        throw new Error('Wrong network!')
      }

      const weiPrice = await this.updatePrice()
      const ethPrice = ethers.utils.formatEther(weiPrice)
      const activeTx = await this.contract.buy(this.accounts[0], tokenId, {
        value: ethers.utils.parseEther(ethPrice.toString())
      })
      await activeTx.wait()
      // console.log('txResult', txResult)
    },
    async redeemDuck(tokenId) {
      if (this.connectionStatus !== 'wallet') {
        throw new Error('Not connected to wallet!')
      } else if (this.network.name !== ethereumNetwork) {
        throw new Error('Wrong network!')
      }

      const activeTx = await this.contract.redeem(tokenId)
      await activeTx.wait()

      // Force update on OpenSea
      try {
        const apiUrl = ethereumNetwork === 'rinkeby' ? 'testnets-api' : 'api'
        const url = `https://${apiUrl}.opensea.io/api/v1/asset/${this.contractAddress}/${tokenId}?force_update=true`
        await $axios.$get(url)
      } catch (e) {
        console.error(e)
      }

      // console.log('txResult', txResult)
    },
    parseError(message) {
      if (message.includes('User has already bought'))
        return '🦆 Only one Duck per wallet 🦆'

      if (message.includes('insufficient funds for gas * price'))
        return '💸 Insufficient funds 💸'

      if (message.includes('token already minted'))
        return '😭 Token already minted 😭'

      if (message.includes('transaction failed')) {
        return '😵 Transaction Failed 😵'
      }

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
    async getTokenRedeemer(tokenId) {
      try {
        const redeemerOfDuck = await this.contract?.sneakerRedeemedBy(tokenId)
        if (redeemerOfDuck === '0x0000000000000000000000000000000000000000') {
          return null
        }
        return redeemerOfDuck
      } catch (e) {
        console.error(e)
      }
    },
    async getTokenOwnerEns(tokenId) {
      try {
        const ownerOfDuck = await this.contract?.ownerOf(tokenId)
        const ensName = await this.provider?.lookupAddress(ownerOfDuck)
        return ensName
      } catch (e) {
        console.error(e)
      }
    },
    async init() {
      if (web3.web3Modal.cachedProvider) {
        try {
          // METAMASK
          if (web3.web3Modal.cachedProvider === 'injected') {
            const accounts = await window.ethereum.request({
              method: 'eth_accounts'
            })
            if (!accounts.length) {
              // console.log('Having trouble re-connecting to Metamask')
              await this.clearConnection()
              return
            }
          } else {
            // MOBILE CACHED
            localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
            localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE')
            localStorage.removeItem('walletconnect')

            await this.connectWithInfura()
            return
          }

          this.connectionStatus = 'pending'
          await this.connectWallet()
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
