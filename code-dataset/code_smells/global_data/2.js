var currentUser = null;
var balance = 0;
var transactionHistory = [];

function loginUser(username) {
    currentUser = username;
    console.log("User logged in:", currentUser);
}

function deposit(amount) {
    if (amount > 0) {
        balance += amount;
        transactionHistory.push({ type: "deposit", amount: amount });
        console.log("Deposited:", amount, "New Balance:", balance);
    } else {
        console.log("Invalid deposit amount");
    }
}

function withdraw(amount) {
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactionHistory.push({ type: "withdraw", amount: amount });
        console.log("Withdrew:", amount, "New Balance:", balance);
    } else {
        console.log("Invalid withdraw amount or insufficient balance");
    }
}

function checkBalance() {
    console.log("Current Balance:", balance);
}

function printTransactionHistory() {
    console.log("Transaction History for", currentUser);
    transactionHistory.forEach(transaction => {
        console.log(transaction.type, transaction.amount);
    });
}

class API {
    loginUser(username) {
        loginUser(username);
    }

    deposit(amount) {
        deposit(amount);
    }

    withdraw(amount) {
        withdraw(amount);
    }

    checkBalance() {
        checkBalance();
    }

    printTransactionHistory() {
        printTransactionHistory();
    }
}

module.exports = { API };