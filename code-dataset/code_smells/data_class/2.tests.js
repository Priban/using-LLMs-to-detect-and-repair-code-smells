const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API('123456', 'John Doe', 5000);
    });

    test('should return account details correctly', () => {
      const accountDetails = api.getAccountDetails();
      expect(accountDetails).toBe('Account Number: 123456, Account Holder: John Doe, Balance: 5000');
    });

    test('should deposit amount successfully', () => {
      const result = api.deposit(2000);
      expect(result).toBe('Deposited 2000. New balance: 7000');

      const accountDetails = api.getAccountDetails();
      expect(accountDetails).toBe('Account Number: 123456, Account Holder: John Doe, Balance: 7000');
    });

    test('should not deposit invalid amount', () => {
      const result = api.deposit(-100);
      expect(result).toBe('Invalid deposit amount.');

      const accountDetails = api.getAccountDetails();
      expect(accountDetails).toBe('Account Number: 123456, Account Holder: John Doe, Balance: 5000');
    });

    test('should withdraw amount successfully', () => {
      const result = api.withdraw(3000);
      expect(result).toBe('Withdrew 3000. New balance: 2000');

      const accountDetails = api.getAccountDetails();
      expect(accountDetails).toBe('Account Number: 123456, Account Holder: John Doe, Balance: 2000');
    });

    test('should not withdraw invalid amount or if insufficient funds', () => {
      const invalidAmountResult = api.withdraw(-100);
      expect(invalidAmountResult).toBe('Invalid withdrawal amount or insufficient funds.');

      const insufficientFundsResult = api.withdraw(6000);
      expect(insufficientFundsResult).toBe('Invalid withdrawal amount or insufficient funds.');

      const accountDetails = api.getAccountDetails();
      expect(accountDetails).toBe('Account Number: 123456, Account Holder: John Doe, Balance: 5000');
    });
  });
}

module.exports = runDescribe;