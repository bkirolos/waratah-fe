.PHONY: contracts

contracts:
	cp -r ../waratah-contracts/deployments ./contracts/deployments
	cp ../waratah-contracts/token.js ./contracts/token.js
