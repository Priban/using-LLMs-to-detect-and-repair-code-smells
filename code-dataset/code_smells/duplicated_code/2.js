class BankAccount {
  constructor(accountNumber, initialBalance) {
      this.accountNumber = accountNumber;
      this.balance = initialBalance;
      this.transactionHistory = [];
  }

  transferFunds(amount, toAccount) {
      if (amount > this.balance) {
          console.log('Insufficient funds for transfer');
          return false;
      }

      this.balance -= amount;
      toAccount.balance += amount;

      this.transactionHistory.push({
          type: 'transfer',
          amount: amount,
          date: new Date(),
          toAccount: toAccount.accountNumber
      });

      console.log(`Transferred ${amount} to account ${toAccount.accountNumber}. New balance: ${this.balance}`);
      return true;
  }

  payBill(amount, biller) {
      if (amount > this.balance) {
          console.log('Insufficient funds for bill payment');
          return false;
      }

      this.balance -= amount;

      this.transactionHistory.push({
          type: 'bill payment',
          amount: amount,
          date: new Date(),
          biller: biller
      });

      console.log(`Paid ${amount} to ${biller}. New balance: ${this.balance}`);
      return true;
  }

  printTransactionHistory() {
      console.log('Transaction History:');
      this.transactionHistory.forEach((transaction) => {
          console.log(`${transaction.date.toLocaleString()}: ${transaction.type} of ${transaction.amount}`);
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