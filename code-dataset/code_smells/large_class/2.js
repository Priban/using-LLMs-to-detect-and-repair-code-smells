class BankSystem {
  constructor() {
      this.customers = [];
      this.accounts = [];
      this.transactions = [];
  }

  // Customer Management
  addCustomer(customerId, name, address, phoneNumber) {
      const customer = {
          customerId,
          name,
          address,
          phoneNumber,
          accounts: []
      };
      this.customers.push(customer);
  }

  getCustomer(customerId) {
      return this.customers.find(cust => cust.customerId === customerId);
  }

  updateCustomer(customerId, newName, newAddress, newPhoneNumber) {
      const customer = this.getCustomer(customerId);
      if (customer) {
          customer.name = newName;
          customer.address = newAddress;
          customer.phoneNumber = newPhoneNumber;
      }
  }

  // Account Management
  createAccount(customerId, accountId, accountType) {
      const customer = this.getCustomer(customerId);
      if (customer) {
          const account = {
              accountId,
              accountType,
              balance: 0,
              transactions: []
          };
          customer.accounts.push(account);
          this.accounts.push(account);
      }
  }

  getAccount(accountId) {
      return this.accounts.find(acc => acc.accountId === accountId);
  }

  updateAccount(accountId, newAccountType) {
      const account = this.getAccount(accountId);
      if (account) {
          account.accountType = newAccountType;
      }
  }

  // Transaction Management
  deposit(accountId, amount) {
      const account = this.getAccount(accountId);
      if (account) {
          account.balance += amount;
          const transaction = {
              transactionId: this.transactions.length + 1,
              accountId,
              type: 'deposit',
              amount,
              date: new Date()
          };
          account.transactions.push(transaction);
          this.transactions.push(transaction);
      }
  }

  withdraw(accountId, amount) {
      const account = this.getAccount(accountId);
      if (account && account.balance >= amount) {
          account.balance -= amount;
          const transaction = {
              transactionId: this.transactions.length + 1,
              accountId,
              type: 'withdrawal',
              amount,
              date: new Date()
          };
          account.transactions.push(transaction);
          this.transactions.push(transaction);
      }
  }

  transfer(fromAccountId, toAccountId, amount) {
      const fromAccount = this.getAccount(fromAccountId);
      const toAccount = this.getAccount(toAccountId);
      if (fromAccount && toAccount && fromAccount.balance >= amount) {
          fromAccount.balance -= amount;
          toAccount.balance += amount;
          const transaction = {
              transactionId: this.transactions.length + 1,
              fromAccountId,
              toAccountId,
              type: 'transfer',
              amount,
              date: new Date()
          };
          fromAccount.transactions.push(transaction);
          toAccount.transactions.push(transaction);
          this.transactions.push(transaction);
      }
  }

  // Reporting
  getCustomerAccounts(customerId) {
      const customer = this.getCustomer(customerId);
      return customer ? customer.accounts : [];
  }

  getAccountTransactions(accountId) {
      const account = this.getAccount(accountId);
      return account ? account.transactions : [];
  }

  generateCustomerReport(customerId) {
      const customer = this.getCustomer(customerId);
      if (customer) {
          return {
              customerId: customer.customerId,
              name: customer.name,
              accounts: customer.accounts.map(account => ({
                  accountId: account.accountId,
                  accountType: account.accountType,
                  balance: account.balance,
                  transactions: account.transactions
              }))
          };
      }
      return null;
  }

  generateAccountReport(accountId) {
      const account = this.getAccount(accountId);
      if (account) {
          return {
              accountId: account.accountId,
              accountType: account.accountType,
              balance: account.balance,
              transactions: account.transactions
          };
      }
      return null;
  }
}

class API {
  constructor() {
      this.bankSystem = new BankSystem();
  }

  addCustomer(customerId, name, address, phoneNumber) {
      this.bankSystem.addCustomer(customerId, name, address, phoneNumber);
  }

  createAccount(customerId, accountId, accountType) {
      this.bankSystem.createAccount(customerId, accountId, accountType);
  }

  deposit(accountId, amount) {
      this.bankSystem.deposit(accountId, amount);
  }

  withdraw(accountId, amount) {
      this.bankSystem.withdraw(accountId, amount);
  }

  transfer(fromAccountId, toAccountId, amount) {
      this.bankSystem.transfer(fromAccountId, toAccountId, amount);
  }

  generateCustomerReport(customerId) {
      return this.bankSystem.generateCustomerReport(customerId);
  }

  generateAccountReport(accountId) {
      return this.bankSystem.generateAccountReport(accountId);
  }
}

module.exports = { API };