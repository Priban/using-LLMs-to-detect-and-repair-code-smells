const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add a product to the cart successfully', () => {
      const customerDetails = { name: 'John Doe', email: 'john@example.com', address: '123 Main St' };
      api.addToCart(1, 2, customerDetails);

      const cart = api.getCart(customerDetails);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({ productID: 1, quantity: 2, price: 10 });
    });

    test('should remove a product from the cart successfully', () => {
      const customerDetails = { name: 'Jane Doe', email: 'jane@example.com', address: '456 Elm St' };
      api.addToCart(1, 2, customerDetails);
      api.removeFromCart(1, 1, customerDetails);

      const cart = api.getCart(customerDetails);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({ productID: 1, quantity: 1, price: 10 });
    });

    test('should remove a product completely from the cart when quantity is equal or less', () => {
      const customerDetails = { name: 'Jane Doe', email: 'jane@example.com', address: '456 Elm St' };
      api.addToCart(1, 2, customerDetails);
      api.removeFromCart(1, 2, customerDetails);

      const cart = api.getCart(customerDetails);

      expect(cart.items).toHaveLength(0);
    });

    test('should return the correct cart for a customer', () => {
      const customerDetails1 = { name: 'John Doe', email: 'john@example.com', address: '123 Main St' };
      const customerDetails2 = { name: 'Jane Doe', email: 'jane@example.com', address: '456 Elm St' };

      api.addToCart(1, 2, customerDetails1);
      api.addToCart(2, 1, customerDetails2);

      const cart1 = api.getCart(customerDetails1);
      const cart2 = api.getCart(customerDetails2);

      expect(cart1.items).toHaveLength(1);
      expect(cart1.items[0]).toEqual({ productID: 1, quantity: 2, price: 10 });

      expect(cart2.items).toHaveLength(1);
      expect(cart2.items[0]).toEqual({ productID: 2, quantity: 1, price: 10 });
    });
  });
}

module.exports = runDescribe;