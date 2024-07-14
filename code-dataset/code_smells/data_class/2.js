class Account {
  constructor(accountNumber, accountHolder, balance) {
      this.accountNumber = accountNumber;
      this.accountHolder = accountHolder;
      this.balance = balance;
  }

  getAccountNumber() {
      return this.accountNumber;
  }

  setAccountNumber(accountNumber) {
      this.accountNumber = accountNumber;
  }

  getAccountHolder() {
      return this.accountHolder;
  }

  setAccountHolder(accountHolder) {
      this.accountHolder = accountHolder;
  }

  getBalance() {
      return this.balance;
  }

  setBalance(balance) {
      this.balance = balance;
  }
}

class AccountManager {
  constructor(account) {
      this.account = account;
  }

  deposit(amount) {
      if (amount > 0) {
          this.account.setBalance(this.account.getBalance() + amount);
          return `Deposited ${amount}. New balance: ${this.account.getBalance()}`;
      } else {
          return "Invalid deposit amount.";
      }
  }

  withdraw(amount) {
      if (amount > 0 && this.account.getBalance() >= amount) {
          this.account.setBalance(this.account.getBalance() - amount);
          return `Withdrew ${amount}. New balance: ${this.account.getBalance()}`;
      } else {
          return "Invalid withdrawal amount or insufficient funds.";
      }
  }

  printAccountDetails() {
      return `Account Number: ${this.account.getAccountNumber()}, Account Holder: ${this.account.getAccountHolder()}, Balance: ${this.account.getBalance()}`;
  }
}

class API {
  constructor(accountNumber, accountHolder, initialBalance) {
      this.account = new Account(accountNumber, accountHolder, initialBalance);
      this.accountManager = new AccountManager(this.account);
  }

  deposit(amount) {
      return this.accountManager.deposit(amount);
  }

  withdraw(amount) {
      return this.accountManager.withdraw(amount);
  }

  getAccountDetails() {
      return this.accountManager.printAccountDetails();
  }
}

module.exports = { API };