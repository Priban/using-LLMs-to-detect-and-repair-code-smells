const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add item to cart and calculate total price with tax', () => {
      api.addItemToCart('Laptop', 1000);
      api.addItemToCart('Phone', 500);

      const totalPrice = api.getTotalPrice();

      expect(totalPrice).toBeCloseTo(1800); // 1000 * 1.2 + 500 * 1.2 = 1200 + 600 = 1800
    });

    test('should print total price correctly', () => {
      console.log = jest.fn();

      api.addItemToCart('Laptop', 1000);
      api.addItemToCart('Phone', 500);

      api.printCartTotal();

      expect(console.log).toHaveBeenCalledWith('Total price with tax: $1800.00');
    });

    test('should handle empty cart', () => {
      const totalPrice = api.getTotalPrice();

      expect(totalPrice).toBe(0);
    });

    test('should add multiple items and calculate total price', () => {
      api.addItemToCart('Laptop', 1000);
      api.addItemToCart('Phone', 500);
      api.addItemToCart('Headphones', 200);

      const totalPrice = api.getTotalPrice();

      expect(totalPrice).toBeCloseTo(2040); // 1000 * 1.2 + 500 * 1.2 + 200 * 1.2 = 1200 + 600 + 240 = 2040
    });
  });
}

module.exports = runDescribe;