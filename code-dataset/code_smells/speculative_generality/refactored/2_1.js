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

class BankAPI {
  constructor() {
    this.accounts = [];
  }

  createAccount(type, number, balance = 0) {
    const account = this._createAccountInstance(type, number, balance);
    this.accounts.push(account);
    return account;
  }

  _createAccountInstance(type, number, balance) {
    switch (type) {
      case 'savings':
        return new SavingsAccount(number, balance);
      case 'loan':
        return new LoanAccount(number, balance);
      default:
        throw new Error('Unsupported account type');
    }
  }

  performTransaction(accountNumber, transactionType, amount) {
    const account = this._findAccount(accountNumber);
    const transaction = this._createTransactionInstance(transactionType, amount);
    transaction.execute(account);
    return account.balance;
  }

  _findAccount(accountNumber) {
    const account = this.accounts.find(acc => acc.number === accountNumber);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  _createTransactionInstance(transactionType, amount) {
    switch (transactionType) {
      case 'deposit':
        return new Deposit(amount);
      case 'withdrawal':
        return new Withdrawal(amount);
      default:
        throw new Error('Unsupported transaction type');
    }
  }
}

module.exports = { API: BankAPI };