class SavingsAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    depositAmount(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount} into SavingsAccount. New balance: ${this.balance}`);
    }

    withdrawAmount(amount) {
        if (amount > this.balance) {
            console.log('Insufficient funds in SavingsAccount.');
        } else {
            this.balance -= amount;
            console.log(`Withdrew ${amount} from SavingsAccount. New balance: ${this.balance}`);
        }
    }

    getBalance() {
        return this.balance;
    }
}

class CheckingAccount {
    constructor(accountID, funds) {
        this.accountID = accountID;
        this.funds = funds;
    }

    addMoney(amount) {
        this.funds += amount;
        console.log(`Added ${amount} to CheckingAccount. New funds: ${this.funds}`);
    }

    withdrawMoney(amount) {
        if (amount > this.funds) {
            console.log('Insufficient funds in CheckingAccount.');
        } else {
            this.funds -= amount;
            console.log(`Withdrew ${amount} from CheckingAccount. New funds: ${this.funds}`);
        }
    }

    currentFunds() {
        return this.funds;
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

    createCheckingAccount(accountID, funds) {
        const account = new CheckingAccount(accountID, funds);
        this.checkingAccounts.push(account);
        return account;
    }

    depositToSavings(accountNumber, amount) {
        const account = this.savingsAccounts.find(acc => acc.accountNumber === accountNumber);
        if (account) {
            account.depositAmount(amount);
            return account.getBalance();
        } else {
            throw new Error('Savings account not found');
        }
    }

    withdrawFromSavings(accountNumber, amount) {
        const account = this.savingsAccounts.find(acc => acc.accountNumber === accountNumber);
        if (account) {
            account.withdrawAmount(amount);
            return account.getBalance();
        } else {
            throw new Error('Savings account not found');
        }
    }

    addMoneyToChecking(accountID, amount) {
        const account = this.checkingAccounts.find(acc => acc.accountID === accountID);
        if (account) {
            account.addMoney(amount);
            return account.currentFunds();
        } else {
            throw new Error('Checking account not found');
        }
    }

    withdrawFromChecking(accountID, amount) {
        const account = this.checkingAccounts.find(acc => acc.accountID === accountID);
        if (account) {
            account.withdrawMoney(amount);
            return account.currentFunds();
        } else {
            throw new Error('Checking account not found');
        }
    }

    getSavingsAccountBalance(accountNumber) {
        const account = this.savingsAccounts.find(acc => acc.accountNumber === accountNumber);
        return account ? account.getBalance() : null;
    }

    getCheckingAccountFunds(accountID) {
        const account = this.checkingAccounts.find(acc => acc.accountID === accountID);
        return account ? account.currentFunds() : null;
    }
}

module.exports = { API };