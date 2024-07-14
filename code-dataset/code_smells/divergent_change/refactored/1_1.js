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
        return product ? product.getInfo() : "Product not found";
    }

    orderProduct(productId, quantity) {
        const product = this.findProductById(productId);
        return product ? product.order(quantity) : "Product not found";
    }

    updateProductPricing(productId, newPrice) {
        const product = this.findProductById(productId);
        return product ? product.updatePrice(newPrice) : "Product not found";
    }
}

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    getInfo() {
        return `Product Name: ${this.name}, Price: ${this.price}`;
    }

    order(quantity) {
        if (this.stock >= quantity) {
            this.stock -= quantity;
            return `Ordered ${quantity} of ${this.name}`;
        }
        return "Insufficient stock";
    }

    updatePrice(newPrice) {
        this.price = newPrice;
        return "Product price updated";
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