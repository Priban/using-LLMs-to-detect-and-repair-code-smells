const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add products to the cart and calculate total value', () => {
      api.addProduct(1, 'Apple', 0.99, 2);
      api.addProduct(2, 'Banana', 0.59, 3);

      const totalValue = api.getTotalValue();

      expect(totalValue).toBeCloseTo(3.75);
    });

    test('should update product quantity in the cart', () => {
      api.addProduct(1, 'Apple', 0.99, 2);
      api.updateProductQuantity(1, 5);

      const totalValue = api.getTotalValue();

      expect(totalValue).toBeCloseTo(4.95);
    });

    test('should remove product from the cart', () => {
      api.addProduct(1, 'Apple', 0.99, 2);
      api.addProduct(2, 'Banana', 0.59, 3);
      api.removeProduct(2);

      const totalValue = api.getTotalValue();

      expect(totalValue).toBeCloseTo(1.98);
    });

    test('should handle multiple operations correctly', () => {
      api.addProduct(1, 'Apple', 0.99, 2);
      api.addProduct(2, 'Banana', 0.59, 3);
      api.updateProductQuantity(1, 5);
      api.removeProduct(2);

      const totalValue = api.getTotalValue();

      expect(totalValue).toBeCloseTo(4.95);
    });
  });
}

module.exports = runDescribe;