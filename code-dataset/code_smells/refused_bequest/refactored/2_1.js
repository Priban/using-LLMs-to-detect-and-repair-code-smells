class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this.balance}`);
      return true;
    } else {
      console.log("Deposit amount must be positive");
      return false;
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
      return true;
    } else {
      console.log("Invalid withdraw amount");
      return false;
    }
  }

  getBalance() {
    console.log(`The balance for ${this.owner} is ${this.balance}`);
    return this.balance;
  }
}

class EmployeeAccount {
  constructor(owner, employeeId, department) {
    this.owner = owner;
    this.employeeId = employeeId;
    this.department = department;
  }

  deposit() {
    console.log("Deposits are not applicable for Employee Account");
    return false;
  }

  withdraw() {
    console.log("Withdrawals are not applicable for Employee Account");
    return false;
  }

  getBalance() {
    console.log(`The balance for ${this.owner} is 0`);
    return 0;
  }

  getEmployeeDetails() {
    console.log(`Employee ID: ${this.employeeId}, Department: ${this.department}`);
  }
}

class API {
  constructor() {
    this.accounts = [];
  }

  createBankAccount(owner, balance) {
    const account = new BankAccount(owner, balance);
    this.accounts.push(account);
  }

  createEmployeeAccount(owner, employeeId, department) {
    const account = new EmployeeAccount(owner, employeeId, department);
    this.accounts.push(account);
  }

  depositToBankAccount(accountIndex, amount) {
    const account = this.getAccount(accountIndex, BankAccount);
    account.deposit(amount);
  }

  withdrawFromBankAccount(accountIndex, amount) {
    const account = this.getAccount(accountIndex, BankAccount);
    account.withdraw(amount);
  }

  getBankAccountBalance(accountIndex) {
    const account = this.getAccount(accountIndex, BankAccount);
    return account.getBalance();
  }

  getEmployeeAccountDetails(accountIndex) {
    const account = this.getAccount(accountIndex, EmployeeAccount);
    account.getEmployeeDetails();
  }

  getAccount(index, type) {
    const account = this.accounts[index];
    if (!account || !(account instanceof type)) {
      throw new Error('Account not found or type mismatch');
    }
    return account;
  }
}

module.exports = { API };