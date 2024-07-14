const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should perform transaction successfully', () => {
      const result = api.performTransaction(1, 2, 300);

      expect(result).toBe(true);
      expect(api.getAccountDetails(1).balance).toBe(700);
      expect(api.getAccountDetails(2).balance).toBe(800);
    });

    test('should fail transaction due to insufficient balance', () => {
      const result = api.performTransaction(1, 2, 1200);

      expect(result).toBe(false);
      expect(api.getAccountDetails(1).balance).toBe(1000);
      expect(api.getAccountDetails(2).balance).toBe(500);
    });

    test('should fail transaction due to non-existent sender account', () => {
      const result = api.performTransaction(3, 2, 300);

      expect(result).toBe(false);
    });

    test('should fail transaction due to non-existent receiver account', () => {
      const result = api.performTransaction(1, 3, 300);

      expect(result).toBe(false);
    });

    test('should return transaction logs', () => {
      api.performTransaction(1, 2, 300);
      const logs = api.getTransactionLogs();

      expect(logs.length).toBe(1);
      expect(logs[0]).toMatchObject({
        from: 1,
        to: 2,
        amount: 300
      });
    });

    test('should return account details', () => {
      const details = api.getAccountDetails(1);

      expect(details).toMatchObject({
        accountId: 1,
        owner: 'Alice',
        balance: 1000
      });
    });

    test('should return null for non-existent account details', () => {
      const details = api.getAccountDetails(3);

      expect(details).toBeNull();
    });
  });
}

module.exports = runDescribe;