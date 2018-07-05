const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const compile = require('../compile');

let accounts;
let contractInterface = JSON.parse(compile.interface);
let inbox;


beforeEach(async () => {
	// get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// deploy the contract from one of the accounts
	inbox = await new web3.eth.Contract(contractInterface)
			.deploy({
				data : compile.bytecode, 
				arguments : ['Hi There!']
			})
			.send({ 
				from : accounts[0], 
				gas : '1000000'
			});
	inbox.setProvider(provider);
});
	
describe('Inbox',() => {
	it('deploys a contract',() => {
		assert.ok(inbox.options.address);
	});
	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi There!');
	});
	it('can update message', async () => {
		await inbox.methods.setMessage('Hello There').send({ from:accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hello There');
	})
});























