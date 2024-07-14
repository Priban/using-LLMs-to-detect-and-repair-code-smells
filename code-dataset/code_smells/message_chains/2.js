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

class AccountInfo {
  constructor(number, funds) {
      this.number = number;
      this.funds = funds;
  }

  getFunds() {
      return this.funds;
  }
}

class Account {
  constructor(accountNumber, balance) {
      this.accountDetails = new AccountDetails(accountNumber, balance);
  }

  getAccountInfo() {
      return this.accountDetails.getAccountInfo();
  }

  deposit(amount) {
      this.getAccountInfo().getFunds().deposit(amount);
  }

  withdraw(amount) {
      this.getAccountInfo().getFunds().withdraw(amount);
  }

  getBalance() {
      return this.getAccountInfo().getFunds().getBalance();
  }
}

class AccountDetails {
  constructor(accountNumber, balance) {
      this.accountInfo = new AccountInfo(accountNumber, new Funds(balance));
  }

  getAccountInfo() {
      return this.accountInfo;
  }
}

class CustomerInfo {
  constructor(name, account) {
      this.personalDetails = new PersonalDetails(name);
      this.banking = new Banking(account);
  }

  getPersonalDetails() {
      return this.personalDetails;
  }

  getBanking() {
      return this.banking;
  }
}

class PersonalDetails {
  constructor(name) {
      this.name = name;
  }

  getName() {
      return this.name;
  }
}

class Banking {
  constructor(account) {
      this.account = account;
  }

  getAccount() {
      return this.account;
  }
}

class Customer {
  constructor(name, account) {
      this.customerInfo = new CustomerInfo(name, account);
  }

  getCustomerInfo() {
      return this.customerInfo;
  }

  getName() {
      return this.getCustomerInfo().getPersonalDetails().getName();
  }

  getAccountBalance() {
      return this.getCustomerInfo().getBanking().getAccount().getBalance();
  }

  depositToAccount(amount) {
      this.getCustomerInfo().getBanking().getAccount().deposit(amount);
  }

  withdrawFromAccount(amount) {
      this.getCustomerInfo().getBanking().getAccount().withdraw(amount);
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
      const account = new Account(accountNumber, initialBalance);
      const customer = new Customer(name, account);
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