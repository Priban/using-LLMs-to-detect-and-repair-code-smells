const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add a product to inventory', () => {
      const product = api.addProductToInventory('Laptop', 1000);
      expect(product.name).toBe('Laptop');
      expect(product.price).toBe(1000);
    });

    test('should create an order with a product', () => {
      const order = api.createOrder('123', 'Phone', 500);
      expect(order.orderId).toBe('123');
      expect(order.product.name).toBe('Phone');
      expect(order.product.price).toBe(500);
    });

    test('should add a customer', () => {
      const customer = api.addCustomer('Alice', 'alice@example.com');
      expect(customer.name).toBe('Alice');
      expect(customer.email).toBe('alice@example.com');
    });

    test('should update customer email', () => {
      api.addCustomer('Bob', 'bob@example.com');
      const result = api.updateCustomerEmail('Bob', 'bob.new@example.com');
      expect(result).toBe(true);
    });

    test('should update product price', () => {
      api.addProductToInventory('Tablet', 300);
      const result = api.updateProductPrice('Tablet', 350);
      expect(result).toBe(true);
    });

    test('should not update email of a non-existing customer', () => {
      const result = api.updateCustomerEmail('NonExistent', 'nonexistent@example.com');
      expect(result).toBe(false);
    });

    test('should not update price of a non-existing product', () => {
      const result = api.updateProductPrice('NonExistentProduct', 999);
      expect(result).toBe(false);
    });
  });
}

module.exports = runDescribe;