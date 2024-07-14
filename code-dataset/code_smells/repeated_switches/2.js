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
      let features = [];
      switch (this.accountType) {
          case 'savings':
              features = ['Interest Accumulation', 'Limited Withdrawals'];
              break;
          case 'checking':
              features = ['Unlimited Transactions', 'Overdraft Protection'];
              break;
          case 'business':
              features = ['Higher Withdrawal Limits', 'Business Loans'];
              break;
          default:
              features = ['Basic Features'];
      }
      return features;
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
      return this.accounts.map(account => {
          let report = '';
          switch (account.accountType) {
              case 'savings':
                  report = `Savings Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
                  break;
              case 'checking':
                  report = `Checking Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
                  break;
              case 'business':
                  report = `Business Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
                  break;
              default:
                  report = `General Account Report for ${account.accountNumber}: Balance is $${account.getBalance()}`;
          }
          return report;
      });
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