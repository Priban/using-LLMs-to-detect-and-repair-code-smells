const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and calculate total balance for single account', () => {
      api.addBankAccount(1, 1000);

      const totalBalance = api.calculateTotalBalance();

      expect(totalBalance).toBe(1000);
    });

    test('should add and calculate total balance for multiple accounts', () => {
      api.addBankAccount(1, 1000);
      api.addBankAccount(2, 2000);
      api.addBankAccount(3, 1500);

      const totalBalance = api.calculateTotalBalance();

      expect(totalBalance).toBe(4500);
    });

    test('should handle no accounts gracefully', () => {
      const totalBalance = api.calculateTotalBalance();

      expect(totalBalance).toBe(0);
    });

    test('should handle adding accounts with zero balance', () => {
      api.addBankAccount(1, 0);
      api.addBankAccount(2, 0);

      const totalBalance = api.calculateTotalBalance();

      expect(totalBalance).toBe(0);
    });

    test('should correctly sum negative balances', () => {
      api.addBankAccount(1, -500);
      api.addBankAccount(2, 2000);
      api.addBankAccount(3, -1500);

      const totalBalance = api.calculateTotalBalance();

      expect(totalBalance).toBe(0);
    });
  });
}

module.exports = runDescribe;