const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and display product info successfully', () => {
      api.addProduct(1, 'Laptop', 1500, 10);
      const productInfo = api.getProductInfo(1);

      expect(productInfo).toBe('Product Name: Laptop, Price: 1500, Stock: 10');
    });

    test('should order product successfully', () => {
      api.addCustomer(1, 'John Doe', 'john@example.com');
      api.addProduct(1, 'Laptop', 1500, 10);
      const orderResult = api.orderProduct(1, 1, 2);

      expect(orderResult).toBe('Ordered 2 of Laptop for John Doe');
    });

    test('should return error when ordering product with insufficient stock', () => {
      api.addCustomer(1, 'John Doe', 'john@example.com');
      api.addProduct(1, 'Laptop', 1500, 1);
      const orderResult = api.orderProduct(1, 1, 2);

      expect(orderResult).toBe('Insufficient stock');
    });

    test('should update product price successfully', () => {
      api.addProduct(1, 'Laptop', 1500, 10);
      const updateResult = api.updateProductPrice(1, 1400);

      expect(updateResult).toBe('Product price updated');
    });

    test('should return error when updating price of non-existent product', () => {
      const updateResult = api.updateProductPrice(99, 1400);

      expect(updateResult).toBe('Product not found');
    });

    test('should add and display customer info successfully', () => {
      api.addCustomer(1, 'John Doe', 'john@example.com');
      const customerInfo = api.getCustomerInfo(1);

      expect(customerInfo).toBe('Customer Name: John Doe, Email: john@example.com, Orders: 0');
    });

    test('should process payment successfully', () => {
      api.addCustomer(1, 'John Doe', 'john@example.com');
      api.addProduct(1, 'Laptop', 1500, 10);
      api.orderProduct(1, 1, 2);
      const paymentResult = api.processPayment(1, 3000);

      expect(paymentResult).toBe('Payment status: Completed');
    });

    test('should return error when processing payment for non-existent order', () => {
      const paymentResult = api.processPayment(99, 3000);

      expect(paymentResult).toBe('Order not found');
    });
  });
}

module.exports = runDescribe;