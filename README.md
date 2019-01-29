
Welcome to FOSDEM Etherlime Challenge!


### What you have to do?

To start with the challenge please follow the steps:

- Please install Etherlime as a global library: `npm install -g etherlime`
- Clone this repository and make `npm install`
- Now you have a project that is already initialized using the command: `etherlime init` and you have everything you need!
- Navigate to `contracts` folder where you will find two ready for use contracts - Deposit & LimeFactory.



### Your task is:

1. Open `Deposit.sol` file and finish the contract functionality as you develop `enroll` method. Method has to enroll a customer within the deposit bank contract, giving the first 3 of them 1 ether as reward and return the balance of the user after enrolling. Your method should start from line 24. Please refer to `depositTest.js` for more information about `enroll` implementation. There you can find ready to use unit tests.

2. After you are done with the development, please be sure that all of your tests are passing. You can check that with the command `etherlime test`. 

3. Once your tests are passing, you have to deploy your smart contract on one of the Ethereum testnets (Ropsten, Rinkenby, etc). You have to use different deployer, than the deployer specified in `deploy.js` file. For more information about the available deployers in Etherlime, please refer to our [documentation](https://etherlime.readthedocs.io/en/latest/). After successful deployment you have to do the following steps: 

- [Join our community group](https://t.me/etherlime/) in Telegram
- Paste your contract address and tag @Ognyan



Enjoy participating in this challenge and do not hesitate to [contact us](https://t.me/etherlime/) if you have any questions regarding the challenge or Etherlime.