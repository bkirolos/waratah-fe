import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

export const state = () => ({
  web3Modal: null,
  provider: null,
  accounts: null
})

export const mutations = {
  storeWeb3Modal(state, web3Modal) {
    state.web3Modal = web3Modal
  },
  storeProvider(state, provider) {
    state.provider = provider
  },
  storeAccounts(state, accounts) {
    state.accounts = accounts
  }
}

export const actions = {
  async setProvider({ commit }, instance) {
    try {
      console.log(ethers)
      const provider = new ethers.providers.Web3Provider(instance)
      console.log(provider)
      commit('storeProvider', provider)
      console.log(provider)

      const accounts = await provider.listAccounts()
      commit('storeAccounts', accounts)
      console.log(this.accounts)
    } catch (error) {
      console.log(error)
    }
  },
  clearConnection({ state }) {
    await state.web3Modal.clearCachedProvider()
  }
  // async connect({ commit }){
  // 	try {
  // 		const instance = await this.web3Modal.connect()
  // 		const provider = new ethers.providers.Web3Provider(instance)
  // 		console.log(provider)
  // 		this.accounts = await provider.listAccounts()
  // 		console.log(this.accounts)
  // 	} catch (error) {
  // 		console.log(error)
  // 	}
  // }
}

export const getters = {
  getWeb3Modal: state => state.web3Modal,
  getProvider: state => state.provider,
  getAccounts: state => state.accounts
}
