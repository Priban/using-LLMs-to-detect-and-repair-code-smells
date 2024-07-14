class Account {
  constructor(accountId, holderName, holderAddress, balance, branch) {
    this.accountId = accountId;
    this.holderName = holderName;
    this.holderAddress = holderAddress;
    this.balance = balance;
    this.branch = branch;
  }

  processTransaction(transactionDetails) {
    let finalAmount = transactionDetails.amount;
    if (transactionDetails.currency !== 'USD') {
      finalAmount = transactionDetails.amount * transactionDetails.exchangeRate;
    }
    finalAmount -= transactionDetails.fee;

    if (transactionDetails.transactionType === 'withdrawal' && this.balance < finalAmount) {
      console.log("Insufficient balance for the transaction.");
      return false;
    }

    if (transactionDetails.transactionType === 'deposit') {
      this.balance += finalAmount;
    } else if (transactionDetails.transactionType === 'withdrawal') {
      this.balance -= finalAmount;
    }

    console.log("Transaction successful! Updated account balance:", this.balance);
    return true;
  }
}

class TransactionDetails {
  constructor(transactionId, accountId, transactionType, amount, date, currency, exchangeRate, fee, description) {
    this.transactionId = transactionId;
    this.accountId = accountId;
    this.transactionType = transactionType;
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.exchangeRate = exchangeRate;
    this.fee = fee;
    this.description = description;
  }
}

class Bank {
  constructor() {
    this.accounts = {};
  }

  addAccount(account) {
    this.accounts[account.accountId] = account;
  }

  processTransaction(transactionDetails) {
    const account = this.accounts[transactionDetails.accountId];
    if (!account) {
      console.log("Account not found");
      return false;
    }
    return account.processTransaction(transactionDetails);
  }
}

class API {
  constructor() {
    this.bank = new Bank();
  }

  addAccount(accountId, holderName, holderAddress, balance, branch) {
    const account = new Account(accountId, holderName, holderAddress, balance, branch);
    this.bank.addAccount(account);
  }

  processTransaction(transactionId, accountId, transactionType, amount, date, currency, exchangeRate, fee, description) {
    const transactionDetails = new TransactionDetails(transactionId, accountId, transactionType, amount, date, currency, exchangeRate, fee, description);
    return this.bank.processTransaction(transactionDetails);
  }
}

module.exports = { API };