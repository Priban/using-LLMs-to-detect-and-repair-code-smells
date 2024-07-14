class Account {
  constructor(accountId, owner, balance) {
      this.accountId = accountId;
      this.owner = owner;
      this.balance = balance;
  }

  withdraw(amount) {
      if (this.balance < amount) {
          throw new Error("Insufficient balance");
      }
      this.balance -= amount;
  }

  deposit(amount) {
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

  performTransaction(senderId, receiverId, amount) {
      try {
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

          senderAccount.withdraw(amount);
          receiverAccount.deposit(amount);

          this.logTransaction(senderAccount, receiverAccount, amount);
          console.log(`Transaction complete: ${senderAccount.owner} to ${receiverAccount.owner}, Amount: $${amount}`);
          return true;
      } catch (error) {
          console.log(error.message);
          return false;
      }
  }

  logTransaction(senderAccount, receiverAccount, amount) {
      this.transactionLogs.push({
          from: senderAccount.accountId,
          to: receiverAccount.accountId,
          amount: amount,
          date: new Date()
      });
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