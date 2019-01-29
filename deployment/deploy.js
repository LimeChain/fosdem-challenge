const etherlime = require('etherlime');
const LimeFactory = require('../build/LimeFactory.json');
const Deposit = require('../build/Deposit.json');
const ethers = require('ethers');

const deploy = async (network, secret) => {

	const deployer = new etherlime.EtherlimeGanacheDeployer();
	const result = await deployer.deploy(LimeFactory);

	const value = ethers.utils.bigNumberify('30000000000000000000')
	const deployedDepositContract = await deployer.deploy(Deposit, false, { value });

};

module.exports = {
	deploy
};