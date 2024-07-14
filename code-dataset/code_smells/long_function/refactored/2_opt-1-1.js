class Account {
  constructor(accountId, owner, balance) {
    this.accountId = accountId;
    this.owner = owner;
    this.balance = balance;
  }

  deduct(amount) {
    this.balance -= amount;
  }

  add(amount) {
    this.balance += amount;
  }

  getDetails() {
    return {
      accountId: this.accountId,
      owner: this.owner,
      balance: this.balance
    };
  }
}

class Bank {
  constructor() {
    this.accounts = [
      new Account(1, "Alice", 1000),
      new Account(2, "Bob", 500)
    ];
    this.transactionLogs = [];
  }

  findAccountById(accountId) {
    return this.accounts.find(acc => acc.accountId === accountId);
  }

  logTransaction(senderId, receiverId, amount) {
    this.transactionLogs.push({
      from: senderId,
      to: receiverId,
      amount: amount,
      date: new Date()
    });
  }

  performTransaction(senderId, receiverId, amount) {
    const senderAccount = this.findAccountById(senderId);
    const receiverAccount = this.findAccountById(receiverId);

    if (!senderAccount) {
      console.log("Sender account not found.");
      return false;
    }

    if (!receiverAccount) {
      console.log("Receiver account not found.");
      return false;
    }

    if (senderAccount.balance < amount) {
      console.log("Insufficient balance in sender's account.");
      return false;
    }

    senderAccount.deduct(amount);
    receiverAccount.add(amount);

    console.log(`Transaction complete: ${senderAccount.owner} to ${receiverAccount.owner}, Amount: $${amount}`);
    this.logTransaction(senderId, receiverId, amount);

    return true;
  }

  getTransactionLogs() {
    return this.transactionLogs;
  }

  getAccountDetails(accountId) {
    const account = this.findAccountById(accountId);
    return account ? account.getDetails() : null;
  }
}

class API {
  constructor() {
    this.bank = new Bank();
  }

  performTransaction(senderId, receiverId, amount) {
    return this.bank.performTransaction(senderId, receiverId, amount);
  }

  getTransactionLogs() {
    return this.bank.getTransactionLogs();
  }

  getAccountDetails(accountId) {
    return this.bank.getAccountDetails(accountId);
  }
}

module.exports = { API };