const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should add and display product info successfully', () => {
            api.addProduct(1, 'Laptop', 1500, 10);
            const productInfo = api.getProductInfo(1);

            expect(productInfo).toBe('Product Name: Laptop, Price: 1500');
        });

        test('should order product successfully', () => {
            api.addProduct(1, 'Laptop', 1500, 10);
            const orderResult = api.orderProduct(1, 2);

            expect(orderResult).toBe('Ordered 2 of Laptop');
        });

        test('should return error when ordering product with insufficient stock', () => {
            api.addProduct(1, 'Laptop', 1500, 1);
            const orderResult = api.orderProduct(1, 2);

            expect(orderResult).toBe('Insufficient stock or product not found');
        });

        test('should update product price successfully', () => {
            api.addProduct(1, 'Laptop', 1500, 10);
            const updateResult = api.updateProductPrice(1, 1400);

            expect(updateResult).toBe('Product price updated');
        });

        test('should return error when updating price of non-existent product', () => {
            const updateResult = api.updateProductPrice(99, 1400);

            expect(updateResult).toBe('Product not found');
        });
    });
}

module.exports = runDescribe;