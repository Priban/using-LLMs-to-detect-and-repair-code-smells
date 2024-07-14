class BankAccount {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  getBalance() {
    return this.balance;
  }
}

class Bank {
  constructor() {
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  getTotalBalance() {
    return this.accounts.reduce((total, account) => total + account.getBalance(), 0);
  }
}

class API {
  constructor() {
    this.bank = new Bank();
  }

  addBankAccount(accountNumber, balance) {
    const account = new BankAccount(accountNumber, balance);
    this.bank.addAccount(account);
  }

  calculateTotalBalance() {
    return this.bank.getTotalBalance();
  }
}

module.exports = { API };