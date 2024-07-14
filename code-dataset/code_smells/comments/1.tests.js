const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add item to cart and shift other items based on quantity', () => {
      const item1 = { id: 1, name: 'T-Shirt', price: 19.99, quantity: 2, position: 0 };
      const item2 = { id: 2, name: 'Jeans', price: 49.99, quantity: 1, position: 0 };

      api.addItemToCart(item1);
      api.addItemToCart(item2);

      const items = api.getItems();
      expect(items[0].id).toBe(1);
      expect(items[0].position).toBe(0);
      expect(items[1].id).toBe(2);
      expect(items[1].position).toBe(2);
    });

    test('should add an item with an existing id and increase its quantity', () => {
      const item1 = { id: 1, name: 'T-Shirt', price: 19.99, quantity: 2, position: 0 };
      const item2 = { id: 1, name: 'T-Shirt', price: 19.99, quantity: 3, position: 0 };

      api.addItemToCart(item1);
      api.addItemToCart(item2);

      const items = api.getItems();
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(5);
    });

    test('should handle adding multiple items and calculate positions correctly', () => {
      const item1 = { id: 1, name: 'T-Shirt', price: 19.99, quantity: 2, position: 0 };
      const item2 = { id: 2, name: 'Jeans', price: 49.99, quantity: 1, position: 0 };
      const item3 = { id: 3, name: 'Shoes', price: 89.99, quantity: 1, position: 0 };

      api.addItemToCart(item1);
      api.addItemToCart(item2);
      api.addItemToCart(item3);

      const items = api.getItems();
      expect(items.length).toBe(3);
      expect(items[0].position).toBe(0);
      expect(items[1].position).toBe(2);
      expect(items[2].position).toBe(3);
    });

    test('should log item addition to cart', () => {
      const item = { id: 1, name: 'T-Shirt', price: 19.99, quantity: 2, position: 0 };

      api.addItemToCart(item);
      const logs = api.getLogs();

      expect(logs.length).toBe(1);
      expect(logs[0].message).toBe('Added 2 T-Shirt(s) to cart');
    });
  });
};

module.exports = runDescribe;