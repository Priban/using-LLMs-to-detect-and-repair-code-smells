const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add products to the cart and calculate total cost', () => {
      api.addProductToCart(1, 'Laptop', 1000, 0.1, 1);
      api.addProductToCart(2, 'Mouse', 50, 0.05, 2);

      const totalCost = api.getTotalCost();

      expect(totalCost).toBeCloseTo(1000 * 0.9 + 50 * 2 * 0.95);
    });

    test('should update product quantity and recalculate total cost', () => {
      api.addProductToCart(1, 'Laptop', 1000, 0.1, 1);
      api.addProductToCart(2, 'Mouse', 50, 0.05, 2);
      api.updateProductQuantity(2, 1);

      const totalCost = api.getTotalCost();

      expect(totalCost).toBeCloseTo(1000 * 0.9 + 50 * 1 * 0.95);
    });

    test('should remove product from the cart and recalculate total cost', () => {
      api.addProductToCart(1, 'Laptop', 1000, 0.1, 1);
      api.addProductToCart(2, 'Mouse', 50, 0.05, 2);
      api.removeProductFromCart(1);

      const totalCost = api.getTotalCost();

      expect(totalCost).toBeCloseTo(50 * 2 * 0.95);
    });

    test('should handle adding the same product multiple times', () => {
      api.addProductToCart(1, 'Laptop', 1000, 0.1, 1);
      api.addProductToCart(1, 'Laptop', 1000, 0.1, 2);

      const totalCost = api.getTotalCost();

      expect(totalCost).toBeCloseTo(1000 * 3 * 0.9);
    });
  });
}

module.exports = runDescribe;