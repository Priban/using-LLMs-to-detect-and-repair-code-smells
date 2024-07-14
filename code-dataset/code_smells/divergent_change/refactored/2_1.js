class Account {
    constructor(accountId, initialBalance = 0.0) {
        this.accountId = accountId;
        this.balance = initialBalance;
        this.transactionHistory = [];
    }

    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push(`Deposited ${amount}`);
    }

    withdraw(amount) {
        if (this.balance < amount) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
        this.transactionHistory.push(`Withdrew ${amount}`);
    }

    getBalance() {
        return this.balance;
    }

    getTransactionHistory() {
        return this.transactionHistory;
    }

    generateReport() {
        return `AGS Report for Account ${this.accountId}\nBalance: ${this.balance}\nTransactions: ${this.transactionHistory.join(", ")}`;
    }
}

class AGSInstrumentAPI {
    constructor() {
        this.accounts = {};
    }

    openAGSAccount(accountId, initialBalance = 0.0) {
        this._ensureAccountDoesNotExist(accountId);
        this.accounts[accountId] = new Account(accountId, initialBalance);
        this._logAndNotify(`Account ${accountId} opened with balance ${initialBalance}`);
    }

    closeAGSAccount(accountId) {
        this._ensureAccountExists(accountId);
        delete this.accounts[accountId];
        this._logAndNotify(`Account ${accountId} closed`);
    }

    AGSDeposit(accountId, amount) {
        this._ensureAccountExists(accountId);
        this.accounts[accountId].deposit(amount);
        this._logAndNotify(`Deposited ${amount} to account ${accountId}`);
    }

    AGSWithdraw(accountId, amount) {
        this._ensureAccountExists(accountId);
        this.accounts[accountId].withdraw(amount);
        this._logAndNotify(`Withdrew ${amount} from account ${accountId}`);
    }

    getBalance(accountId) {
        this._ensureAccountExists(accountId);
        return this.accounts[accountId].getBalance();
    }

    getTransactionHistory(accountId) {
        this._ensureAccountExists(accountId);
        return this.accounts[accountId].getTransactionHistory();
    }

    generateAGSReport(accountId) {
        this._ensureAccountExists(accountId);
        const report = this.accounts[accountId].generateReport();
        console.log(report);
        return report;
    }

    _ensureAccountExists(accountId) {
        if (!this.accounts[accountId]) {
            throw new Error("Account does not exist");
        }
    }

    _ensureAccountDoesNotExist(accountId) {
        if (this.accounts[accountId]) {
            throw new Error("Account already exists");
        }
    }

    _logAndNotify(message) {
        console.log(message);
        this.notifyAGSSystems(message);
    }

    notifyAGSSystems(message) {
        console.log(`Notification to AGS Systems: ${message}`);
    }
}

class Bank {
    constructor(name) {
        this.name = name;
        this.agsAPI = new AGSInstrumentAPI();
    }

    createAccount(accountId, initialBalance = 0.0) {
        this.agsAPI.openAGSAccount(accountId, initialBalance);
        console.log(`Bank ${this.name}: Account ${accountId} created`);
    }

    deleteAccount(accountId) {
        this.agsAPI.closeAGSAccount(accountId);
        console.log(`Bank ${this.name}: Account ${accountId} deleted`);
    }

    depositToAccount(accountId, amount) {
        this.agsAPI.AGSDeposit(accountId, amount);
        console.log(`Bank ${this.name}: Deposited ${amount} to account ${accountId}`);
    }

    withdrawFromAccount(accountId, amount) {
        this.agsAPI.AGSWithdraw(accountId, amount);
        console.log(`Bank ${this.name}: Withdrew ${amount} from account ${accountId}`);
    }

    getAccountBalance(accountId) {
        const balance = this.agsAPI.getBalance(accountId);
        console.log(`Bank ${this.name}: Account ${accountId} balance is ${balance}`);
        return balance;
    }

    getAccountTransactions(accountId) {
        const transactions = this.agsAPI.getTransactionHistory(accountId);
        console.log(`Bank ${this.name}: Account ${accountId} transactions are ${transactions}`);
        return transactions;
    }

    generateReport(accountId) {
        const report = this.agsAPI.generateAGSReport(accountId);
        console.log(`Bank ${this.name}: Generated AGS report for account ${accountId}`);
        return report;
    }
}

class API {
    constructor() {
        this.bank = new Bank("MyBank");
    }

    createAccount(accountId, initialBalance = 0.0) {
        this.bank.createAccount(accountId, initialBalance);
    }

    deleteAccount(accountId) {
        this.bank.deleteAccount(accountId);
    }

    depositToAccount(accountId, amount) {
        this.bank.depositToAccount(accountId, amount);
    }

    withdrawFromAccount(accountId, amount) {
        this.bank.withdrawFromAccount(accountId, amount);
    }

    getAccountBalance(accountId) {
        return this.bank.getAccountBalance(accountId);
    }

    getAccountTransactions(accountId) {
        return this.bank.getAccountTransactions(accountId);
    }

    generateReport(accountId) {
        return this.bank.generateReport(accountId);
    }
}

module.exports = { API };