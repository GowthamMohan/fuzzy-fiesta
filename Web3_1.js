var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/9e6a6b58d53147378f95daf4892c7cab')

const account1 = '0x06A334688737e4cF57d3c83D9b160952c13Ab918'
const account2 = '0x38ECE890BBcF4bD8a498DC7e152b04F8fBEFD8Aa'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getBalance(account1,(err,bal) => {
	if (err) {
		console.log(err)
	}
	else {
		console.log('account1:', bal)
	}   
})

web3.eth.getBalance(account2,(err,bal) => {
	if (err) {
		console.log(err)
	}
	else {
		console.log('account2:', bal)
	}   
})

web3.eth.getTransactionCount(account1, (err, txCount) => {

	// Transaction
	const txObject = {
		nonce: web3.utils.toHex(txCount),
		to: account2,
		value: web3.utils.toHex(web3.utils.toWei('1','ether')),
		gasLimit: web3.utils.toHex(21000),
		gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
	}

	// console.log(txObject)

	// //Sign the Transaction
	const tx = new Tx(txObject)
	tx.sign(privateKey1)

	const serializedTransaction = tx.serialize()
	const raw = '0x' + serializedTransaction.toString('hex')

	console.log(raw)

	// //Broadcast the transaction

	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('txHash :',txHash)
	})
})
