class Account {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  withdraw(amount) {
    if (this.balance < amount) {
      this.noFunds();
      return;
    }
    this.balance -= amount;
  }

  deposit(amount) {
    this.balance += amount;
  }

  noFunds() {
    console.log('Insufficient funds in account:', this.accountNumber);
  }
}

class Customer {
  constructor(name, account) {
    this.name = name;
    this.account = account;
  }

  makeWithdrawal(amount) {
    if (this.account.balance < amount) {
      this.noFunds();
      return;
    }
    this.account.withdraw(amount);
  }

  makeDeposit(amount) {
    this.account.deposit(amount);
  }

  noFunds() {
    console.log('Customer', this.name, 'has insufficient funds in account:', this.account.accountNumber);
  }
}

class Bank {
  constructor() {
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this.accounts.find(acc => acc.accountNumber === fromAccountNumber);
    const toAccount = this.accounts.find(acc => acc.accountNumber === toAccountNumber);

    if (!fromAccount || !toAccount) {
      return;
    }

    if (fromAccount.balance < amount) {
      this.noFunds(fromAccount);
      return;
    }

    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
  }

  noFunds(account) {
    console.log('Insufficient funds in account:', account.accountNumber);
  }
}

class API {
  constructor() {
    this.bank = new Bank();
  }

  addAccount(accountNumber, balance) {
    const account = new Account(accountNumber, balance);
    this.bank.addAccount(account);
  }

  makeCustomer(name, accountNumber, balance) {
    const account = new Account(accountNumber, balance);
    return new Customer(name, account);
  }

  transferFunds(fromAccountNumber, toAccountNumber, amount) {
    this.bank.transfer(fromAccountNumber, toAccountNumber, amount);
  }
}

module.exports = { API };