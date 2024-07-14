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
      const account = this.bank.findAccount(owner);
      if (account) {
          account.deposit(amount);
          this.logger.log(`Deposited ${amount} to ${owner}'s account`);
      } else {
          console.log('Account not found.');
      }
  }

  withdraw(owner, amount) {
      const account = this.bank.findAccount(owner);
      if (account) {
          account.withdraw(amount);
          this.logger.log(`Withdrew ${amount} from ${owner}'s account`);
      } else {
          console.log('Account not found.');
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