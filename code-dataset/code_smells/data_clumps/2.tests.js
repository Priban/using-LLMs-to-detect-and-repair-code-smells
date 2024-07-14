const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
      api.addAccount('1234567890', 'John Doe', 1000, 'Main Branch', '123 Main St', 'No notes');
      api.addAccount('9876543210', 'Jane Smith', 500, 'West Branch', '456 West St', 'No notes');
    });

    test('should deposit money into the account successfully', () => {
      const result = api.deposit('1234567890', 200);
      expect(result).toBe('Deposited 200. New balance is 1200.');
    });

    test('should withdraw money from the account successfully', () => {
      const result = api.withdraw('1234567890', 100);
      expect(result).toBe('Withdrew 100. New balance is 900.');
    });

    test('should transfer money between accounts successfully', () => {
      const result = api.transfer('1234567890', '9876543210', 300);
      expect(result).toBe('Transferred 300 to account number 9876543210. New balance is 700.');
    });

    test('should not deposit money into a non-existent account', () => {
      const result = api.deposit('0000000000', 200);
      expect(result).toBe('Account not found.');
    });

    test('should not withdraw money from a non-existent account', () => {
      const result = api.withdraw('0000000000', 100);
      expect(result).toBe('Account not found.');
    });

    test('should not transfer money from a non-existent account', () => {
      const result = api.transfer('0000000000', '9876543210', 300);
      expect(result).toBe('One or both accounts not found.');
    });

    test('should not transfer money to a non-existent account', () => {
      const result = api.transfer('1234567890', '0000000000', 300);
      expect(result).toBe('One or both accounts not found.');
    });

    test('should handle insufficient balance during withdrawal', () => {
      const result = api.withdraw('1234567890', 2000);
      expect(result).toBe('Insufficient balance.');
    });

    test('should handle insufficient balance during transfer', () => {
      const result = api.transfer('1234567890', '9876543210', 2000);
      expect(result).toBe('Insufficient balance.');
    });
  });
}

module.exports = runDescribe;