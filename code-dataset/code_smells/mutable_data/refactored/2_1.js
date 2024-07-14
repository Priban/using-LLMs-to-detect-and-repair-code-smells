class Account {
  constructor() {
    this.accounts = {
      1: { name: "Alice", balance: 1000 },
      2: { name: "Bob", balance: 500 },
    };
  }

  getAccount(accountId) {
    return this.accounts[accountId];
  }

  updateBalance(accountId, amount) {
    if (this.accounts[accountId]) {
      this.accounts[accountId].balance += amount;
    }
  }

  hasSufficientFunds(accountId, amount) {
    return this.accounts[accountId] && this.accounts[accountId].balance >= amount;
  }
}

class Transaction {
  constructor() {
    this.transactions = [];
  }

  recordTransaction(fromAccountId, toAccountId, amount) {
    this.transactions.push({ fromAccountId, toAccountId, amount });
  }
}

class AccountModule {
  constructor(accountClass) {
    this.accountClass = accountClass;
  }

  deposit(accountId, amount) {
    this.accountClass.updateBalance(accountId, amount);
  }

  withdraw(accountId, amount) {
    if (this.accountClass.hasSufficientFunds(accountId, amount)) {
      this.accountClass.updateBalance(accountId, -amount);
    }
  }

  transfer(fromAccountId, toAccountId, amount) {
    if (this.accountClass.hasSufficientFunds(fromAccountId, amount)) {
      this.accountClass.updateBalance(fromAccountId, -amount);
      this.accountClass.updateBalance(toAccountId, amount);
    }
  }
}

class API {
  constructor() {
    this.accountClass = new Account();
    this.transactionClass = new Transaction();
    this.accountModule = new AccountModule(this.accountClass);
  }

  deposit(accountId, amount) {
    this.accountModule.deposit(accountId, amount);
    this.transactionClass.recordTransaction(null, accountId, amount);
  }

  withdraw(accountId, amount) {
    if (this.accountClass.hasSufficientFunds(accountId, amount)) {
      this.accountModule.withdraw(accountId, amount);
      this.transactionClass.recordTransaction(accountId, null, amount);
    }
  }

  transfer(fromAccountId, toAccountId, amount) {
    if (this.accountClass.hasSufficientFunds(fromAccountId, amount)) {
      this.accountModule.transfer(fromAccountId, toAccountId, amount);
      this.transactionClass.recordTransaction(fromAccountId, toAccountId, amount);
    }
  }

  getAccountBalance(accountId) {
    const account = this.accountClass.getAccount(accountId);
    return account ? `Account Balance: ${account.balance}` : "Account not found";
  }
}

module.exports = { API };