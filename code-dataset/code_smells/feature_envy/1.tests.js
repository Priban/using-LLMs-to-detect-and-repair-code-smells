const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
            api.addProductToInventory(1, 'Laptop', 1000, 5);
            api.addProductToInventory(2, 'Smartphone', 500, 10);
        });

        test('should add products to inventory and update stock correctly', () => {
            api.addProductToInventory(3, 'Tablet', 300, 20);

            api.addToCart(3, 5);
            expect(api.calculateTotal()).toBe(1500); // 5 Tablets at $300 each

            api.updateCartQuantity(3, 10);
            expect(api.calculateTotal()).toBe(3000); // 10 Tablets at $300 each
        });

        test('should add products to cart and calculate total correctly', () => {
            api.addToCart(1, 2); // 2 Laptops
            api.addToCart(2, 3); // 3 Smartphones

            expect(api.calculateTotal()).toBe(3500); // 2 * 1000 + 3 * 500
        });

        test('should update product quantity in cart correctly', () => {
            api.addToCart(1, 2); // 2 Laptops
            api.updateCartQuantity(1, 3); // Update to 3 Laptops

            expect(api.calculateTotal()).toBe(3000); // 3 * 1000
        });

        test('should display cart contents correctly', () => {
            console.log = jest.fn();

            api.addToCart(1, 1); // 1 Laptop
            api.addToCart(2, 2); // 2 Smartphones
            api.displayCartContents();

            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Laptop'));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Smartphone'));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Total Cart Value: 2000'));
        });

        test('should handle insufficient stock gracefully', () => {
            console.log = jest.fn();

            api.addToCart(1, 10); // Trying to add 10 Laptops, only 5 in stock

            expect(console.log).toHaveBeenCalledWith('Product is not available in the desired quantity.');
            expect(api.calculateTotal()).toBe(0);
        });
    });
}

module.exports = runDescribe;