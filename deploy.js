const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compile = require('./compile');

const provider = new HDWalletProvider(
	'fatal dragon lecture muscle announce thing mind undo analyst among cigar text',
	'https://rinkeby.infura.io/hztpQ6ikuvm1cpdy6sjW'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('attempting to deploy from the account:',accounts[0]);
};

deploy();