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

  getEmployeeDetails() {
    console.log(`Employee ID: ${this.employeeId}, Department: ${this.department}`);
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
}

class AccountManager {
  constructor() {
    this.accounts = [];
  }

  createAccount(type, owner, balance, employeeId, department) {
    let account;
    if (type === 'bank') {
      account = new BankAccount(owner, balance);
    } else if (type === 'employee') {
      account = new EmployeeAccount(owner, employeeId, department);
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
        if (account instanceof BankAccount) {
          account.deposit(amount);
        } else {
          throw new Error('Unsupported action for this account type');
        }
        break;
      case 'withdraw':
        if (account instanceof BankAccount) {
          account.withdraw(amount);
        } else {
          throw new Error('Unsupported action for this account type');
        }
        break;
      case 'getBalance':
        return account.getBalance();
      case 'getEmployeeDetails':
        if (account instanceof EmployeeAccount) {
          account.getEmployeeDetails();
        } else {
          throw new Error('Unsupported action for this account type');
        }
        break;
      default:
        throw new Error('Unsupported action');
    }
  }
}

module.exports = { AccountManager };