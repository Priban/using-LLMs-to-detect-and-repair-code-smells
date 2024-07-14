const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should create and display account info successfully', () => {
      api.createAccount(1, 'John Doe', 500);
      const accountInfo = api.getAccountInfo(1);

      expect(accountInfo).toBe('Account Holder: John Doe, Balance: 500');
    });

    test('should process deposit successfully', () => {
      api.createAccount(1, 'John Doe', 500);
      const depositResult = api.processDeposit(1, 200);

      expect(depositResult).toBe('Deposit of 200 to account 1 completed');
      const accountInfo = api.getAccountInfo(1);
      expect(accountInfo).toBe('Account Holder: John Doe, Balance: 700');
    });

    test('should process withdrawal successfully', () => {
      api.createAccount(1, 'John Doe', 500);
      const withdrawalResult = api.processWithdrawal(1, 200);

      expect(withdrawalResult).toBe('Withdrawal of 200 from account 1 completed');
      const accountInfo = api.getAccountInfo(1);
      expect(accountInfo).toBe('Account Holder: John Doe, Balance: 300');
    });

    test('should return error when withdrawing with insufficient funds', () => {
      api.createAccount(1, 'John Doe', 500);
      const withdrawalResult = api.processWithdrawal(1, 600);

      expect(withdrawalResult).toBe('Insufficient funds');
      const accountInfo = api.getAccountInfo(1);
      expect(accountInfo).toBe('Account Holder: John Doe, Balance: 500');
    });

    test('should return error when accessing non-existent account', () => {
      const accountInfo = api.getAccountInfo(99);

      expect(accountInfo).toBe('Account not found');
    });

    test('should create loan successfully', () => {
      api.createAccount(1, 'John Doe', 500);
      const loan = api.createLoan(1, 1000, 5, 12);

      expect(loan.principal).toBe(1000);
      expect(loan.interestRate).toBe(5);
      expect(loan.termInMonths).toBe(12);
      const accountInfo = api.getAccountInfo(1);
      expect(accountInfo).toBe('Account Holder: John Doe, Balance: 500');
    });

    test('should generate account statement successfully', () => {
      api.createAccount(1, 'John Doe', 500);
      api.createLoan(1, 1000, 5, 12);
      const statement = api.generateAccountStatement(1);

      expect(statement).toContain('Account Statement for John Doe (Account ID: 1)');
      expect(statement).toContain('Balance: 500');
      expect(statement).toContain('Loan ID: 1, Balance: 1000, Status: Active');
    });
  });
}

module.exports = runDescribe;