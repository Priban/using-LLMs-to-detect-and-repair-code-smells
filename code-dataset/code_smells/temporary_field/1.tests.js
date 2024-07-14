const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add item to cart and update cart total', () => {
      const item = { id: 1, name: 'Smartphone', price: 299.99 };
      api.addItemToCart(item);

      expect(api.getCartTotal()).toBe(299.99);
    });

    test('should remove item from cart and update cart total', () => {
      const item1 = { id: 1, name: 'Smartphone', price: 299.99 };
      const item2 = { id: 2, name: 'Laptop', price: 899.99 };
      api.addItemToCart(item1);
      api.addItemToCart(item2);

      api.removeItemFromCart(1);

      expect(api.getCartTotal()).toBe(899.99);
    });

    test('should checkout successfully with items in cart', () => {
      const item = { id: 1, name: 'Smartphone', price: 299.99 };
      api.addItemToCart(item);

      const result = api.checkoutCart();

      expect(result).toBe(true);
      expect(api.getCartTotal()).toBe(0);
    });

    test('should fail to checkout with an empty cart', () => {
      const result = api.checkoutCart();

      expect(result).toBe(false);
    });
  });
}

module.exports = runDescribe;