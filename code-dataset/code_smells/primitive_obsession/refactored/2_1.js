class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  static fromString(amountWithCurrency) {
    const currency = amountWithCurrency.charAt(0);
    const amount = parseFloat(amountWithCurrency.substring(1));
    return new Money(amount, currency);
  }

  toString() {
    return `${this.currency}${this.amount.toFixed(2)}`;
  }
}

class Transaction {
  constructor(description, money) {
    this.description = description;
    this.money = money;
  }

  printTransaction() {
    console.log(`Transaction: ${this.description}, Amount: ${this.money.toString()}`);
  }
}

class BankAccount {
  constructor(accountNumber, accountHolder) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.transactions = [];
  }

  addTransaction(description, amountWithCurrency) {
    const money = Money.fromString(amountWithCurrency);
    const transaction = new Transaction(description, money);
    this.transactions.push(transaction);
    console.log(`Added transaction: ${description}, Amount: ${money.toString()}`);
  }

  getBalance() {
    const balance = this.calculateBalance();
    return `$${balance.toFixed(2)}`;
  }

  calculateBalance() {
    let balance = 0.0;
    this.transactions.forEach(transaction => {
      if (transaction.money.currency === '$') {
        balance += transaction.money.amount;
      } else {
        console.log(`Unsupported currency: ${transaction.money.currency}`);
      }
    });
    return balance;
  }

  printAccountSummary() {
    console.log(`Account Number: ${this.accountNumber}, Account Holder: ${this.accountHolder}`);
    console.log('Transactions:');
    this.transactions.forEach(transaction => transaction.printTransaction());
    console.log(`Current Balance: ${this.getBalance()}`);
  }
}

class API {
  constructor() {
    this.bankAccount = null;
  }

  createAccount(accountNumber, accountHolder) {
    this.bankAccount = new BankAccount(accountNumber, accountHolder);
  }

  addTransaction(description, amountWithCurrency) {
    if (this.bankAccount) {
      this.bankAccount.addTransaction(description, amountWithCurrency);
    } else {
      throw new Error('Bank account not created');
    }
  }

  getBalance() {
    if (this.bankAccount) {
      return this.bankAccount.getBalance();
    } else {
      throw new Error('Bank account not created');
    }
  }

  printAccountSummary() {
    if (this.bankAccount) {
      this.bankAccount.printAccountSummary();
    } else {
      throw new Error('Bank account not created');
    }
  }
}

module.exports = { API };