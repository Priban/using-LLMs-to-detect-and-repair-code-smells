class Customer {
  constructor(customerId, name, address, phoneNumber) {
    this.customerId = customerId;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.accounts = [];
  }

  updateDetails(name, address, phoneNumber) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  addAccount(account) {
    this.accounts.push(account);
  }
}

class Account {
  constructor(accountId, accountType) {
    this.accountId = accountId;
    this.accountType = accountType;
    this.balance = 0;
    this.transactions = [];
  }

  updateType(accountType) {
    this.accountType = accountType;
  }

  deposit(amount) {
    this.balance += amount;
    this.addTransaction('deposit', amount);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      this.addTransaction('withdrawal', amount);
    }
  }

  transfer(toAccount, amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      toAccount.balance += amount;
      this.addTransaction('transfer', amount, toAccount.accountId);
      toAccount.addTransaction('transfer', amount, this.accountId);
    }
  }

  addTransaction(type, amount, toAccountId = null) {
    const transaction = new Transaction(this.accountId, type, amount, toAccountId);
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(accountId, type, amount, toAccountId = null) {
    this.transactionId = Transaction.incrementId();
    this.accountId = accountId;
    this.type = type;
    this.amount = amount;
    this.date = new Date();
    this.toAccountId = toAccountId;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

class BankSystem {
  constructor() {
    this.customers = [];
    this.accounts = [];
  }

  addCustomer(customerId, name, address, phoneNumber) {
    const customer = new Customer(customerId, name, address, phoneNumber);
    this.customers.push(customer);
  }

  getCustomer(customerId) {
    return this.customers.find(cust => cust.customerId === customerId);
  }

  updateCustomer(customerId, name, address, phoneNumber) {
    const customer = this.getCustomer(customerId);
    if (customer) {
      customer.updateDetails(name, address, phoneNumber);
    }
  }

  createAccount(customerId, accountId, accountType) {
    const customer = this.getCustomer(customerId);
    if (customer) {
      const account = new Account(accountId, accountType);
      customer.addAccount(account);
      this.accounts.push(account);
    }
  }

  getAccount(accountId) {
    return this.accounts.find(acc => acc.accountId === accountId);
  }

  updateAccount(accountId, accountType) {
    const account = this.getAccount(accountId);
    if (account) {
      account.updateType(accountType);
    }
  }

  deposit(accountId, amount) {
    const account = this.getAccount(accountId);
    if (account) {
      account.deposit(amount);
    }
  }

  withdraw(accountId, amount) {
    const account = this.getAccount(accountId);
    if (account) {
      account.withdraw(amount);
    }
  }

  transfer(fromAccountId, toAccountId, amount) {
    const fromAccount = this.getAccount(fromAccountId);
    const toAccount = this.getAccount(toAccountId);
    if (fromAccount && toAccount) {
      fromAccount.transfer(toAccount, amount);
    }
  }

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