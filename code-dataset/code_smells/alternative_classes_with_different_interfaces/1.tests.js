const runDescribe = (API, description) => {
describe(description, () => {
    let api;

    beforeEach(() => {
        api = new API();
    });

    test('should add and process credit card payment successfully', () => {
        const paymentDetails = { customer: 'John Doe', amount: 100 };
        api.addPayment('creditCard', paymentDetails);

        const result = api.processPayments();

        expect(result).toBe(true);
    });

    test('should add and process PayPal payment successfully', () => {
        const paymentDetails = { customer: 'payer@example.com', amount: 150 };
        api.addPayment('paypal', paymentDetails);

        const result = api.processPayments();

        expect(result).toBe(true);
    });

    test('should handle unsupported payment type', () => {
        const paymentDetails = { customer: 'John Doe', amount: 100 };
        api.addPayment('unsupported', paymentDetails);

        const result = api.processPayments();

        expect(result).toBe(false);
    });

    test('should process multiple payments', () => {
        const ccPaymentDetails = { customer: 'John Doe', amount: 100 };
        const ppPaymentDetails = { customer: 'payer@example.com', amount: 150 };

        api.addPayment('creditCard', ccPaymentDetails);
        api.addPayment('paypal', ppPaymentDetails);

        const result = api.processPayments();

        expect(result).toBe(true);
    });
});
}

module.exports = runDescribe;