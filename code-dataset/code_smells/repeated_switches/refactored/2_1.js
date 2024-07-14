class Account {
  constructor(accountNumber, accountType, balance) {
      this.accountNumber = accountNumber;
      this.accountType = accountType;
      this.balance = balance;
      this.features = this.getFeatures();
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
      return this.accountType.generateReport(this);
  }
}

class AccountType {
  getFeatures() {
      throw new Error('getFeatures() must be implemented by subclass');
  }

  generateReport(account) {
      throw new Error('generateReport() must be implemented by subclass');
  }
}

class SavingsAccountType extends AccountType {
  getFeatures() {
      return ['Interest Accumulation', 'Limited Withdrawals'];
  }

  generateReport(account) {
      return `Savings Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
  }
}

class CheckingAccountType extends AccountType {
  getFeatures() {
      return ['Unlimited Transactions', 'Overdraft Protection'];
  }

  generateReport(account) {
      return `Checking Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
  }
}

class BusinessAccountType extends AccountType {
  getFeatures() {
      return ['Higher Withdrawal Limits', 'Business Loans'];
  }

  generateReport(account) {
      return `Business Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
  }
}

class BasicAccountType extends AccountType {
  getFeatures() {
      return ['Basic Features'];
  }

  generateReport(account) {
      return `General Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
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
      let accountTypeInstance;
      switch (accountType) {
          case 'savings':
              accountTypeInstance = new SavingsAccountType();
              break;
          case 'checking':
              accountTypeInstance = new CheckingAccountType();
              break;
          case 'business':
              accountTypeInstance = new BusinessAccountType();
              break;
          default:
              accountTypeInstance = new BasicAccountType();
      }
      const account = new Account(accountNumber, accountTypeInstance, balance);
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
          return account.features;
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