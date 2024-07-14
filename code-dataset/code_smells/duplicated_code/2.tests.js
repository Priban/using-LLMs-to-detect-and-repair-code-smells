const runDescribe = (API, description) => {

  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should create a new account successfully', () => {
      const result = api.createAccount('12345678', 1000);
      expect(result).toBe(true);
    });

    test('should not create duplicate accounts', () => {
      api.createAccount('12345678', 1000);
      const result = api.createAccount('12345678', 1000);
      expect(result).toBe(false);
    });

    test('should transfer funds successfully between accounts', () => {
      api.createAccount('12345678', 1000);
      api.createAccount('87654321', 500);
      const result = api.transferFunds('12345678', '87654321', 100);
      expect(result).toBe(true);
    });

    test('should not transfer funds if insufficient balance', () => {
      api.createAccount('12345678', 100);
      api.createAccount('87654321', 500);
      const result = api.transferFunds('12345678', '87654321', 200);
      expect(result).toBe(false);
    });

    test('should pay bill successfully', () => {
      api.createAccount('12345678', 1000);
      const result = api.payBill('12345678', 50, 'Electric Company');
      expect(result).toBe(true);
    });

    test('should not pay bill if insufficient balance', () => {
      api.createAccount('12345678', 100);
      const result = api.payBill('12345678', 200, 'Electric Company');
      expect(result).toBe(false);
    });

    test('should print transaction history', () => {
      console.log = jest.fn();
      api.createAccount('12345678', 1000);
      api.transferFunds('12345678', '87654321', 100);
      api.payBill('12345678', 50, 'Electric Company');
      api.printTransactionHistory('12345678');

      expect(console.log).toHaveBeenCalled();
    });
  });
}

module.exports = runDescribe;