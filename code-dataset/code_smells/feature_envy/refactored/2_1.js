class Balance {
  constructor(savings, checking) {
    this.savings = savings;
    this.checking = checking;
  }

  getTotalBalance() {
    return this.savings + this.checking;
  }
}

class Customer {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  getName() {
    return this.name;
  }

  getBalance() {
    return this.balance;
  }
}

class BankingService {
  constructor() {}

  printCustomerDetails(customer) {
    const name = customer.getName();
    const totalBalance = customer.getBalance().getTotalBalance();
    console.log(`Customer: ${name}, Total Balance: ${totalBalance}`);
  }
}

class API {
  constructor() {
    this.bankingService = new BankingService();
  }

  createCustomer(name, savingsBalance, checkingBalance) {
    const balance = new Balance(savingsBalance, checkingBalance);
    return new Customer(name, balance);
  }

  getTotalBalance(customer) {
    return customer.getBalance().getTotalBalance();
  }

  printDetails(customer) {
    this.bankingService.printCustomerDetails(customer);
  }
}

module.exports = { API };