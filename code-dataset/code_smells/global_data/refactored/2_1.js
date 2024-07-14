class UserAccount {
    constructor() {
        this.currentUser = null;
        this.balance = 0;
        this.transactionHistory = [];
    }

    loginUser(username) {
        this.currentUser = username;
        console.log("User logged in:", this.currentUser);
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactionHistory.push({ type: "deposit", amount: amount });
            console.log("Deposited:", amount, "New Balance:", this.balance);
        } else {
            console.log("Invalid deposit amount");
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push({ type: "withdraw", amount: amount });
            console.log("Withdrew:", amount, "New Balance:", this.balance);
        } else {
            console.log("Invalid withdraw amount or insufficient balance");
        }
    }

    checkBalance() {
        console.log("Current Balance:", this.balance);
    }

    printTransactionHistory() {
        console.log("Transaction History for", this.currentUser);
        this.transactionHistory.forEach(transaction => {
            console.log(transaction.type, transaction.amount);
        });
    }
}

class API {
    constructor() {
        this.userAccount = new UserAccount();
    }

    loginUser(username) {
        this.userAccount.loginUser(username);
    }

    deposit(amount) {
        this.userAccount.deposit(amount);
    }

    withdraw(amount) {
        this.userAccount.withdraw(amount);
    }

    checkBalance() {
        this.userAccount.checkBalance();
    }

    printTransactionHistory() {
        this.userAccount.printTransactionHistory();
    }
}

module.exports = { API };