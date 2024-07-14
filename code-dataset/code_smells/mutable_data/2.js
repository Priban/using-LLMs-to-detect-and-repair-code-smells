class Account {
  constructor() {
    this.accounts = {
      1: { name: "Alice", balance: 1000 },
      2: { name: "Bob", balance: 500 },
    };
  }
}

class Transaction {
  constructor() {
    this.transactions = [];
  }
}

class AccountModule {
  constructor(accountClass) {
    this.accountClass = accountClass;
  }

  deposit(accountId, amount) {
    if (this.accountClass.accounts[accountId]) {
      this.accountClass.accounts[accountId].balance += amount;
    }
  }

  withdraw(accountId, amount) {
    if (this.accountClass.accounts[accountId] && this.accountClass.accounts[accountId].balance >= amount) {
      this.accountClass.accounts[accountId].balance -= amount;
    }
  }

  transfer(fromAccountId, toAccountId, amount) {
    if (this.accountClass.accounts[fromAccountId] && this.accountClass.accounts[toAccountId] && this.accountClass.accounts[fromAccountId].balance >= amount) {
      this.accountClass.accounts[fromAccountId].balance -= amount;
      this.accountClass.accounts[toAccountId].balance += amount;
    }
  }
}

class TransactionModule {
  constructor(transactionClass) {
    this.transactionClass = transactionClass;
  }

  recordTransaction(fromAccountId, toAccountId, amount) {
    this.transactionClass.transactions.push({ fromAccountId, toAccountId, amount });
  }
}

class API {
  constructor() {
    this.accountClass = new Account();
    this.transactionClass = new Transaction();
    this.accountModule = new AccountModule(this.accountClass);
    this.transactionModule = new TransactionModule(this.transactionClass);
  }

  deposit(accountId, amount) {
    this.accountModule.deposit(accountId, amount);
    this.transactionModule.recordTransaction(null, accountId, amount);
  }

  withdraw(accountId, amount) {
    if (this.accountClass.accounts[accountId] && this.accountClass.accounts[accountId].balance >= amount) {
      this.accountModule.withdraw(accountId, amount);
      this.transactionModule.recordTransaction(accountId, null, amount);
    }
  }

  transfer(fromAccountId, toAccountId, amount) {
    if (this.accountClass.accounts[fromAccountId] && this.accountClass.accounts[fromAccountId].balance >= amount) {
      this.accountModule.transfer(fromAccountId, toAccountId, amount);
      this.transactionModule.recordTransaction(fromAccountId, toAccountId, amount);
    }
  }

  getAccountBalance(accountId) {
    if (this.accountClass.accounts[accountId]) {
      return `Account Balance: ${this.accountClass.accounts[accountId].balance}`;
    }
    return "Account not found";
  }
}

module.exports = { API };