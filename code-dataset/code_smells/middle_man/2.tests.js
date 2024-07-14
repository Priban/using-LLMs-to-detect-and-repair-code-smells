const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API(100); // Initial balance of 100
        });

        test('should deposit amount successfully', () => {
            const result = api.deposit(50);
            expect(result).toBe('Deposited $50. New balance is $150.');
            expect(api.getBalance()).toBe(150);
        });

        test('should withdraw amount successfully', () => {
            const result = api.withdraw(20);
            expect(result).toBe('Withdrew $20. New balance is $80.');
            expect(api.getBalance()).toBe(80);
        });

        test('should handle insufficient funds during withdrawal', () => {
            const result = api.withdraw(200);
            expect(result).toBe('Insufficient funds.');
            expect(api.getBalance()).toBe(100);
        });

        test('should handle negative deposit', () => {
            const result = api.deposit(-50);
            expect(result).toBe('Deposit amount must be positive.');
            expect(api.getBalance()).toBe(100);
        });

        test('should transfer amount successfully to another account', () => {
            const targetAPI = new API(50);
            const result = api.transferTo(30, targetAPI);
            expect(result).toBe('Transferred $30 to target account. New balance is $70.');
            expect(api.getBalance()).toBe(70);
            expect(targetAPI.getBalance()).toBe(80);
        });

        test('should handle insufficient funds during transfer', () => {
            const targetAPI = new API(50);
            const result = api.transferTo(200, targetAPI);
            expect(result).toBe('Insufficient funds.');
            expect(api.getBalance()).toBe(100);
            expect(targetAPI.getBalance()).toBe(50);
        });

        test('should handle negative transfer amount', () => {
            const targetAPI = new API(50);
            const result = api.transferTo(-30, targetAPI);
            expect(result).toBe('Transfer amount must be positive.');
            expect(api.getBalance()).toBe(100);
            expect(targetAPI.getBalance()).toBe(50);
        });

        test('should get the current balance', () => {
            expect(api.getBalance()).toBe(100);
        });
    });
}

module.exports = runDescribe;