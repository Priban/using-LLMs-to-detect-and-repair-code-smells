const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
      api.clearCart();
    });

    test('should add products to cart', () => {
      api.addProductToCart(1, 2);
      expect(api.calculateTotal()).toBe(2000);

      api.addProductToCart(2, 1);
      expect(api.calculateTotal()).toBe(2500);
    });

    test('should remove product from cart', () => {
      api.addProductToCart(1, 2);
      api.addProductToCart(2, 1);
      expect(api.calculateTotal()).toBe(2500);

      api.removeProductFromCart(1);
      expect(api.calculateTotal()).toBe(500);
    });

    test('should update product quantity in cart', () => {
      api.addProductToCart(1, 2);
      expect(api.calculateTotal()).toBe(2000);

      api.updateProductQuantity(1, 3);
      expect(api.calculateTotal()).toBe(3000);
    });

    test('should calculate total amount correctly', () => {
      api.addProductToCart(1, 2);
      api.addProductToCart(2, 1);
      expect(api.calculateTotal()).toBe(2500);
    });

    test('should checkout and empty the cart', () => {
      api.addProductToCart(1, 2);
      api.addProductToCart(2, 1);
      api.checkout();
      expect(api.calculateTotal()).toBe(0);
    });
  });
}

module.exports = runDescribe;