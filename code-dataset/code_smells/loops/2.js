class BankAccount {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
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
    let totalBalance = 0;
    for (let i = 0; i < this.accounts.length; i++) {
      totalBalance += this.accounts[i].balance;
    }
    return totalBalance;
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