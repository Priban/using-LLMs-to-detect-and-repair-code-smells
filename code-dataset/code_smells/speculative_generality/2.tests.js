const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should create a savings account and perform a deposit', () => {
      const account = api.createAccount('savings', '123', 100);
      expect(account.balance).toBe(100);

      const newBalance = api.performTransaction('123', 'deposit', 50);
      expect(newBalance).toBe(150);
    });

    test('should create a loan account and handle unsupported transaction type', () => {
      const account = api.createAccount('loan', '456', 200);
      expect(account.balance).toBe(200);

      expect(() => {
        api.performTransaction('456', 'unsupported', 50);
      }).toThrow('Unsupported transaction type');
    });

    test('should handle insufficient funds for withdrawal', () => {
      const account = api.createAccount('savings', '789', 50);
      expect(account.balance).toBe(50);

      const newBalance = api.performTransaction('789', 'withdrawal', 100);
      expect(newBalance).toBe(50); // balance should remain the same due to insufficient funds
    });

    test('should handle account not found error', () => {
      expect(() => {
        api.performTransaction('999', 'deposit', 50);
      }).toThrow('Account not found');
    });
  });
}

module.exports = runDescribe;