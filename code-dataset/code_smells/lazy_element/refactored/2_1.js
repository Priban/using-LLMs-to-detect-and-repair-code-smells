class Account {
  constructor(owner, balance = 0) {
      this.owner = owner;
      this.balance = balance;
  }

  deposit(amount) {
      if (amount > 0) {
          this.balance += amount;
      } else {
          console.log('Deposit amount must be positive.');
      }
  }

  withdraw(amount) {
      if (amount > 0 && amount <= this.balance) {
          this.balance -= amount;
      } else {
          console.log('Withdrawal amount must be positive and within the available balance.');
      }
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

  findAccount(owner) {
      return this.accounts.find(account => account.owner === owner);
  }

  performTransaction(owner, amount, transactionType) {
      const account = this.findAccount(owner);
      if (account) {
          if (transactionType === 'deposit') {
              account.deposit(amount);
          } else if (transactionType === 'withdraw') {
              account.withdraw(amount);
          }
          return true;
      } else {
          console.log('Account not found.');
          return false;
      }
  }
}

class TransactionLogger {
  log(transaction) {
      console.log(`Transaction: ${transaction}`);
  }
}

class API {
  constructor() {
      this.bank = new Bank();
      this.logger = new TransactionLogger();
  }

  createAccount(owner, initialBalance = 0) {
      const account = new Account(owner, initialBalance);
      this.bank.addAccount(account);
      this.logger.log(`Created account for ${owner} with balance ${initialBalance}`);
  }

  deposit(owner, amount) {
      if (this.bank.performTransaction(owner, amount, 'deposit')) {
          this.logger.log(`Deposited ${amount} to ${owner}'s account`);
      }
  }

  withdraw(owner, amount) {
      if (this.bank.performTransaction(owner, amount, 'withdraw')) {
          this.logger.log(`Withdrew ${amount} from ${owner}'s account`);
      }
  }

  getBalance(owner) {
      const account = this.bank.findAccount(owner);
      if (account) {
          return account.getBalance();
      } else {
          console.log('Account not found.');
          return null;
      }
  }
}

module.exports = { API };