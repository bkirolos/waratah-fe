.PHONY: contracts

contracts:
	cp -r ../waratah-contracts/deployments ./contracts/
	cp ../waratah-contracts/token.js ./contracts/token.js
