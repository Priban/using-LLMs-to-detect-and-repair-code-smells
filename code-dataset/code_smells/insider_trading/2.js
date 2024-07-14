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
        if (this.type === 'deposit') {
            this.account.balance += this.amount;
            this.status = 'Completed';
        } else if (this.type === 'withdrawal') {
            if (this.account.balance >= this.amount) {
                this.account.balance -= this.amount;
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
            this.account.balance -= monthlyInterest;
            return monthlyInterest;
        }
        return 0;
    }

    repay(amount) {
        if (this.status === 'Active') {
            if (amount >= this.balance) {
                this.account.balance -= this.balance;
                this.balance = 0;
                this.status = 'Paid off';
            } else {
                this.account.balance -= amount;
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

class API {
    constructor() {
        this.accounts = [];
        this.transactions = [];
        this.loans = [];
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

    processDeposit(accountId, amount) {
        const account = this.accounts.find(acc => acc.accountId === accountId);
        if (account) {
            const transaction = new Transaction(this.transactions.length + 1, account, amount, 'deposit');
            transaction.processTransaction();
            this.transactions.push(transaction);
            return `Deposit of ${amount} to account ${accountId} completed`;
        }
        return "Account not found";
    }

    processWithdrawal(accountId, amount) {
        const account = this.accounts.find(acc => acc.accountId === accountId);
        if (account) {
            const transaction = new Transaction(this.transactions.length + 1, account, amount, 'withdrawal');
            transaction.processTransaction();
            this.transactions.push(transaction);
            if (transaction.status === 'Completed') {
                return `Withdrawal of ${amount} from account ${accountId} completed`;
            } else {
                return "Insufficient funds";
            }
        }
        return "Account not found";
    }

    createLoan(accountId, principal, interestRate, termInMonths) {
        const account = this.accounts.find(acc => acc.accountId === accountId);
        if (account) {
            const loan = new Loan(this.loans.length + 1, account, principal, interestRate, termInMonths);
            account.addLoan(loan);
            this.loans.push(loan);
            return loan;
        }
        return "Account not found";
    }

    generateAccountStatement(accountId) {
        const account = this.accounts.find(acc => acc.accountId === accountId);
        if (account) {
            return Report.generateAccountStatement(account);
        }
        return "Account not found";
    }
}

module.exports = { API };