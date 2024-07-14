const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should create a bank account and add a transaction', () => {
      api.createAccount('123456789', 'Alice Johnson');
      api.addTransaction('Deposit', '$200.00');
      const balance = api.getBalance();
      expect(balance).toBe('$200.00');
    });

    test('should handle multiple transactions correctly', () => {
      api.createAccount('123456789', 'Alice Johnson');
      api.addTransaction('Deposit', '$200.00');
      api.addTransaction('Withdrawal', '$-50.00');
      api.addTransaction('Deposit', '$100.00');
      const balance = api.getBalance();
      expect(balance).toBe('$250.00');
    });

    test('should throw an error when adding a transaction without creating an account', () => {
      expect(() => {
        api.addTransaction('Deposit', '$200.00');
      }).toThrow('Bank account not created');
    });

    test('should print account summary correctly', () => {
      console.log = jest.fn(); // Mock console.log
      api.createAccount('123456789', 'Alice Johnson');
      api.addTransaction('Deposit', '$200.00');
      api.printAccountSummary();
      expect(console.log).toHaveBeenCalledWith('Account Number: 123456789, Account Holder: Alice Johnson');
      expect(console.log).toHaveBeenCalledWith('Transactions:');
      expect(console.log).toHaveBeenCalledWith('Transaction: Deposit, Amount: $200.00');
      expect(console.log).toHaveBeenCalledWith('Current Balance: $200.00');
    });
  });
}

module.exports = runDescribe;