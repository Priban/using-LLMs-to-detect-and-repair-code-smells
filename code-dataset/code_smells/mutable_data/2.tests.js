const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should deposit money successfully', () => {
      api.deposit(1, 500);
      const accountBalance = api.getAccountBalance(1);

      expect(accountBalance).toBe('Account Balance: 1500');
    });

    test('should withdraw money successfully', () => {
      api.withdraw(2, 200);
      const accountBalance = api.getAccountBalance(2);

      expect(accountBalance).toBe('Account Balance: 300');
    });

    test('should return error when withdrawing with insufficient funds', () => {
      api.withdraw(2, 600);
      const accountBalance = api.getAccountBalance(2);

      expect(accountBalance).toBe('Account Balance: 500');
    });

    test('should transfer money successfully', () => {
      api.transfer(1, 2, 300);
      const fromAccountBalance = api.getAccountBalance(1);
      const toAccountBalance = api.getAccountBalance(2);

      expect(fromAccountBalance).toBe('Account Balance: 700');
      expect(toAccountBalance).toBe('Account Balance: 800');
    });

    test('should return error when transferring with insufficient funds', () => {
      api.transfer(2, 1, 600);
      const fromAccountBalance = api.getAccountBalance(2);
      const toAccountBalance = api.getAccountBalance(1);

      expect(fromAccountBalance).toBe('Account Balance: 500');
      expect(toAccountBalance).toBe('Account Balance: 1000');
    });
  });
}

module.exports = runDescribe;