const runDescribe = (API, description) => {
  describe(description, () => {
    let bankAPI;

    beforeEach(() => {
      bankAPI = new API();
    });

    test('should create a savings account and get its features', () => {
      bankAPI.createAccount('123456', 'savings', 1000);

      const features = bankAPI.getAccountFeatures('123456');

      expect(features).toEqual(['Interest Accumulation', 'Limited Withdrawals']);
    });

    test('should deposit money into an account and get the correct balance', () => {
      bankAPI.createAccount('123456', 'savings', 1000);
      bankAPI.deposit('123456', 500);

      const balance = bankAPI.getBalance('123456');

      expect(balance).toBe(1500);
    });

    test('should withdraw money from an account and get the correct balance', () => {
      bankAPI.createAccount('123456', 'savings', 1000);
      bankAPI.withdraw('123456', 300);

      const balance = bankAPI.getBalance('123456');

      expect(balance).toBe(700);
    });

    test('should generate a report for all accounts', () => {
      bankAPI.createAccount('123456', 'savings', 1000);
      bankAPI.createAccount('234567', 'checking', 2000);
      bankAPI.createAccount('345678', 'business', 3000);

      const report = bankAPI.generateReport();

      expect(report).toEqual([
        'Savings Account Report for 123456: Balance is $1000',
        'Checking Account Report for 234567: Balance is $2000',
        'Business Account Report for 345678: Balance is $3000'
      ]);
    });

    test('should return null for non-existent account features', () => {
      const features = bankAPI.getAccountFeatures('nonexistent');

      expect(features).toBeNull();
    });

    test('should return null for balance of non-existent account', () => {
      const balance = bankAPI.getBalance('nonexistent');

      expect(balance).toBeNull();
    });
  });
}

module.exports = runDescribe;