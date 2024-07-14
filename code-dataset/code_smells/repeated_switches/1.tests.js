const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add an item to the cart and checkout successfully', () => {
      api.addItemToCart('Laptop', 1000, 1, 'electronics');
      const result = api.checkout();

      expect(result.totalPrice).toBeCloseTo(900);
      expect(result.shippingCost).toBe(10);
      expect(result.grandTotal).toBeCloseTo(910);
    });

    test('should apply correct discounts and shipping for books', () => {
      api.addItemToCart('Book', 20, 5, 'books');
      const result = api.checkout();

      expect(result.totalPrice).toBeCloseTo(85); // 20 * 5 - 15% discount
      expect(result.shippingCost).toBe(5);
      expect(result.grandTotal).toBeCloseTo(90);
    });

    test('should apply correct discounts and shipping for clothing', () => {
      api.addItemToCart('T-Shirt', 30, 3, 'clothing');
      const result = api.checkout();

      expect(result.totalPrice).toBeCloseTo(85.5); // 30 * 3 - 5% discount
      expect(result.shippingCost).toBe(3);
      expect(result.grandTotal).toBeCloseTo(88.5);
    });

    test('should handle multiple items in the cart', () => {
      api.addItemToCart('Laptop', 1000, 1, 'electronics');
      api.addItemToCart('Book', 20, 5, 'books');
      api.addItemToCart('T-Shirt', 30, 3, 'clothing');
      const result = api.checkout();

      const expectedTotalPrice = (1000 * 0.9) + (20 * 5 * 0.85) + (30 * 3 * 0.95);
      const expectedShippingCost = 10 + 5 + 3;
      const expectedGrandTotal = expectedTotalPrice + expectedShippingCost;

      expect(result.totalPrice).toBeCloseTo(expectedTotalPrice);
      expect(result.shippingCost).toBe(expectedShippingCost);
      expect(result.grandTotal).toBeCloseTo(expectedGrandTotal);
    });
  });
}

module.exports = runDescribe;