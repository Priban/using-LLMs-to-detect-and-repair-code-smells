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

class ShoppingCartManager {
    constructor() {
        this.cart = new Cart();
    }

    addProductToCart(product, quantity) {
        this.cart.addItem(product, quantity);
    }

    removeProductFromCart(productId) {
        this.cart.removeItem(productId);
    }

    updateProductQuantity(productId, quantity) {
        this.cart.updateItemQuantity(productId, quantity);
    }

    getTotalCartValue() {
        return this.cart.calculateTotal();
    }
}

class API {
    constructor() {
        this.shoppingCartManager = new ShoppingCartManager();
    }

    addProduct(id, name, price, quantity) {
        const product = new Product(id, name, price);
        this.shoppingCartManager.addProductToCart(product, quantity);
    }

    removeProduct(productId) {
        this.shoppingCartManager.removeProductFromCart(productId);
    }

    updateProductQuantity(productId, quantity) {
        this.shoppingCartManager.updateProductQuantity(productId, quantity);
    }

    getTotalValue() {
        return this.shoppingCartManager.getTotalCartValue();
    }
}

module.exports = { API };