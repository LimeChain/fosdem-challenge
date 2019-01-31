pragma solidity ^0.5.0;

contract Deposit {
    uint8 private numberOfClients;
    mapping (address => uint) private depositBalances;
    address public owner;

  // Log the event about a deposit being made by an address and its amount
    event LogDepositMade(address indexed accountAddress, uint amount);

    // Constructor is "payable" so it can receive the initial funding of 3, 
    // required to reward the first 3 clients
    constructor() public payable {
        require(msg.value >= 3 ether, "3 ether initial funding required");
        /* Set the owner to the creator of this contract */
        owner = msg.sender;
        numberOfClients = 0;
    }

    /// @notice Enroll a customer with the bank, 
    /// giving the first 3 of them 10 ether as reward
    /// @return The balance of the user after enrolling

   /// Please make enroll method here. You can go through the depositTest.js for more information about the method implementation.

    /// @notice Deposit ether into bank, requires method is "payable"
    /// @return The balance of the user after the deposit is made
    function deposit() public payable returns (uint) {
        depositBalances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value);
        return depositBalances[msg.sender];
    }

    /// @notice Withdraw ether from bank
    /// @return The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= depositBalances[msg.sender]) {
            depositBalances[msg.sender] -= withdrawAmount;
            msg.sender.transfer(withdrawAmount);
        }
        return depositBalances[msg.sender];
    }

    /// @notice Just reads balance of the account requesting, so "constant"
    /// @return The balance of the user
    function balance() public view returns (uint) {
        return depositBalances[msg.sender];
    }

    /// @return The balance of the Deposit contract
    function depositsBalance() public view returns (uint) {
        return address(this).balance;
    }
}