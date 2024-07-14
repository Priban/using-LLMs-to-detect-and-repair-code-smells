const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should add a product successfully', () => {
            const product = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 };
            api.addProduct(product);

            const products = api.listAllProducts();
            expect(products).toContainEqual(product);
        });

        test('should remove a product successfully', () => {
            const product = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 };
            api.addProduct(product);
            api.removeProduct(1);

            const products = api.listAllProducts();
            expect(products).not.toContainEqual(product);
        });

        test('should update a product successfully', () => {
            const product = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 };
            api.addProduct(product);
            const updatedProduct = { id: 1, name: 'Laptop Pro', description: 'A high performance laptop with extended battery', price: 1500 };
            api.updateProduct(updatedProduct);

            const products = api.listAllProducts();
            expect(products).toContainEqual(updatedProduct);
        });

        test('should find a product by id successfully', () => {
            const product = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 };
            api.addProduct(product);

            const foundProduct = api.findProductById(1);
            expect(foundProduct).toEqual(product);
        });

        test('should search products successfully', () => {
            const product1 = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 };
            const product2 = { id: 2, name: 'Smartphone', description: 'An innovative smartphone', price: 800 };
            api.addProduct(product1);
            api.addProduct(product2);

            const results = api.searchProducts('Laptop');
            expect(results).toContainEqual(product1);
            expect(results).not.toContainEqual(product2);
        });

        test('should list all products', () => {
            const product1 = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1200 };
            const product2 = { id: 2, name: 'Smartphone', description: 'An innovative smartphone', price: 800 };
            api.addProduct(product1);
            api.addProduct(product2);

            const products = api.listAllProducts();
            expect(products).toContainEqual(product1);
            expect(products).toContainEqual(product2);
        });

        test('should sort products by price and name', () => {
            const product1 = { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 1500 };
            const product2 = { id: 2, name: 'Smartphone', description: 'An innovative smartphone', price: 800 };
            const product3 = { id: 3, name: 'Tablet', description: 'A powerful tablet', price: 800 };
            api.addProduct(product1);
            api.addProduct(product2);
            api.addProduct(product3);

            api.sortProducts();
            const products = api.listAllProducts();
            expect(products).toEqual([product2, product3, product1]);
        });
    });
}

module.exports = runDescribe;