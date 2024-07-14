class Transaction {
  constructor(description, amountWithCurrency) {
      this.description = description;
      this.amountWithCurrency = amountWithCurrency;
  }

  getAmount() {
      return parseFloat(this.amountWithCurrency.substring(1));
  }

  getCurrency() {
      return this.amountWithCurrency.charAt(0);
  }

  printTransaction() {
      console.log(`Transaction: ${this.description}, Amount: ${this.amountWithCurrency}`);
  }
}

class BankAccount {
  constructor(accountNumber, accountHolder) {
      this.accountNumber = accountNumber; 
      this.accountHolder = accountHolder;
      this.transactions = [];
  }

  addTransaction(description, amountWithCurrency) {
      const transaction = new Transaction(description, amountWithCurrency);
      this.transactions.push(transaction);
      console.log(`Added transaction: ${description}, Amount: ${amountWithCurrency}`);
  }

  getBalance() {
      let balance = 0.0;
      this.transactions.forEach(transaction => {
          if (transaction.getCurrency() === '$') { 
              balance += transaction.getAmount();
          } else {
              console.log(`Unsupported currency: ${transaction.getCurrency()}`);
          }
      });
      return `$${balance.toFixed(2)}`;
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