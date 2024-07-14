class BankAccount {
  constructor(accountNumber, accountHolderName, balance, branchName, branchAddress, branchNote) {
    this.accountNumber = accountNumber;
    this.accountHolderName = accountHolderName;
    this.balance = balance;
    this.branchName = branchName;
    this.branchAddress = branchAddress;
    this.branchNote = branchNote;
  }

  deposit(amount) {
    this.balance += amount;
    return `Deposited ${amount}. New balance is ${this.balance}.`;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return `Withdrew ${amount}. New balance is ${this.balance}.`;
    } else {
      return 'Insufficient balance.';
    }
  }

  transfer(toAccount, amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      toAccount.deposit(amount);
      return `Transferred ${amount} to account number ${toAccount.accountNumber}. New balance is ${this.balance}.`;
    } else {
      return 'Insufficient balance.';
    }
  }
}

class BankService {
  constructor() {
    this.accounts = {};
  }

  addAccount(account) {
    this.accounts[account.accountNumber] = account;
  }

  getAccount(accountNumber) {
    return this.accounts[accountNumber];
  }

  deposit(accountNumber, amount) {
    const account = this.getAccount(accountNumber);
    if (account) {
      return account.deposit(amount);
    } else {
      return 'Account not found.';
    }
  }

  withdraw(accountNumber, amount) {
    const account = this.getAccount(accountNumber);
    if (account) {
      return account.withdraw(amount);
    } else {
      return 'Account not found.';
    }
  }

  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this.getAccount(fromAccountNumber);
    const toAccount = this.getAccount(toAccountNumber);
    if (fromAccount && toAccount) {
      return fromAccount.transfer(toAccount, amount);
    } else {
      return 'One or both accounts not found.';
    }
  }
}

class API {
  constructor() {
    this.bankService = new BankService();
  }

  addAccount(accountNumber, accountHolderName, balance, branchName, branchAddress, branchNote) {
    const account = new BankAccount(accountNumber, accountHolderName, balance, branchName, branchAddress, branchNote);
    this.bankService.addAccount(account);
  }

  deposit(accountNumber, amount) {
    return this.bankService.deposit(accountNumber, amount);
  }

  withdraw(accountNumber, amount) {
    return this.bankService.withdraw(accountNumber, amount);
  }

  transfer(fromAccountNumber, toAccountNumber, amount) {
    return this.bankService.transfer(fromAccountNumber, toAccountNumber, amount);
  }
}

module.exports = { API };