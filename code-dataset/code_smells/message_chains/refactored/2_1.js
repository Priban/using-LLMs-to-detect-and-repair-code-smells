class Funds {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      throw new Error("Insufficient funds");
    }
  }

  getBalance() {
    return this.balance;
  }
}

class Account {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.funds = new Funds(balance);
  }

  deposit(amount) {
    this.funds.deposit(amount);
  }

  withdraw(amount) {
    this.funds.withdraw(amount);
  }

  getBalance() {
    return this.funds.getBalance();
  }
}

class Customer {
  constructor(name, accountNumber, initialBalance) {
    this.name = name;
    this.account = new Account(accountNumber, initialBalance);
  }

  getName() {
    return this.name;
  }

  getAccountBalance() {
    return this.account.getBalance();
  }

  depositToAccount(amount) {
    this.account.deposit(amount);
  }

  withdrawFromAccount(amount) {
    this.account.withdraw(amount);
  }
}

class Bank {
  constructor() {
    this.customers = [];
  }

  addCustomer(customer) {
    this.customers.push(customer);
  }

  getCustomerByName(name) {
    return this.customers.find(customer => customer.getName() === name);
  }

  deposit(name, amount) {
    const customer = this.getCustomerByName(name);
    if (customer) {
      customer.depositToAccount(amount);
    } else {
      throw new Error("Customer not found");
    }
  }

  withdraw(name, amount) {
    const customer = this.getCustomerByName(name);
    if (customer) {
      customer.withdrawFromAccount(amount);
    } else {
      throw new Error("Customer not found");
    }
  }

  getBalance(name) {
    const customer = this.getCustomerByName(name);
    if (customer) {
      return customer.getAccountBalance();
    } else {
      throw new Error("Customer not found");
    }
  }
}

class API {
  constructor() {
    this.bank = new Bank();
  }

  addCustomer(name, accountNumber, initialBalance) {
    const customer = new Customer(name, accountNumber, initialBalance);
    this.bank.addCustomer(customer);
  }

  deposit(name, amount) {
    this.bank.deposit(name, amount);
  }

  withdraw(name, amount) {
    this.bank.withdraw(name, amount);
  }

  getBalance(name) {
    return this.bank.getBalance(name);
  }
}

module.exports = { API };