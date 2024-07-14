class Customer {
  constructor(name, savingsBalance, checkingBalance) {
      this.name = name;
      this.savingsBalance = savingsBalance;
      this.checkingBalance = checkingBalance;
  }

  getName() {
      return this.name;
  }

  getSavingsBalance() {
      return this.savingsBalance;
  }

  getCheckingBalance() {
      return this.checkingBalance;
  }
}

class BankingService {
  constructor() {}

  calculateTotalBalance(customer) {
      const savingsBalance = customer.getSavingsBalance();
      const checkingBalance = customer.getCheckingBalance();
      const totalBalance = savingsBalance + checkingBalance;
      return totalBalance;
  }

  printCustomerDetails(customer) {
      const name = customer.getName();
      const totalBalance = this.calculateTotalBalance(customer);
      console.log(`Customer: ${name}, Total Balance: ${totalBalance}`);
  }
}

class API {
  constructor() {
      this.bankingService = new BankingService();
  }

  createCustomer(name, savingsBalance, checkingBalance) {
      return new Customer(name, savingsBalance, checkingBalance);
  }

  getTotalBalance(customer) {
      return this.bankingService.calculateTotalBalance(customer);
  }

  printDetails(customer) {
      this.bankingService.printCustomerDetails(customer);
  }
}

module.exports = { API };