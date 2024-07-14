const runDescribe = (API, description) => {
    describe(description, () => {
        let api;
        const user = { username: 'test_user' };
        const product1 = { id: 1, name: 'Product 1', price: 10, stock: 100 };
        const product2 = { id: 2, name: 'Product 2', price: 20, stock: 50 };

        beforeEach(() => {
            api = new API(user);
        });

        test('should add product to cart and calculate total correctly', () => {
            api.addProductToCart(product1, 5);
            const total = api.getTotal();
            expect(total).toBe(50);
        });

        test('should remove product from cart', () => {
            api.addProductToCart(product1, 5);
            api.removeProductFromCart(product1.id);
            const total = api.getTotal();
            expect(total).toBe(0);
        });

        test('should update product quantity in cart', () => {
            api.addProductToCart(product1, 5);
            api.updateProductQuantity(product1.id, 10);
            const total = api.getTotal();
            expect(total).toBe(100);
        });

        test('should handle adding product with insufficient stock', () => {
            api.addProductToCart(product1, 101); // More than available stock
            const total = api.getTotal();
            expect(total).toBe(0); // No addition should happen due to insufficient stock
        });

        test('should add subscriber and notify on changes', () => {
            const subscriber = { update: jest.fn() };
            api.addSubscriber(subscriber);
            api.addProductToCart(product1, 5);

            expect(subscriber.update).toHaveBeenCalledWith(api.shoppingCart);
        });
    });
}

module.exports = runDescribe;