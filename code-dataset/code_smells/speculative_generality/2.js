class Transaction {
  constructor(amount) {
    this.amount = amount;
  }

  execute(account) {
    throw new Error("This method should be overridden in subclasses");
  }
}

class Deposit extends Transaction {
  constructor(amount) {
    super(amount);
  }

  execute(account) {
    account.balance += this.amount;
    console.log(`Deposited $${this.amount}. New balance: $${account.balance}`);
  }
}

class Withdrawal extends Transaction {
  constructor(amount) {
    super(amount);
  }

  execute(account) {
    if (this.amount > account.balance) {
      console.log("Insufficient funds");
    } else {
      account.balance -= this.amount;
      console.log(`Withdrew $${this.amount}. New balance: $${account.balance}`);
    }
  }
}

class Account {
  constructor(number, balance = 0) {
    this.number = number;
    this.balance = balance;
  }
}

class SavingsAccount extends Account {
  constructor(number, balance = 0) {
    super(number, balance);
  }

  addInterest(rate) {
    const interest = this.balance * rate / 100;
    this.balance += interest;
    console.log(`Added interest: $${interest}. New balance: $${this.balance}`);
  }
}

class LoanAccount extends Account {
  constructor(number, balance = 0) {
    super(number, balance);
  }

  addInterest(rate) {
    console.log("To be implemented");
  }
}

class API {
  constructor() {
    this.accounts = [];
  }

  createAccount(type, number, balance = 0) {
    let account;
    if (type === 'savings') {
      account = new SavingsAccount(number, balance);
    } else if (type === 'loan') {
      account = new LoanAccount(number, balance);
    } else {
      throw new Error('Unsupported account type');
    }
    this.accounts.push(account);
    return account;
  }

  performTransaction(accountNumber, transactionType, amount) {
    const account = this.accounts.find(acc => acc.number === accountNumber);
    if (!account) {
      throw new Error('Account not found');
    }

    let transaction;
    if (transactionType === 'deposit') {
      transaction = new Deposit(amount);
    } else if (transactionType === 'withdrawal') {
      transaction = new Withdrawal(amount);
    } else {
      throw new Error('Unsupported transaction type');
    }

    transaction.execute(account);
    return account.balance;
  }
}

module.exports = { API };