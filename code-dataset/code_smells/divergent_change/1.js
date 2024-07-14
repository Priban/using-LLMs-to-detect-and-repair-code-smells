class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    findProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    displayProductInfo(productId) {
        const product = this.findProductById(productId);
        if (product) {
            return `Product Name: ${product.name}, Price: ${product.price}`;
        }
        return "Product not found";
    }

    orderProduct(productId, quantity) {
        const product = this.findProductById(productId);
        if (product && product.stock >= quantity) {
            product.stock -= quantity;
            return `Ordered ${quantity} of ${product.name}`;
        }
        return "Insufficient stock or product not found";
    }

    updateProductPricing(productId, newPrice) {
        const product = this.findProductById(productId);
        if (product) {
            product.price = newPrice;
            return "Product price updated";
        }
        return "Product not found";
    }
}

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Additional unrelated methods...
}

class API {
    constructor() {
        this.productManager = new ProductManager();
    }

    addProduct(id, name, price, stock) {
        const product = new Product(id, name, price, stock);
        this.productManager.addProduct(product);
    }

    getProductInfo(productId) {
        return this.productManager.displayProductInfo(productId);
    }

    orderProduct(productId, quantity) {
        return this.productManager.orderProduct(productId, quantity);
    }

    updateProductPrice(productId, newPrice) {
        return this.productManager.updateProductPricing(productId, newPrice);
    }
}

module.exports = { API };