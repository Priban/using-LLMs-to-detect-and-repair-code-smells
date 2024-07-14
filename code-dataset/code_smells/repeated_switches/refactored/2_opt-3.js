class AccountType {
  constructor(type) {
    this.type = type;
  }

  getFeatures() {
    switch (this.type) {
      case 'savings':
        return ['Interest Accumulation', 'Limited Withdrawals'];
      case 'checking':
        return ['Unlimited Transactions', 'Overdraft Protection'];
      case 'business':
        return ['Higher Withdrawal Limits', 'Business Loans'];
      default:
        return ['Basic Features'];
    }
  }

  generateReport(accountNumber, balance) {
    switch (this.type) {
      case 'savings':
        return `Savings Account Report for ${accountNumber}: Balance is $${balance}`;
      case 'checking':
        return `Checking Account Report for ${accountNumber}: Balance is $${balance}`;
      case 'business':
        return `Business Account Report for ${accountNumber}: Balance is $${balance}`;
      default:
        return `General Account Report for ${accountNumber}: Balance is $${balance}`;
    }
  }
}

class Account {
  constructor(accountNumber, accountType, balance) {
    this.accountNumber = accountNumber;
    this.accountType = new AccountType(accountType);
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }

  getFeatures() {
    return this.accountType.getFeatures();
  }

  generateReport() {
    return this.accountType.generateReport(this.accountNumber, this.balance);
  }
}

class Bank {
  constructor() {
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  getAccount(accountNumber) {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }

  generateReport() {
    return this.accounts.map(account => account.generateReport());
  }
}

class API {
  constructor() {
    this.bank = new Bank();
  }

  createAccount(accountNumber, accountType, balance) {
    const account = new Account(accountNumber, accountType, balance);
    this.bank.addAccount(account);
  }

  deposit(accountNumber, amount) {
    const account = this.bank.getAccount(accountNumber);
    if (account) {
      account.deposit(amount);
    }
  }

  withdraw(accountNumber, amount) {
    const account = this.bank.getAccount(accountNumber);
    if (account) {
      account.withdraw(amount);
    }
  }

  getAccountFeatures(accountNumber) {
    const account = this.bank.getAccount(accountNumber);
    if (account) {
      return account.getFeatures();
    }
    return null;
  }

  generateReport() {
    return this.bank.generateReport();
  }

  getBalance(accountNumber) {
    const account = this.bank.getAccount(accountNumber);
    if (account) {
      return account.getBalance();
    }
    return null;
  }
}

module.exports = { API };