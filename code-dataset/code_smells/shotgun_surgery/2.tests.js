const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add accounts to the bank', () => {
      api.addAccount('123', 100);
      api.addAccount('456', 200);

      expect(api.bank.accounts.length).toBe(2);
      expect(api.bank.accounts[0].accountNumber).toBe('123');
      expect(api.bank.accounts[1].balance).toBe(200);
    });

    test('should allow a customer to withdraw funds', () => {
      const customer = api.makeCustomer('Alice', '123', 100);
      customer.makeWithdrawal(50);

      expect(customer.account.balance).toBe(50);
    });

    test('should handle insufficient funds for withdrawal', () => {
      const customer = api.makeCustomer('Alice', '123', 100);
      console.log = jest.fn();
      customer.makeWithdrawal(150);

      expect(console.log).toHaveBeenCalledWith('Customer', 'Alice', 'has insufficient funds in account:', '123');
      expect(customer.account.balance).toBe(100);
    });

    test('should transfer funds between accounts', () => {
      api.addAccount('123', 100);
      api.addAccount('456', 200);
      api.transferFunds('123', '456', 50);

      const fromAccount = api.bank.accounts.find(acc => acc.accountNumber === '123');
      const toAccount = api.bank.accounts.find(acc => acc.accountNumber === '456');

      expect(fromAccount.balance).toBe(50);
      expect(toAccount.balance).toBe(250);
    });

    test('should handle insufficient funds for transfer', () => {
      api.addAccount('123', 100);
      api.addAccount('456', 200);
      console.log = jest.fn();
      api.transferFunds('123', '456', 150);

      expect(console.log).toHaveBeenCalledWith('Insufficient funds in account:', '123');

      const fromAccount = api.bank.accounts.find(acc => acc.accountNumber === '123');
      const toAccount = api.bank.accounts.find(acc => acc.accountNumber === '456');

      expect(fromAccount.balance).toBe(100);
      expect(toAccount.balance).toBe(200);
    });

    test('should handle invalid account numbers for transfer', () => {
      api.addAccount('123', 100);
      console.log = jest.fn();
      api.transferFunds('123', '999', 50);

      const fromAccount = api.bank.accounts.find(acc => acc.accountNumber === '123');

      expect(fromAccount.balance).toBe(100);
    });
  });
}

module.exports = runDescribe;