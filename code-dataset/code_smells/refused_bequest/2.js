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

class EmployeeAccount extends BankAccount {
  constructor(owner, balance, employeeId, department) {
    super(owner, balance);
    this.employeeId = employeeId;
    this.department = department;
  }

  deposit(amount) {
    console.log("Deposits are not applicable for Employee Account");
    return false;
  }

  withdraw(amount) {
    console.log("Withdrawals are not applicable for Employee Account");
    return false;
  }

  getEmployeeDetails() {
    console.log(`Employee ID: ${this.employeeId}, Department: ${this.department}`);
  }
}

class API {
  constructor() {
    this.accounts = [];
  }

  createAccount(type, owner, balance, employeeId, department) {
    let account;
    if (type === 'bank') {
      account = new BankAccount(owner, balance);
    } else if (type === 'employee') {
      account = new EmployeeAccount(owner, balance, employeeId, department);
    } else {
      throw new Error('Unsupported account type');
    }
    this.accounts.push(account);
  }

  performAction(accountIndex, action, amount) {
    const account = this.accounts[accountIndex];
    if (!account) {
      throw new Error('Account not found');
    }

    if (action === 'deposit' && account instanceof BankAccount) {
      account.deposit(amount);
    } else if (action === 'withdraw' && account instanceof BankAccount) {
      account.withdraw(amount);
    } else if (action === 'getBalance') {
      return account.getBalance();
    } else if (action === 'getEmployeeDetails' && account instanceof EmployeeAccount) {
      account.getEmployeeDetails();
    } else {
      throw new Error('Unsupported action or account type for this action');
    }
  }
}

module.exports = { API };