class AGSInstrumentAPI {
    constructor() {
        this.accountBalance = {};
        this.transactionHistory = {};
    }

    openAGSAccount(accountId, initialBalance = 0.0) {
        if (this.accountBalance[accountId] !== undefined) {
            throw new Error("Account already exists");
        }
        this.accountBalance[accountId] = initialBalance;
        this.transactionHistory[accountId] = [];
        console.log(`Account ${accountId} opened with balance ${initialBalance}`);
        this.notifyAGSSystems(`Account ${accountId} opened`);
    }

    closeAGSAccount(accountId) {
        if (this.accountBalance[accountId] === undefined) {
            throw new Error("Account does not exist");
        }
        delete this.accountBalance[accountId];
        delete this.transactionHistory[accountId];
        console.log(`Account ${accountId} closed`);
        this.notifyAGSSystems(`Account ${accountId} closed`);
    }

    AGSDeposit(accountId, amount) {
        if (this.accountBalance[accountId] === undefined) {
            throw new Error("Account does not exist");
        }
        this._AGSDeposit(accountId, amount);
        this.transactionHistory[accountId].push(`Deposited ${amount}`);
        console.log(`Deposited ${amount} to account ${accountId}`);
        this.notifyAGSSystems(`Deposited ${amount} to account ${accountId}`);
    }

    AGSWithdraw(accountId, amount) {
        if (this.accountBalance[accountId] === undefined) {
            throw new Error("Account does not exist");
        }
        if (this.accountBalance[accountId] < amount) {
            throw new Error("Insufficient funds");
        }
        this._AGSWithdraw(accountId, amount);
        this.transactionHistory[accountId].push(`Withdrew ${amount}`);
        console.log(`Withdrew ${amount} from account ${accountId}`);
        this.notifyAGSSystems(`Withdrew ${amount} from account ${accountId}`);
    }

    _AGSDeposit(accountId, amount) {
        this.accountBalance[accountId] += amount;
        console.log(`AGS-specific deposit: ${amount} to account ${accountId}`);
    }

    _AGSWithdraw(accountId, amount) {
        this.accountBalance[accountId] -= amount;
        console.log(`AGS-specific withdrawal: ${amount} from account ${accountId}`);
    }

    getBalance(accountId) {
        if (this.accountBalance[accountId] === undefined) {
            throw new Error("Account does not exist");
        }
        return this.accountBalance[accountId];
    }

    getTransactionHistory(accountId) {
        if (this.accountBalance[accountId] === undefined) {
            throw new Error("Account does not exist");
        }
        return this.transactionHistory[accountId];
    }

    notifyAGSSystems(message) {
        console.log(`Notification to AGS Systems: ${message}`);
    }

    generateAGSReport(accountId) {
        if (this.accountBalance[accountId] === undefined) {
            throw new Error("Account does not exist");
        }
        const report = `AGS Report for Account ${accountId}\nBalance: ${this.accountBalance[accountId]}\nTransactions: ${this.transactionHistory[accountId].join(", ")}`;
        console.log(report);
        return report;
    }
}

class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = {};
        this.agsAPI = new AGSInstrumentAPI();
    }

    createAccount(accountId, initialBalance = 0.0) {
        this.agsAPI.openAGSAccount(accountId, initialBalance);
        this.accounts[accountId] = "Active";
        console.log(`Bank ${this.name}: Account ${accountId} created`);
    }

    deleteAccount(accountId) {
        this.agsAPI.closeAGSAccount(accountId);
        delete this.accounts[accountId];
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