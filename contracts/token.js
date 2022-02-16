import TokenRinkeby from './rinkeby/FlyingFormations.json'
import TokenLocal from './localhost/FlyingFormations.json'

export const Token = {
  address: {
    rinkeby: TokenRinkeby.address,
    localhost: TokenLocal.address
  },
  abi: {
    rinkeby: TokenRinkeby.abi,
    localhost: TokenLocal.abi
  }
}
