class Product {
    constructor(id, name, price, discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    get discountedPrice() {
        return this.price * (1 - this.discount);
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    get totalPrice() {
        return this.product.discountedPrice * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addProduct(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new CartItem(product, quantity));
        }
    }

    removeProduct(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    get totalCost() {
        return this.items.reduce((total, item) => total + item.totalPrice, 0);
    }
}

class API {
    constructor() {
        this.shoppingCart = new ShoppingCart();
    }

    addProductToCart(id, name, price, discount, quantity) {
        const product = new Product(id, name, price, discount);
        this.shoppingCart.addProduct(product, quantity);
    }

    removeProductFromCart(productId) {
        this.shoppingCart.removeProduct(productId);
    }

    updateProductQuantity(productId, quantity) {
        this.shoppingCart.updateQuantity(productId, quantity);
    }

    getTotalCost() {
        return this.shoppingCart.totalCost;
    }
}

module.exports = { API };