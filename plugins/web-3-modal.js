import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { isInteger } from 'core-js/core/number'

export default ({ $config: { infuraId, ethereumNetwork } }, inject) => {
  const wallet = {
    account: null, 
    network: null,
    prodiver: null,
  },

  const providerOptionsConstant = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId
      }
    }
  }
  async initConnect(){
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
  const web3Modal = new Web3Modal({
    network: ethereumNetwork, // optional
    cacheProvider: true, // optional
    providerOptions: providerOptionsConstant // required
  })
  inject('web3Modal', web3Modal)
}
