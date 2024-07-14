const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should create a customer and get total balance correctly', () => {
            const customer = api.createCustomer('John Doe', 5000, 3000);
            const totalBalance = api.getTotalBalance(customer);

            expect(totalBalance).toBe(8000);
        });

        test('should print customer details correctly', () => {
            const customer = api.createCustomer('Jane Doe', 2000, 1500);
            console.log = jest.fn();

            api.printDetails(customer);

            expect(console.log).toHaveBeenCalledWith('Customer: Jane Doe, Total Balance: 3500');
        });

        test('should handle customer with zero balances correctly', () => {
            const customer = api.createCustomer('Zero Balance', 0, 0);
            const totalBalance = api.getTotalBalance(customer);

            expect(totalBalance).toBe(0);
        });
    });
}

module.exports = runDescribe;