import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default ({ app }, inject) => {
  const providerOptionsConstant = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.INFURA_ID
      }
    }
  }
  const web3Modal = new Web3Modal({
    network: process.env.ETHEREUM_NETWORK, // optional
    cacheProvider: true, // optional
    providerOptions: providerOptionsConstant // required
  })
  inject('web3Modal', web3Modal)
}
