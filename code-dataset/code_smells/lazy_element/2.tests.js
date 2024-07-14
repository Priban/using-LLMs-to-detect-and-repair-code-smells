const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should create an account and retrieve the balance', () => {
            api.createAccount('Alice', 1000);
            const balance = api.getBalance('Alice');

            expect(balance).toBe(1000);
        });

        test('should deposit money into the account', () => {
            api.createAccount('Bob', 500);
            api.deposit('Bob', 200);
            const balance = api.getBalance('Bob');

            expect(balance).toBe(700);
        });

        test('should withdraw money from the account', () => {
            api.createAccount('Charlie', 800);
            api.withdraw('Charlie', 300);
            const balance = api.getBalance('Charlie');

            expect(balance).toBe(500);
        });

        test('should handle deposit for non-existing account', () => {
            console.log = jest.fn();
            api.deposit('NonExistent', 200);
            expect(console.log).toHaveBeenCalledWith('Account not found.');
        });

        test('should handle withdraw for non-existing account', () => {
            console.log = jest.fn();
            api.withdraw('NonExistent', 200);
            expect(console.log).toHaveBeenCalledWith('Account not found.');
        });

        test('should handle getting balance for non-existing account', () => {
            console.log = jest.fn();
            const balance = api.getBalance('NonExistent');
            expect(balance).toBeNull();
            expect(console.log).toHaveBeenCalledWith('Account not found.');
        });
    });
}

module.exports = runDescribe;