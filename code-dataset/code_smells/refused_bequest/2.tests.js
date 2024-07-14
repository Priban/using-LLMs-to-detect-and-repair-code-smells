const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should create and manage a bank account successfully', () => {
      api.createAccount('bank', 'Alice', 1000);
      api.performAction(0, 'deposit', 500);
      api.performAction(0, 'withdraw', 200);
      const balance = api.performAction(0, 'getBalance');

      expect(balance).toBe(1300);
    });

    test('should create and manage an employee account successfully', () => {
      api.createAccount('employee', 'Bob', 0, 'E123', 'Engineering');
      const employeeDetails = jest.spyOn(console, 'log').mockImplementation();
      api.performAction(0, 'getEmployeeDetails');
      api.performAction(0, 'deposit', 1000);
      api.performAction(0, 'withdraw', 500);
      const balance = api.performAction(0, 'getBalance');

      expect(employeeDetails).toHaveBeenCalledWith('Employee ID: E123, Department: Engineering');
      expect(balance).toBe(0);
      expect(employeeDetails).toHaveBeenCalledWith('Deposits are not applicable for Employee Account');
      expect(employeeDetails).toHaveBeenCalledWith('Withdrawals are not applicable for Employee Account');

      employeeDetails.mockRestore();
    });

    test('should handle unsupported account type', () => {
      expect(() => {
        api.createAccount('unsupported', 'Charlie', 500);
      }).toThrow('Unsupported account type');
    });

    test('should handle invalid actions', () => {
      api.createAccount('bank', 'Alice', 1000);

      expect(() => {
        api.performAction(0, 'unsupportedAction');
      }).toThrow('Unsupported action or account type for this action');
    });

    test('should handle account not found', () => {
      expect(() => {
        api.performAction(99, 'getBalance');
      }).toThrow('Account not found');
    });
  });
}

module.exports = runDescribe;