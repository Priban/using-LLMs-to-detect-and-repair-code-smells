class Account {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount} into ${this.constructor.name}. New balance: ${this.balance}`);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log(`Insufficient funds in ${this.constructor.name}.`);
        } else {
            this.balance -= amount;
            console.log(`Withdrew ${amount} from ${this.constructor.name}. New balance: ${this.balance}`);
        }
    }

    getBalance() {
        return this.balance;
    }
}

class SavingsAccount extends Account {
    constructor(accountNumber, balance) {
        super(accountNumber, balance);
    }
}

class CheckingAccount extends Account {
    constructor(accountNumber, balance) {
        super(accountNumber, balance);
    }
}

class API {
    constructor() {
        this.savingsAccounts = [];
        this.checkingAccounts = [];
    }

    createSavingsAccount(accountNumber, balance) {
        const account = new SavingsAccount(accountNumber, balance);
        this.savingsAccounts.push(account);
        return account;
    }

    createCheckingAccount(accountNumber, balance) {
        const account = new CheckingAccount(accountNumber, balance);
        this.checkingAccounts.push(account);
        return account;
    }

    depositToAccount(accounts, accountNumber, amount) {
        const account = accounts.find(acc => acc.accountNumber === accountNumber);
        if (account) {
            account.deposit(amount);
            return account.getBalance();
        } else {
            throw new Error(`${account.constructor.name} not found`);
        }
    }

    withdrawFromAccount(accounts, accountNumber, amount) {
        const account = accounts.find(acc => acc.accountNumber === accountNumber);
        if (account) {
            account.withdraw(amount);
            return account.getBalance();
        } else {
            throw new Error(`${account.constructor.name} not found`);
        }
    }

    getAccountBalance(accounts, accountNumber) {
        const account = accounts.find(acc => acc.accountNumber === accountNumber);
        return account ? account.getBalance() : null;
    }

    depositToSavings(accountNumber, amount) {
        return this.depositToAccount(this.savingsAccounts, accountNumber, amount);
    }

    withdrawFromSavings(accountNumber, amount) {
        return this.withdrawFromAccount(this.savingsAccounts, accountNumber, amount);
    }

    addMoneyToChecking(accountNumber, amount) {
        return this.depositToAccount(this.checkingAccounts, accountNumber, amount);
    }

    withdrawFromChecking(accountNumber, amount) {
        return this.withdrawFromAccount(this.checkingAccounts, accountNumber, amount);
    }

    getSavingsAccountBalance(accountNumber) {
        return this.getAccountBalance(this.savingsAccounts, accountNumber);
    }

    getCheckingAccountFunds(accountNumber) {
        return this.getAccountBalance(this.checkingAccounts, accountNumber);
    }
}

module.exports = { API };