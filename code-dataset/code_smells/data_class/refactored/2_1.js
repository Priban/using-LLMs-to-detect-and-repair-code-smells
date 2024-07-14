class Account {
  constructor(accountNumber, accountHolder, balance) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited ${amount}. New balance: ${this.balance}`;
    } else {
      return "Invalid deposit amount.";
    }
  }

  withdraw(amount) {
    if (amount > 0 && this.balance >= amount) {
      this.balance -= amount;
      return `Withdrew ${amount}. New balance: ${this.balance}`;
    } else {
      return "Invalid withdrawal amount or insufficient funds.";
    }
  }

  getAccountDetails() {
    return `Account Number: ${this.accountNumber}, Account Holder: ${this.accountHolder}, Balance: ${this.balance}`;
  }
}

class API {
  constructor(accountNumber, accountHolder, initialBalance) {
    this.account = new Account(accountNumber, accountHolder, initialBalance);
  }

  deposit(amount) {
    return this.account.deposit(amount);
  }

  withdraw(amount) {
    return this.account.withdraw(amount);
  }

  getAccountDetails() {
    return this.account.getAccountDetails();
  }
}

module.exports = { API };