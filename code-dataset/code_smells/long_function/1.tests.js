const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and process order successfully with CreditCard payment and Express shipment', (done) => {
      const orderDetails = {
        orderId: 'ORD12345',
        itemId: 1,
        customerName: 'John Doe',
        customerAddress: '123 Elm Street',
        quantityOrdered: 2,
        paymentMethod: 'CreditCard',
        shipmentMethod: 'Express'
      };
      api.addOrder(orderDetails);

      const callback = (orderConfirmation) => {
        expect(orderConfirmation).toEqual(expect.objectContaining({
          orderId: 'ORD12345',
          itemId: 1,
          customerName: 'John Doe',
          customerAddress: '123 Elm Street',
          quantityOrdered: 2,
          totalPrice: 1998,
          paymentMethod: 'CreditCard',
          shipmentMethod: 'Express',
          status: 'Confirmed'
        }));
        done();
      };

      const result = api.processOrders(callback);

      expect(result).toBe(true);
    });

    test('should handle order with insufficient quantity', (done) => {
      const orderDetails = {
        orderId: 'ORD12346',
        itemId: 1,
        customerName: 'Jane Doe',
        customerAddress: '456 Oak Street',
        quantityOrdered: 100,
        paymentMethod: 'CreditCard',
        shipmentMethod: 'Standard'
      };
      api.addOrder(orderDetails);

      const callback = (orderConfirmation) => {
        // This callback should not be called for failed orders
        expect(orderConfirmation).toBeUndefined();
      };

      const result = api.processOrders(callback);

      expect(result).toBe(false);
      done();
    });

    test('should handle unsupported payment method', (done) => {
      const orderDetails = {
        orderId: 'ORD12347',
        itemId: 2,
        customerName: 'Alice Smith',
        customerAddress: '789 Pine Street',
        quantityOrdered: 1,
        paymentMethod: 'Bitcoin',
        shipmentMethod: 'Express'
      };
      api.addOrder(orderDetails);

      const callback = (orderConfirmation) => {
        // This callback should not be called for failed orders
        expect(orderConfirmation).toBeUndefined();
      };

      const result = api.processOrders(callback);

      expect(result).toBe(false);
      done();
    });

    test('should process multiple orders', (done) => {
      const order1 = {
        orderId: 'ORD12348',
        itemId: 1,
        customerName: 'John Doe',
        customerAddress: '123 Elm Street',
        quantityOrdered: 2,
        paymentMethod: 'CreditCard',
        shipmentMethod: 'Express'
      };
      const order2 = {
        orderId: 'ORD12349',
        itemId: 2,
        customerName: 'Jane Smith',
        customerAddress: '456 Oak Street',
        quantityOrdered: 1,
        paymentMethod: 'PayPal',
        shipmentMethod: 'Standard'
      };

      api.addOrder(order1);
      api.addOrder(order2);

      const callback = (orderConfirmation) => {
        expect(orderConfirmation.status).toBe('Confirmed');
      };

      const result = api.processOrders(callback);

      expect(result).toBe(true);
      done();
    });
  });
}

module.exports = runDescribe;