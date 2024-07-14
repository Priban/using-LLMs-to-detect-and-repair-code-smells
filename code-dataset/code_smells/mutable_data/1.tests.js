
const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and display product info successfully', () => {
      api.addProduct(3, 'Tablet', 300, 20);
      const productInfo = api.getProductInfo(3);

      expect(productInfo).toBe('Product Name: Tablet, Price: 300');
    });

    test('should order product successfully', () => {
      api.addProduct(4, 'Headphones', 100, 15);
      const orderResult = api.orderProduct('user1', 4, 2);

      expect(orderResult).toBe('Ordered 2 of Headphones');
    });

    test('should return error when ordering product with insufficient stock', () => {
      api.addProduct(5, 'Monitor', 200, 1);
      const orderResult = api.orderProduct('user1', 5, 2);

      expect(orderResult).toBe('Insufficient stock or product not found');
    });

    test('should update product price successfully', () => {
      api.addProduct(6, 'Keyboard', 50, 30);
      const updateResult = api.updateProductPrice(6, 45);

      expect(updateResult).toBe('Product price updated');
    });

    test('should return error when updating price of non-existent product', () => {
      const updateResult = api.updateProductPrice(99, 45);

      expect(updateResult).toBe('Product not found');
    });

    test('should update user address successfully', () => {
      const updateAddressResult = api.updateUserAddress('user1', '789 Elm St');

      expect(updateAddressResult).toBe('Address updated');
    });

    test('should return error when updating address of non-existent user', () => {
      const updateAddressResult = api.updateUserAddress('user99', '789 Elm St');

      expect(updateAddressResult).toBe('User not found');
    });
  });
}

module.exports = runDescribe;