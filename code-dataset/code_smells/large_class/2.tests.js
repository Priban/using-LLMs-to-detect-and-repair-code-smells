const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should add customer successfully', () => {
            api.addCustomer(1, 'John Doe', '123 Elm St', '555-1234');
            const report = api.generateCustomerReport(1);

            expect(report).toBeTruthy();
            expect(report.name).toBe('John Doe');
        });

        test('should create account and deposit successfully', () => {
            api.addCustomer(1, 'John Doe', '123 Elm St', '555-1234');
            api.createAccount(1, 101, 'savings');
            api.deposit(101, 500);

            const accountReport = api.generateAccountReport(101);

            expect(accountReport).toBeTruthy();
            expect(accountReport.balance).toBe(500);
        });

        test('should withdraw successfully', () => {
            api.addCustomer(1, 'John Doe', '123 Elm St', '555-1234');
            api.createAccount(1, 101, 'savings');
            api.deposit(101, 500);
            api.withdraw(101, 200);

            const accountReport = api.generateAccountReport(101);

            expect(accountReport).toBeTruthy();
            expect(accountReport.balance).toBe(300);
        });

        test('should transfer successfully between accounts', () => {
            api.addCustomer(1, 'John Doe', '123 Elm St', '555-1234');
            api.createAccount(1, 101, 'savings');
            api.createAccount(1, 102, 'checking');
            api.deposit(101, 500);
            api.transfer(101, 102, 200);

            const savingsReport = api.generateAccountReport(101);
            const checkingReport = api.generateAccountReport(102);

            expect(savingsReport).toBeTruthy();
            expect(savingsReport.balance).toBe(300);
            expect(checkingReport).toBeTruthy();
            expect(checkingReport.balance).toBe(200);
        });

        test('should generate customer report successfully', () => {
            api.addCustomer(1, 'John Doe', '123 Elm St', '555-1234');
            api.createAccount(1, 101, 'savings');
            api.deposit(101, 500);
            api.createAccount(1, 102, 'checking');
            api.transfer(101, 102, 200);

            const customerReport = api.generateCustomerReport(1);

            expect(customerReport).toBeTruthy();
            expect(customerReport.accounts.length).toBe(2);
        });
    });
}

module.exports = runDescribe;