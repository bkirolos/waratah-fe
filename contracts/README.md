## Contracts Usage


```js
import Token from "../contracts/token"
import ethers from "ethers"

let network = await provider.getNetwork();

let token;

if (network.name == "rinkeby") {
  token = new ethers.Contract(
    Token.rinkeby.address,
    Token.rinkeby.abi,
    signer
  );
} else {
  throw new Error ("Wrong network! Please connect to rinkeby")
}

// get auction price (at current/latest blocktime)
let price = await token.getPrice();

// buy token #5 at the current price 
// (price denominated in wei, 10^18 wei = 1 eth)
let signerAddress = await signer.getAddress();
await token.buy(signerAddress,5, {value: price});

// more documentation:
// https://docs.ethers.io/v5/api/contract/contract/
```