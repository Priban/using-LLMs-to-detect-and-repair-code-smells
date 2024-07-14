const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should add products to the order', () => {
            api.addProductToOrder(1, 'Product 1', 100);
            api.addProductToOrder(2, 'Product 2', 150);

            const summary = api.getOrderSummary();

            expect(summary.totalQuantity).toBe(2);
            expect(summary.totalPrice).toBe(250);
        });

        test('should remove a product from the order', () => {
            api.addProductToOrder(1, 'Product 1', 100);
            api.addProductToOrder(2, 'Product 2', 150);

            api.removeProductFromOrder(1);
            const summary = api.getOrderSummary();

            expect(summary.totalQuantity).toBe(1);
            expect(summary.totalPrice).toBe(150);
        });

        test('should apply discount to the order', () => {
            api.addProductToOrder(1, 'Product 1', 100);
            api.addProductToOrder(2, 'Product 2', 150);

            const discountedTotal = api.applyDiscountToOrder(10);

            expect(discountedTotal).toBe(225);
        });

        test('should list product names with prices', () => {
            api.addProductToOrder(1, 'Product 1', 100);
            api.addProductToOrder(2, 'Product 2', 150);

            const productList = api.listProductNames();

            expect(productList).toEqual(['Product 1 100', 'Product 2 150']);
        });

        test('should get order summary', () => {
            api.addProductToOrder(1, 'Product 1', 100);
            api.addProductToOrder(2, 'Product 2', 150);

            const summary = api.getOrderSummary();

            expect(summary).toEqual({
                totalQuantity: 2,
                totalPrice: 250,
                status: 'pending',
                orderDate: expect.any(Date)
            });
        });
    });
}

module.exports = runDescribe;