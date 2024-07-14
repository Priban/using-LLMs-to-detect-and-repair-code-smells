const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should log in a user and print transaction history', () => {
            console.log = jest.fn();
            api.loginUser('Alice');

            expect(console.log).toHaveBeenCalledWith('User logged in:', 'Alice');
        });

        test('should deposit money and update balance', () => {
            console.log = jest.fn();
            api.loginUser('Alice');
            api.deposit(1000);

            expect(console.log).toHaveBeenCalledWith('Deposited:', 1000, 'New Balance:', 1000);
        });

        test('should handle invalid deposit amounts', () => {
            console.log = jest.fn();
            api.loginUser('Alice');
            api.deposit(-100);

            expect(console.log).toHaveBeenCalledWith('Invalid deposit amount');
        });

        test('should print transaction history', () => {
            console.log = jest.fn();
            api.loginUser('Alice');
            api.deposit(1000);
            api.withdraw(200);
            api.printTransactionHistory();

            expect(console.log).toHaveBeenCalledWith('Transaction History for', 'Alice');
            expect(console.log).toHaveBeenCalledWith('deposit', 1000);
            expect(console.log).toHaveBeenCalledWith('withdraw', 200);
        });
    });
}

module.exports = runDescribe;