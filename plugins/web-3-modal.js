import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default ({ $config: { infuraId, ethereumNetwork } }, inject) => {
  const providerOptionsConstant = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId
      }
    }
  }
  const web3Modal = new Web3Modal({
    network: ethereumNetwork, // optional
    cacheProvider: true, // optional
    providerOptions: providerOptionsConstant // required
  })
  inject('web3Modal', web3Modal)
}
