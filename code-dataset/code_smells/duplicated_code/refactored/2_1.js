class Transaction {
  constructor(type, amount, date, details) {
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.details = details;
  }

  toString() {
    return `${this.date.toLocaleString()}: ${this.type} of ${this.amount}`;
  }
}

class BankAccount {
  constructor(accountNumber, initialBalance) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.transactionHistory = [];
  }

  canProcessTransaction(amount) {
    if (amount > this.balance) {
      console.log('Insufficient funds');
      return false;
    }
    return true;
  }

  processTransaction(amount, details, type) {
    this.balance -= amount;
    this.transactionHistory.push(new Transaction(type, amount, new Date(), details));
    console.log(`${type} of ${amount}. New balance: ${this.balance}`);
    return true;
  }

  transferFunds(amount, toAccount) {
    if (!this.canProcessTransaction(amount)) return false;
    this.balance -= amount;
    toAccount.balance += amount;
    this.transactionHistory.push(new Transaction('transfer', amount, new Date(), { toAccount: toAccount.accountNumber }));
    console.log(`Transferred ${amount} to account ${toAccount.accountNumber}. New balance: ${this.balance}`);
    return true;
  }

  payBill(amount, biller) {
    if (!this.canProcessTransaction(amount)) return false;
    return this.processTransaction(amount, { biller: biller }, 'bill payment');
  }

  printTransactionHistory() {
    console.log('Transaction History:');
    this.transactionHistory.forEach((transaction) => {
      console.log(transaction.toString());
    });
  }
}

class API {
  constructor() {
    this.accounts = {};
  }

  createAccount(accountNumber, initialBalance) {
    if (this.accounts[accountNumber]) {
      console.log('Account already exists');
      return false;
    }
    this.accounts[accountNumber] = new BankAccount(accountNumber, initialBalance);
    return true;
  }

  transferFunds(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this.accounts[fromAccountNumber];
    const toAccount = this.accounts[toAccountNumber];
    if (!fromAccount || !toAccount) {
      console.log('One or both accounts not found');
      return false;
    }
    return fromAccount.transferFunds(amount, toAccount);
  }

  payBill(accountNumber, amount, biller) {
    const account = this.accounts[accountNumber];
    if (!account) {
      console.log('Account not found');
      return false;
    }
    return account.payBill(amount, biller);
  }

  printTransactionHistory(accountNumber) {
    const account = this.accounts[accountNumber];
    if (!account) {
      console.log('Account not found');
      return;
    }
    account.printTransactionHistory();
  }
}

module.exports = { API };