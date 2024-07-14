const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
      api.addCustomer('John Doe', 12345, 1000);
    });

    test('should add and get balance of customer successfully', () => {
      const balance = api.getBalance('John Doe');
      expect(balance).toBe(1000);
    });

    test('should deposit amount to customer account successfully', () => {
      api.deposit('John Doe', 500);
      const balance = api.getBalance('John Doe');
      expect(balance).toBe(1500);
    });

    test('should withdraw amount from customer account successfully', () => {
      api.withdraw('John Doe', 200);
      const balance = api.getBalance('John Doe');
      expect(balance).toBe(800);
    });

    test('should handle insufficient funds during withdrawal', () => {
      expect(() => {
        api.withdraw('John Doe', 1200);
      }).toThrow('Insufficient funds');
    });

    test('should handle non-existing customer', () => {
      expect(() => {
        api.deposit('Jane Doe', 500);
      }).toThrow('Customer not found');

      expect(() => {
        api.withdraw('Jane Doe', 500);
      }).toThrow('Customer not found');

      expect(() => {
        api.getBalance('Jane Doe');
      }).toThrow('Customer not found');
    });
  });
}

module.exports = runDescribe;