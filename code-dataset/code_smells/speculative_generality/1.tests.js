const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add a product successfully', () => {
      api.addProduct(1, 'Product 1', 100, 'Description 1', 'Category 1');

      const products = api.listAllProducts();

      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        category: 'Category 1'
      });
    });

    test('should remove a product successfully', () => {
      api.addProduct(1, 'Product 1', 100, 'Description 1', 'Category 1');
      api.addProduct(2, 'Product 2', 200, 'Description 2', 'Category 2');

      api.removeProduct(1);
      const products = api.listAllProducts();

      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({
        id: 2,
        name: 'Product 2',
        price: 200,
        description: 'Description 2',
        category: 'Category 2'
      });
    });

    test('should list all products', () => {
      api.addProduct(1, 'Product 1', 100, 'Description 1', 'Category 1');
      api.addProduct(2, 'Product 2', 200, 'Description 2', 'Category 2');

      const products = api.listAllProducts();

      expect(products).toHaveLength(2);
      expect(products).toEqual([
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          description: 'Description 1',
          category: 'Category 1'
        },
        {
          id: 2,
          name: 'Product 2',
          price: 200,
          description: 'Description 2',
          category: 'Category 2'
        }
      ]);
    });

    test('should handle removing a non-existent product gracefully', () => {
      api.addProduct(1, 'Product 1', 100, 'Description 1', 'Category 1');
      api.removeProduct(999);

      const products = api.listAllProducts();

      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        category: 'Category 1'
      });
    });
  });
}

module.exports = runDescribe;