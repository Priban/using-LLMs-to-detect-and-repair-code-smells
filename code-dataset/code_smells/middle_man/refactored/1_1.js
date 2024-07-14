class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
    }

    calculateItemTotal() {
        return this.product.price * this.quantity;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.updateQuantity(existingItem.quantity + quantity);
        } else {
            this.items.push(new CartItem(product, quantity));
        }
    }

    removeItem(productId) {
        const index = this.items.findIndex(item => item.product.id === productId);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    updateItemQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.updateQuantity(quantity);
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.calculateItemTotal(), 0);
    }
}

class API {
    constructor() {
        this.cart = new Cart();
    }

    createProduct(id, name, price) {
        return new Product(id, name, price);
    }

    addProduct(id, name, price, quantity) {
        const product = this.createProduct(id, name, price);
        this.cart.addItem(product, quantity);
    }

    removeProduct(productId) {
        this.cart.removeItem(productId);
    }

    updateProductQuantity(productId, quantity) {
        this.cart.updateItemQuantity(productId, quantity);
    }

    getTotalValue() {
        return this.cart.calculateTotal();
    }
}

module.exports = { API };