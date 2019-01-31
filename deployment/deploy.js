const etherlime = require('etherlime');
const Deposit = require('../build/Deposit.json');
const ethers = require('ethers');

const deploy = async () => {
	const deployer = new etherlime.EtherlimeGanacheDeployer();

	const value = ethers.utils.bigNumberify('30000000000000000000');
	await deployer.deploy(Deposit, false, { value });
};

module.exports = {
	deploy
};