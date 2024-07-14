const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should create and manage savings account successfully', () => {
            api.createSavingsAccount('SA123', 1000);
            
            expect(api.getSavingsAccountBalance('SA123')).toBe(1000);

            api.depositToSavings('SA123', 200);
            expect(api.getSavingsAccountBalance('SA123')).toBe(1200);

            api.withdrawFromSavings('SA123', 150);
            expect(api.getSavingsAccountBalance('SA123')).toBe(1050);
        });

        test('should create and manage checking account successfully', () => {
            const account = api.createCheckingAccount('CA456', 500);
            expect(api.getCheckingAccountFunds('CA456')).toBe(500);

            api.addMoneyToChecking('CA456', 100);
            expect(api.getCheckingAccountFunds('CA456')).toBe(600);

            api.withdrawFromChecking('CA456', 200);
            expect(api.getCheckingAccountFunds('CA456')).toBe(400);
        });

        test('should handle non-existent savings account', () => {
            expect(() => api.depositToSavings('SA999', 100)).toThrow('Savings account not found');
            expect(() => api.withdrawFromSavings('SA999', 100)).toThrow('Savings account not found');
        });

        test('should handle non-existent checking account', () => {
            expect(() => api.addMoneyToChecking('CA999', 100)).toThrow('Checking account not found');
            expect(() => api.withdrawFromChecking('CA999', 100)).toThrow('Checking account not found');
        });
    });
}

module.exports = runDescribe;