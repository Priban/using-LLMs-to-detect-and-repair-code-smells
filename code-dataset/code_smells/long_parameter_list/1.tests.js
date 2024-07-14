const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add product to cart successfully', () => {
      const productDetails = {
        id: 1,
        name: 'Smart Watch',
        price: 299.99,
        description: 'A high-tech watch with various smart features.',
        stock: 50,
        weight: 0.3,
        category: 'Electronics',
        image: 'image_url',
        rating: 4.5,
        ratingCount: 10,
        reviewCount: 5,
        discount: true,
        discountType: 'percentage',
        discountValue: 10,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '10% off'
      };

      api.addProductToCart(productDetails);

      const items = api.getCartItems();
      expect(items.length).toBe(1);
      expect(items[0]).toEqual(expect.objectContaining(productDetails));
    });

    test('should remove product from cart successfully', () => {
      const productDetails = {
        id: 1,
        name: 'Smart Watch',
        price: 299.99,
        description: 'A high-tech watch with various smart features.',
        stock: 50,
        weight: 0.3,
        category: 'Electronics',
        image: 'image_url',
        rating: 4.5,
        ratingCount: 10,
        reviewCount: 5,
        discount: true,
        discountType: 'percentage',
        discountValue: 10,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '10% off'
      };

      api.addProductToCart(productDetails);
      api.removeProductFromCart(1);

      const items = api.getCartItems();
      expect(items.length).toBe(0);
    });

    test('should calculate total price correctly', () => {
      const product1 = {
        id: 1,
        name: 'Smart Watch',
        price: 299.99,
        description: 'A high-tech watch with various smart features.',
        stock: 50,
        weight: 0.3,
        category: 'Electronics',
        image: 'image_url',
        rating: 4.5,
        ratingCount: 10,
        reviewCount: 5,
        discount: true,
        discountType: 'percentage',
        discountValue: 10,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '10% off'
      };
      const product2 = {
        id: 2,
        name: 'Laptop',
        price: 999.99,
        description: 'A powerful laptop for professionals.',
        stock: 30,
        weight: 2.5,
        category: 'Computers',
        image: 'image_url',
        rating: 4.8,
        ratingCount: 20,
        reviewCount: 15,
        discount: true,
        discountType: 'fixed',
        discountValue: 100,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '$100 off'
      };

      api.addProductToCart(product1);
      api.addProductToCart(product2);

      const total = api.getTotal();
      expect(total).toBe(1299.98);
    });

    test('should handle adding and removing products correctly', () => {
      const product1 = {
        id: 1,
        name: 'Smart Watch',
        price: 299.99,
        description: 'A high-tech watch with various smart features.',
        stock: 50,
        weight: 0.3,
        category: 'Electronics',
        image: 'image_url',
        rating: 4.5,
        ratingCount: 10,
        reviewCount: 5,
        discount: true,
        discountType: 'percentage',
        discountValue: 10,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '10% off'
      };
      const product2 = {
        id: 2,
        name: 'Laptop',
        price: 999.99,
        description: 'A powerful laptop for professionals.',
        stock: 30,
        weight: 2.5,
        category: 'Computers',
        image: 'image_url',
        rating: 4.8,
        ratingCount: 20,
        reviewCount: 15,
        discount: true,
        discountType: 'fixed',
        discountValue: 100,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '$100 off'
      };

      api.addProductToCart(product1);
      api.addProductToCart(product2);
      api.removeProductFromCart(1);

      const items = api.getCartItems();
      expect(items.length).toBe(1);
      expect(items[0]).toEqual(expect.objectContaining(product2));
    });

    test('should add product to inventory successfully', () => {
      const productDetails = {
        id: 1,
        name: 'Smart Watch',
        price: 299.99,
        description: 'A high-tech watch with various smart features.',
        stock: 50,
        weight: 0.3,
        category: 'Electronics',
        image: 'image_url',
        rating: 4.5,
        ratingCount: 10,
        reviewCount: 5,
        discount: true,
        discountType: 'percentage',
        discountValue: 10,
        discountStart: '2023-01-01',
        discountEnd: '2023-12 - 31',
        discountText: '10% off'
      };
      api.addProductToInventory(productDetails);

      const products = api.getInventoryProducts();
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(expect.objectContaining(productDetails));
    });

    test('should remove product from inventory successfully', () => {
      const productDetails = {
        id: 1,
        name: 'Smart Watch',
        price: 299.99,
        description: 'A high-tech watch with various smart features.',
        stock: 50,
        weight: 0.3,
        category: 'Electronics',
        image: 'image_url',
        rating: 4.5,
        ratingCount: 10,
        reviewCount: 5,
        discount: true,
        discountType: 'percentage',
        discountValue: 10,
        discountStart: '2023-01-01',
        discountEnd: '2023-12-31',
        discountText: '10% off'
      };

      api.addProductToInventory(productDetails);
      api.removeProductFromInventory(1);

      const products = api.getInventoryProducts();
      expect(products.length).toBe(0);
    });
  });
}

module.exports = runDescribe;