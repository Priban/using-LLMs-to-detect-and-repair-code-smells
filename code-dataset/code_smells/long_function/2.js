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

  performTransaction(senderId, receiverId, amount) {
      // Verify sender account
      let senderAccount = this.accounts.find(acc => acc.accountId === senderId);
      if (!senderAccount) {
          console.log("Sender account not found.");
          return false;
      }

      // Verify receiver account
      let receiverAccount = this.accounts.find(acc => acc.accountId === receiverId);
      if (!receiverAccount) {
          console.log("Receiver account not found.");
          return false;
      }

      // Check if sender has sufficient balance
      if (senderAccount.balance < amount) {
          console.log("Insufficient balance in sender's account.");
          return false;
      }

      // Deduct amount from sender
      senderAccount.deduct(amount);

      // Add amount to receiver
      receiverAccount.add(amount);

      // Log transaction complete
      console.log(`Transaction complete: ${senderAccount.owner} to ${receiverAccount.owner}, Amount: $${amount}`);

      // Save to database (mock)
      this.transactionLogs.push({
          from: senderAccount.accountId,
          to: receiverAccount.accountId,
          amount: amount,
          date: new Date()
      });

      return true;
  }

  getTransactionLogs() {
      return this.transactionLogs;
  }

  getAccountDetails(accountId) {
      let account = this.accounts.find(acc => acc.accountId === accountId);
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