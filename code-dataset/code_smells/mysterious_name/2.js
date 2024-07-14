// BankModule.js
class Bank {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  getAccountByNumber(accountNumber) {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }

  qwerty(accountNumber) {
    let acc = this.getAccountByNumber(accountNumber);
    return acc ? acc.getBalance() : null;
  }
}

class Account {
  constructor(accountNumber, accountHolder, balance = 0) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance is ${this.balance}.`);
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. New balance is ${this.balance}.`);
    } else {
      console.log("Withdrawal amount must be positive and less than or equal to the balance.");
    }
  }

  getBalance() {
    return this.balance;
  }
}

class Transaction {
  constructor(account, type, amount) {
    this.account = account;
    this.type = type;
    this.amount = amount;
    this.date = new Date();
  }

  execute() {
    if (this.type === 'deposit') {
      this.account.deposit(this.amount);
    } else if (this.type === 'withdraw') {
      this.account.withdraw(this.amount);
    }
  }
}

class API {
  constructor(bankName) {
    this.bank = new Bank(bankName);
  }

  addAccount(accountNumber, accountHolder, balance = 0) {
    const account = new Account(accountNumber, accountHolder, balance);
    this.bank.addAccount(account);
  }

  performTransaction(accountNumber, type, amount) {
    const account = this.bank.getAccountByNumber(accountNumber);
    if (account) {
      const transaction = new Transaction(account, type, amount);
      transaction.execute();
      return true;
    }
    return false;
  }

  getBalance(accountNumber) {
    return this.bank.qwerty(accountNumber);
  }
}

module.exports = { API };