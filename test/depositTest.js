const etherlime = require('etherlime');
const ethers = require('ethers');
const Deposit = require('../build/Deposit.json');


describe('Example', () => {
	let deployer;
	let depositInstance;
	let Ivan;
	let George;
	let Silviya;
	let Maria;
	let rewardForUser;
	let initialDepositsBalance

	const defaultOverrides = {
		gasPrice: 20000000000,
		gasLimit: 4700000,
	}

	before(async () => {
		initialDepositsBalance = ethers.utils.bigNumberify('4000000000000000000')
		deployer = new etherlime.EtherlimeGanacheDeployer();

		depositInstance = await deployer.deploy(Deposit, false, { value: initialDepositsBalance });
		Ivan = accounts[1];
		George = accounts[2];
		Silviya = accounts[3];
		Maria = accounts[4];
		rewardForUser = ethers.utils.bigNumberify('1000000000000000000');
	});

	it("should reward 3 first clients with 1 ether balance", async () => {

		const txIvan = await depositInstance.from(Ivan);
		await txIvan.enroll();
		const ivanBalance = await txIvan.balance();
		assert.deepEqual(ivanBalance, rewardForUser, "initial balance is incorrect");

		const txGeorge = await depositInstance.from(George);
		await txGeorge.enroll();
		const georgeBalance = await txGeorge.balance();
		assert.deepEqual(georgeBalance, rewardForUser, "initial balance is incorrect");

		const txSilviya = await depositInstance.from(Silviya);
		await txSilviya.enroll();
		const silviyaBalance = await txSilviya.balance();
		assert.deepEqual(silviyaBalance, rewardForUser, "initial balance is incorrect");

		const txMaria = await depositInstance.from(Maria);
		await txMaria.enroll();
		const mariaBalance = await txMaria.balance();
		assert.notDeepEqual(mariaBalance, rewardForUser, "initial balance is incorrect");

		const depositsBalance = await depositInstance.depositsBalance();
		assert.deepEqual(depositsBalance, initialDepositsBalance);
	});

	it("should deposit correct amount", async () => {

		const deposit = ethers.utils.bigNumberify('2000000000000000000')

		const txIvan = await depositInstance.from(Ivan);
		await txIvan.deposit({ value: deposit })

		const balance = await txIvan.balance();
		assert.deepEqual(balance, deposit.add(rewardForUser), "deposit amount incorrect, check deposit method");

		const depositBalance = await depositInstance.depositsBalance();

		assert.deepEqual(depositBalance, initialDepositsBalance.add(deposit));

	});

	it("Should proper withdraw", async () => {

		const deposit = ethers.utils.bigNumberify('2000000000000000000');
		const txIvan = await depositInstance.from(Ivan);

		await txIvan.deposit({ value: deposit });
		const balanceAfterDeposit = await txIvan.balance();
		await txIvan.withdraw(deposit, defaultOverrides);
		const balance = await txIvan.balance();
		assert.deepEqual(balance, balanceAfterDeposit.sub(deposit), "withdraw amount incorrect");
	});

	it("Should keep balance the same if we try to withdraw more than the account balance", async () => {

		const deposit = ethers.utils.bigNumberify('2000000000000000000');
		const amountToWithdraw = ethers.utils.bigNumberify('6000000000000000000');
		const txIvan = await depositInstance.from(Ivan);

		await txIvan.deposit({ value: deposit });
		const balanceAfterDeposit = await txIvan.balance();
		await txIvan.withdraw(amountToWithdraw, defaultOverrides);
		const balance = await txIvan.balance();
		assert.deepEqual(balance, balanceAfterDeposit, "balance should be keep the same");
	});
});