class Account {
    constructor(balance = 0) {
        this.balance = balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return `Deposited $${amount}. New balance is $${this.balance}.`;
        } else {
            return "Deposit amount must be positive.";
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return `Withdrew $${amount}. New balance is $${this.balance}.`;
        } else if (amount > this.balance) {
            return "Insufficient funds.";
        } else {
            return "Withdrawal amount must be positive.";
        }
    }

    transferTo(amount, targetAccount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            targetAccount.deposit(amount);
            return `Transferred $${amount} to target account. New balance is $${this.balance}.`;
        } else if (amount > this.balance) {
            return "Insufficient funds.";
        } else {
            return "Transfer amount must be positive.";
        }
    }

    getBalance() {
        return this.balance;
    }
}

class AccountService {
    constructor(account) {
        this.account = account;
    }

    deposit(amount) {
        return this.account.deposit(amount);
    }

    withdraw(amount) {
        return this.account.withdraw(amount);
    }

    transferTo(amount, targetAccount) {
        return this.account.transferTo(amount, targetAccount);
    }

    getBalance() {
        return this.account.getBalance();
    }
}

class API {
    constructor(initialBalance = 0) {
        this.account = new Account(initialBalance);
        this.accountService = new AccountService(this.account);
    }

    deposit(amount) {
        return this.accountService.deposit(amount);
    }

    withdraw(amount) {
        return this.accountService.withdraw(amount);
    }

    transferTo(amount, targetAPI) {
        return this.accountService.transferTo(amount, targetAPI.account);
    }

    getBalance() {
        return this.accountService.getBalance();
    }
}

module.exports = { API };