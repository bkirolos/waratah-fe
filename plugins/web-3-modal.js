import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'


export default ({ app }, inject) => {

  const providerOptionsConstant = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'ee82f9968cb640d898581a26a5e5e369'
      }
    }
  }
  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions: providerOptionsConstant // required
  })
  inject('web3Modal', web3Modal)

}