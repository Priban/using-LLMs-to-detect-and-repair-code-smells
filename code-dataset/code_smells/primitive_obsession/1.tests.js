const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should add a product successfully', () => {
            const productDetails = { id: '1', name: 'Laptop', price: '1000 USD', contactPhone: '123-456-7890', quantity: 10 };
            api.addProduct(productDetails.id, productDetails.name, productDetails.price, productDetails.contactPhone, productDetails.quantity);

            const details = api.getProductDetails(productDetails.id);
            expect(details).toBe('Product ID: 1, Name: Laptop, Price: 1000 USD, Quantity: 10');
        });

        test('should remove a product successfully', () => {
            const productDetails = { id: '2', name: 'Mouse', price: '25 USD', contactPhone: '123-456-7890', quantity: 50 };
            api.addProduct(productDetails.id, productDetails.name, productDetails.price, productDetails.contactPhone, productDetails.quantity);

            api.removeProduct(productDetails.id);
            const details = api.getProductDetails(productDetails.id);
            expect(details).toBe('Product not found');
        });

        test('should get the currency of a product price', () => {
            const productDetails = { id: '3', name: 'Keyboard', price: '75 USD', contactPhone: '123-456-7890', quantity: 30 };
            api.addProduct(productDetails.id, productDetails.name, productDetails.price, productDetails.contactPhone, productDetails.quantity);

            const currency = api.getCurrency(productDetails.id);
            expect(currency).toBe('USD');
        });

        test('should return null for currency if product does not exist', () => {
            const currency = api.getCurrency('nonexistent');
            expect(currency).toBeNull();
        });

        test('should handle multiple products', () => {
            const product1 = { id: '4', name: 'Monitor', price: '200 USD', contactPhone: '123-456-7890', quantity: 20 };
            const product2 = { id: '5', name: 'Printer', price: '150 USD', contactPhone: '123-456-7890', quantity: 5 };

            api.addProduct(product1.id, product1.name, product1.price, product1.contactPhone, product1.quantity);
            api.addProduct(product2.id, product2.name, product2.price, product2.contactPhone, product2.quantity);

            const details1 = api.getProductDetails(product1.id);
            const details2 = api.getProductDetails(product2.id);

            expect(details1).toBe('Product ID: 4, Name: Monitor, Price: 200 USD, Quantity: 20');
            expect(details2).toBe('Product ID: 5, Name: Printer, Price: 150 USD, Quantity: 5');
        });
    });
}

module.exports = runDescribe;