const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should list all products', () => {
            const products = api.listProducts();
            expect(products.length).toBe(3);
            expect(products[0].name).toBe('Laptop');
        });

        test('should add product to cart', () => {
            api.addToCart(1, 2);
            const cart = api.displayCartContents();
            expect(cart.length).toBe(1);
            expect(cart[0].product).toBe('Laptop');
            expect(cart[0].quantity).toBe(2);
        });

        test('should remove product from cart', () => {
            api.addToCart(1, 2);
            api.removeFromCart(1);
            const cart = api.displayCartContents();
            expect(cart.length).toBe(0);
        });

        test('should login and checkout successfully', () => {
            api.loginUser('user@example.com', 'password123');
            api.addToCart(1, 2);
            const checkoutMessage = api.checkout();
            expect(checkoutMessage).toBe('Checkout successful.');
            const cart = api.displayCartContents();
            expect(cart.length).toBe(0);
        });

        test('should throw error if user tries to checkout without logging in', () => {
            api.addToCart(1, 2);
            expect(() => api.checkout()).toThrow('Please log in to proceed to checkout.');
        });

        test('should throw error if product is not available', () => {
            expect(() => api.addToCart(1, 20)).toThrow('Product is not available.');
        });

        test('should login and logout successfully', () => {
            api.loginUser('user@example.com', 'password123');
            api.logoutUser();
            expect(() => api.checkout()).toThrow('Please log in to proceed to checkout.');
        });
    });
}

module.exports = runDescribe;