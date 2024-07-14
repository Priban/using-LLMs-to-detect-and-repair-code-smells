class BankAccount {
    constructor() {
        this.currentUser = null;
        this.balance = 0;
        this.transactionHistory = [];
    }

    loginUser(username) {
        this.currentUser = username;
        this.logMessage(`User logged in: ${this.currentUser}`);
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.addTransaction('deposit', amount);
            this.logMessage(`Deposited: ${amount} New Balance: ${this.balance}`);
        } else {
            this.logMessage('Invalid deposit amount');
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.addTransaction('withdraw', amount);
            this.logMessage(`Withdrew: ${amount} New Balance: ${this.balance}`);
        } else {
            this.logMessage('Invalid withdraw amount or insufficient balance');
        }
    }

    checkBalance() {
        this.logMessage(`Current Balance: ${this.balance}`);
    }

    printTransactionHistory() {
        this.logMessage(`Transaction History for ${this.currentUser}`);
        this.transactionHistory.forEach(transaction => {
            this.logMessage(`${transaction.type} ${transaction.amount}`);
        });
    }

    addTransaction(type, amount) {
        this.transactionHistory.push({ type, amount });
    }

    logMessage(message) {
        console.log(message);
    }
}

class API {
    constructor() {
        this.bankAccount = new BankAccount();
    }

    loginUser(username) {
        this.bankAccount.loginUser(username);
    }

    deposit(amount) {
        this.bankAccount.deposit(amount);
    }

    withdraw(amount) {
        this.bankAccount.withdraw(amount);
    }

    checkBalance() {
        this.bankAccount.checkBalance();
    }

    printTransactionHistory() {
        this.bankAccount.printTransactionHistory();
    }
}

module.exports = { API };