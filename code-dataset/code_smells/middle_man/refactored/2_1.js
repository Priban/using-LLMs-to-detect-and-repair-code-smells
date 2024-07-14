class Account {
    constructor(balance = 0) {
        this.balance = balance;
    }

    validateAmount(amount) {
        if (amount <= 0) {
            return "Amount must be positive.";
        }
        return null;
    }

    deposit(amount) {
        const validationError = this.validateAmount(amount);
        if (validationError) {
            return validationError;
        }
        this.balance += amount;
        return `Deposited $${amount}. New balance is $${this.balance}.`;
    }

    withdraw(amount) {
        const validationError = this.validateAmount(amount);
        if (validationError) {
            return validationError;
        }
        if (amount > this.balance) {
            return "Insufficient funds.";
        }
        this.balance -= amount;
        return `Withdrew $${amount}. New balance is $${this.balance}.`;
    }

    transferTo(amount, targetAccount) {
        const validationError = this.validateAmount(amount);
        if (validationError) {
            return validationError;
        }
        if (amount > this.balance) {
            return "Insufficient funds.";
        }
        this.balance -= amount;
        targetAccount.deposit(amount);
        return `Transferred $${amount} to target account. New balance is $${this.balance}.`;
    }

    getBalance() {
        return this.balance;
    }
}

class API {
    constructor(initialBalance = 0) {
        this.account = new Account(initialBalance);
    }

    deposit(amount) {
        return this.account.deposit(amount);
    }

    withdraw(amount) {
        return this.account.withdraw(amount);
    }

    transferTo(amount, targetAPI) {
        return this.account.transferTo(amount, targetAPI.account);
    }

    getBalance() {
        return this.account.getBalance();
    }
}

module.exports = { API };