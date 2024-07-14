const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API('Test Bank');
    });

    test('should add an account and get the correct balance', () => {
      api.addAccount('12345678', 'John Doe', 1000);
      const balance = api.getBalance('12345678');
      expect(balance).toBe(1000);
    });

    test('should perform a deposit transaction successfully', () => {
      api.addAccount('12345678', 'John Doe', 1000);
      const result = api.performTransaction('12345678', 'deposit', 500);
      const balance = api.getBalance('12345678');
      expect(result).toBe(true);
      expect(balance).toBe(1500);
    });

    test('should perform a withdrawal transaction successfully', () => {
      api.addAccount('12345678', 'John Doe', 1000);
      const result = api.performTransaction('12345678', 'withdraw', 300);
      const balance = api.getBalance('12345678');
      expect(result).toBe(true);
      expect(balance).toBe(700);
    });

    test('should not perform a transaction on non-existent account', () => {
      const result = api.performTransaction('99999999', 'deposit', 500);
      expect(result).toBe(false);
    });
  });
}

module.exports = runDescribe;