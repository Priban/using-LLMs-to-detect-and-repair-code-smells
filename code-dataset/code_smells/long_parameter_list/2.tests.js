const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and process a deposit transaction successfully', () => {
      api.addAccount("A123", "Alice", "456 Park Ave", 500, "Branch1");

      const result = api.processTransaction(
        "T001",
        "A123",
        "deposit",
        200,
        new Date(),
        "USD",
        1.0,
        0,
        "Salary deposit"
      );

      expect(result).toBe(true);
      expect(api.bank.accounts["A123"].balance).toBe(700);
    });

    test('should add and process a withdrawal transaction successfully', () => {
      api.addAccount("A124", "Bob", "789 Market St", 1000, "Branch2");

      const result = api.processTransaction(
        "T002",
        "A124",
        "withdrawal",
        300,
        new Date(),
        "USD",
        1.0,
        2,
        "ATM withdrawal"
      );

      expect(result).toBe(true);
      expect(api.bank.accounts["A124"].balance).toBe(702);
    });

    test('should handle insufficient balance for withdrawal', () => {
      api.addAccount("A125", "Charlie", "1010 Elm St", 100, "Branch3");

      const result = api.processTransaction(
        "T003",
        "A125",
        "withdrawal",
        200,
        new Date(),
        "USD",
        1.0,
        2,
        "ATM withdrawal"
      );

      expect(result).toBe(false);
      expect(api.bank.accounts["A125"].balance).toBe(100);
    });

    test('should handle currency conversion for deposit', () => {
      api.addAccount("A126", "David", "1111 Birch St", 1000, "Branch4");

      const result = api.processTransaction(
        "T004",
        "A126",
        "deposit",
        100,
        new Date(),
        "EUR",
        1.1,
        1,
        "Deposit in EUR"
      );

      expect(result).toBe(true);
      expect(api.bank.accounts["A126"].balance).toBeCloseTo(1109);
    });

    test('should throw an error for non-existing account', () => {
      expect(() => api.processTransaction(
        "T005",
        "A999",
        "deposit",
        100,
        new Date(),
        "USD",
        1.0,
        0,
        "Non-existent account"
      )).toThrow("Account not found");
    });
  });
}

module.exports = runDescribe;