// TransactionType Enum
const TransactionType = Object.freeze({
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal'
});

class Account {
  constructor(accountId, accountHolder, balance) {
    this.accountId = accountId;
    this.accountHolder = accountHolder;
    this.balance = balance;
    this.loans = [];
  }

  addLoan(loan) {
    this.loans.push(loan);
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  toString() {
    return `Account(${this.accountId}, ${this.accountHolder}, Balance: ${this.balance})`;
  }
}

class Transaction {
  constructor(transactionId, account, amount, type) {
    this.transactionId = transactionId;
    this.account = account;
    this.amount = amount;
    this.type = type;
    this.status = 'Pending';
  }

  processTransaction() {
    if (this.type === TransactionType.DEPOSIT) {
      this.account.deposit(this.amount);
      this.status = 'Completed';
    } else if (this.type === TransactionType.WITHDRAWAL) {
      if (this.account.withdraw(this.amount)) {
        this.status = 'Completed';
      } else {
        this.status = 'Failed';
      }
    }
  }

  toString() {
    return `Transaction(${this.transactionId}, Account: ${this.account.accountId}, Amount: ${this.amount}, Type: ${this.type}, Status: ${this.status})`;
  }
}

class Loan {
  constructor(loanId, account, principal, interestRate, termInMonths) {
    this.loanId = loanId;
    this.account = account;
    this.principal = principal;
    this.interestRate = interestRate;
    this.termInMonths = termInMonths;
    this.balance = principal;
    this.status = 'Active';
  }

  calculateMonthlyInterest() {
    if (this.status === 'Active') {
      const monthlyInterest = (this.principal * this.interestRate) / 100 / 12;
      this.balance += monthlyInterest;
      this.account.withdraw(monthlyInterest);
      return monthlyInterest;
    }
    return 0;
  }

  repay(amount) {
    if (this.status === 'Active') {
      if (amount >= this.balance) {
        this.account.withdraw(this.balance);
        this.balance = 0;
        this.status = 'Paid off';
      } else {
        this.account.withdraw(amount);
        this.balance -= amount;
      }
    }
  }

  toString() {
    return `Loan(${this.loanId}, Account: ${this.account.accountId}, Principal: ${this.principal}, Balance: ${this.balance}, Status: ${this.status})`;
  }
}

class Report {
  static generateAccountStatement(account) {
    let statement = `Account Statement for ${account.accountHolder} (Account ID: ${account.accountId})\n`;
    statement += `Balance: ${account.balance}\n`;
    statement += `Loans:\n`;
    account.loans.forEach(loan => {
      statement += `  Loan ID: ${loan.loanId}, Balance: ${loan.balance}, Status: ${loan.status}\n`;
    });
    return statement;
  }
}

class AccountService {
  constructor() {
    this.accounts = [];
  }

  createAccount(accountId, accountHolder, initialBalance) {
    const account = new Account(accountId, accountHolder, initialBalance);
    this.accounts.push(account);
    return account;
  }

  getAccountInfo(accountId) {
    const account = this.accounts.find(acc => acc.accountId === accountId);
    if (account) {
      return `Account Holder: ${account.accountHolder}, Balance: ${account.balance}`;
    }
    return "Account not found";
  }

  findAccount(accountId) {
    return this.accounts.find(acc => acc.accountId === accountId);
  }
}

class TransactionService {
  constructor() {
    this.transactions = [];
  }

  processDeposit(account, amount) {
    const transaction = new Transaction(this.transactions.length + 1, account, amount, TransactionType.DEPOSIT);
    transaction.processTransaction();
    this.transactions.push(transaction);
    return transaction;
  }

  processWithdrawal(account, amount) {
    const transaction = new Transaction(this.transactions.length + 1, account, amount, TransactionType.WITHDRAWAL);
    transaction.processTransaction();
    this.transactions.push(transaction);
    return transaction;
  }
}

class LoanService {
  constructor() {
    this.loans = [];
  }

  createLoan(account, principal, interestRate, termInMonths) {
    const loan = new Loan(this.loans.length + 1, account, principal, interestRate, termInMonths);
    account.addLoan(loan);
    this.loans.push(loan);
    return loan;
  }
}

class API {
  constructor() {
    this.accountService = new AccountService();
    this.transactionService = new TransactionService();
    this.loanService = new LoanService();
  }

  createAccount(accountId, accountHolder, initialBalance) {
    return this.accountService.createAccount(accountId, accountHolder, initialBalance);
  }

  getAccountInfo(accountId) {
    return this.accountService.getAccountInfo(accountId);
  }

  processDeposit(accountId, amount) {
    const account = this.accountService.findAccount(accountId);
    if (account) {
      const transaction = this.transactionService.processDeposit(account, amount);
      return `Deposit of ${amount} to account ${accountId} completed`;
    }
    return "Account not found";
  }

  processWithdrawal(accountId, amount) {
    const account = this.accountService.findAccount(accountId);
    if (account) {
      const transaction = this.transactionService.processWithdrawal(account, amount);
      if (transaction.status === 'Completed') {
        return `Withdrawal of ${amount} from account ${accountId} completed`;
      } else {
        return "Insufficient funds";
      }
    }
    return "Account not found";
  }

  createLoan(accountId, principal, interestRate, termInMonths) {
    const account = this.accountService.findAccount(accountId);
    if (account) {
      return this.loanService.createLoan(account, principal, interestRate, termInMonths);
    }
    return "Account not found";
  }

  generateAccountStatement(accountId) {
    const account = this.accountService.findAccount(accountId);
    if (account) {
      return Report.generateAccountStatement(account);
    }
    return "Account not found";
  }
}

module.exports = { API };