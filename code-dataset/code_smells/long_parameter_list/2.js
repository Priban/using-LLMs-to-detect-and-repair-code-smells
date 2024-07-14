class Account {
  constructor(accountId, holderName, holderAddress, balance, branch) {
    this.accountId = accountId;
    this.holderName = holderName;
    this.holderAddress = holderAddress;
    this.balance = balance;
    this.branch = branch;
  }
}

class Transaction {
  constructor(
    transactionId,
    accountId,
    transactionType,
    amount,
    date,
    currency,
    exchangeRate,
    fee,
    description
  ) {
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

  processTransaction(
    transactionId,
    accountId,
    accountHolderName,
    accountHolderAddress,
    accountBalance,
    transactionType,
    transactionAmount,
    transactionDate,
    bankBranch,
    currency,
    exchangeRate,
    fee,
    description
  ) {
    let finalAmount = transactionAmount;
    if (currency !== 'USD') {
      finalAmount = transactionAmount * exchangeRate;
    }
    finalAmount -= fee;

    if (transactionType === 'withdrawal' && accountBalance < finalAmount) {
      console.log("Insufficient balance for the transaction.");
      return false;
    }

    if (transactionType === 'deposit') {
      accountBalance += finalAmount;
    } else if (transactionType === 'withdrawal') {
      accountBalance -= finalAmount;
    }

    console.log("Transaction successful! Updated account balance:", accountBalance);

    this.accounts[accountId].balance = accountBalance;
    return true;
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

  processTransaction(
    transactionId,
    accountId,
    transactionType,
    amount,
    date,
    currency,
    exchangeRate,
    fee,
    description
  ) {
    const account = this.bank.accounts[accountId];
    if (!account) {
      throw new Error("Account not found");
    }
    return this.bank.processTransaction(
      transactionId,
      account.accountId,
      account.holderName,
      account.holderAddress,
      account.balance,
      transactionType,
      amount,
      date,
      account.branch,
      currency,
      exchangeRate,
      fee,
      description
    );
  }
}

module.exports = { API };