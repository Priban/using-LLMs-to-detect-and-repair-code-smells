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
  constructor(owner, balance, employeeId, department) {
    this.owner = owner;
    this.balance = balance;
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

  getBalance() {
    console.log(`The balance for ${this.owner} is ${this.balance}`);
    return this.balance;
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

    switch (action) {
      case 'deposit':
        this.deposit(account, amount);
        break;
      case 'withdraw':
        this.withdraw(account, amount);
        break;
      case 'getBalance':
        return this.getBalance(account);
      case 'getEmployeeDetails':
        this.getEmployeeDetails(account);
        break;
      default:
        throw new Error('Unsupported action or account type for this action');
    }
  }

  deposit(account, amount) {
    if (account instanceof BankAccount) {
      account.deposit(amount);
    } else {
      throw new Error('Unsupported action or account type for this action');
    }
  }

  withdraw(account, amount) {
    if (account instanceof BankAccount) {
      account.withdraw(amount);
    } else {
      throw new Error('Unsupported action or account type for this action');
    }
  }

  getBalance(account) {
    return account.getBalance();
  }

  getEmployeeDetails(account) {
    if (account instanceof EmployeeAccount) {
      account.getEmployeeDetails();
    } else {
      throw new Error('Unsupported action or account type for this action');
    }
  }
}

module.exports = { API };