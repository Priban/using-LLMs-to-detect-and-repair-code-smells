const runDescribe = (API, description) => {
    describe(description, () => {
        let api;
        beforeEach(() => {
            api = new API();
        });

        test('should create and get account balance successfully', () => {
            api.createAccount(1, 1000);
            const balance = api.getAccountBalance(1);

            expect(balance).toBe(1000);
        });

        test('should deposit to account successfully', () => {
            api.createAccount(1, 1000);
            api.depositToAccount(1, 500);
            const balance = api.getAccountBalance(1);

            expect(balance).toBe(1500);
        });

        test('should withdraw from account successfully', () => {
            api.createAccount(1, 1000);
            api.withdrawFromAccount(1, 500);
            const balance = api.getAccountBalance(1);

            expect(balance).toBe(500);
        });

        test('should throw error when withdrawing with insufficient funds', () => {
            api.createAccount(1, 1000);
            expect(() => {
                api.withdrawFromAccount(1, 1500);
            }).toThrow("Insufficient funds");
        });

        test('should delete account successfully', () => {
            api.createAccount(1, 1000);
            api.deleteAccount(1);
            expect(() => {
                api.getAccountBalance(1);
            }).toThrow("Account does not exist");
        });

        test('should get account transactions successfully', () => {
            api.createAccount(1, 1000);
            api.depositToAccount(1, 500);
            api.withdrawFromAccount(1, 200);
            const transactions = api.getAccountTransactions(1);

            expect(transactions).toEqual(["Deposited 500", "Withdrew 200"]);
        });

        test('should generate AGS report successfully', () => {
            api.createAccount(1, 1000);
            api.depositToAccount(1, 500);
            const report = api.generateReport(1);

            expect(report).toBe(`AGS Report for Account 1\nBalance: 1500\nTransactions: Deposited 500`);
        });
    });
}

module.exports = runDescribe;