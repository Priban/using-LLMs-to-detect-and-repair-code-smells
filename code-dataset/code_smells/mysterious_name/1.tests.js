const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add item to cart', () => {
      const item = { id: 1, name: 'Laptop', price: 800 };
      api.addItemToCart(item);

      expect(api.getTotalAmount()).toBe(800);
    });

    test('should remove item from cart', () => {
      const item = { id: 1, name: 'Laptop', price: 800 };
      api.addItemToCart(item);
      api.removeItemFromCart(1);

      expect(api.getTotalAmount()).toBe(0);
    });

    test('should update item quantity in cart', () => {
      const item = { id: 1, name: 'Laptop', price: 800 };
      api.addItemToCart(item);
      api.updateItemQuantity(1, 2);

      expect(api.getTotalAmount()).toBe(1600);
    });

    test('should calculate total amount', () => {
      const item1 = { id: 1, name: 'Laptop', price: 800 };
      const item2 = { id: 2, name: 'Mouse', price: 40 };
      api.addItemToCart(item1);
      api.addItemToCart(item2);

      expect(api.getTotalAmount()).toBe(840);
    });

    test('should checkout cart with items', () => {
      const item = { id: 1, name: 'Laptop', price: 800 };
      api.addItemToCart(item);

      const result = api.checkoutCart();

      expect(result).toBe(true);
    });

    test('should not checkout empty cart', () => {
      const result = api.checkoutCart();

      expect(result).toBe(false);
    });
  });
}

module.exports = runDescribe;