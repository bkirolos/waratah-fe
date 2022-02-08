import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const providerOptionConstant = {
  walletconnect: {
    package: WalletConnectProvider,
      options: {
        infuraId: 'ee82f9968cb640d898581a26a5e5e369'
      }
    }
  }

export const state = () => ({
  web3Modal: null,
  provider: null,
  accounts: null,
  instance: null
})

export const mutations = {
  setWeb3Modal(state, web3Modal) {
    state.web3Modal = web3Modal
  },
  setProvider(state, provider) {
    state.provider = provider
  },
  setAccounts(state, accounts) {
    state.accounts = accounts
  }
}

export const actions = {
  initiateConnect({ commit }) {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions: providerOptionConstant // required
    })
    commit('setWeb3Modal', web3Modal)
  },
  async connectProvider({commit, state}) {
    try {
      const instance = await state.web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance)
      console.log(provider)
      const accounts = await provider.listAccounts()
      commit('setAccounts', accounts)
    } catch (error) {
      console.log(error)
    }
  },
  clearConnection({ state }) {
    state.web3Modal.clearCachedProvider()
  },
}

export const getters = {
  getWeb3Modal: state => state.web3Modal,
  getProvider: state => state.provider,
  getAccounts: state => state.accounts
}
