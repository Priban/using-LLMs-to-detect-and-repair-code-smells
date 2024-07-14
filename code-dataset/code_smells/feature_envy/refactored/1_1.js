class Product {
    constructor({ id, name, price, stock }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    updateStock(quantity) {
        this.stock += quantity;
    }

    isAvailable(quantity) {
        return this.stock >= quantity;
    }

    getPrice() {
        return this.price;
    }
}

class ProductInventory {
    constructor() {
        this.products = [];
    }

    findProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    addProduct(product) {
        this.products.push(product);
    }

    updateStock(productId, quantity) {
        const product = this.findProductById(productId);
        if (product) {
            product.updateStock(quantity);
        }
    }

    isProductAvailable(productId, quantity) {
        const product = this.findProductById(productId);
        return product ? product.isAvailable(quantity) : false;
    }

    getProductPrice(productId) {
        const product = this.findProductById(productId);
        return product ? product.getPrice() : 0;
    }
}

class CartManager {
    constructor(productInventory) {
        this.productInventory = productInventory;
        this.cart = [];
    }

    addToCart(productId, quantity) {
        if (this.productInventory.isProductAvailable(productId, quantity)) {
            const cartItem = this.cart.find(item => item.productId === productId);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                this.cart.push({ productId, quantity });
            }
            this.productInventory.updateStock(productId, -quantity);
        } else {
            console.log('Product is not available in the desired quantity.');
        }
    }

    updateQuantity(productId, newQuantity) {
        const cartItem = this.cart.find(item => item.productId === productId);
        if (cartItem) {
            const difference = newQuantity - cartItem.quantity;
            if (this.productInventory.isProductAvailable(productId, difference)) {
                cartItem.quantity = newQuantity;
                this.productInventory.updateStock(productId, -difference);
            } else {
                console.log('Product is not available in the desired quantity.');
            }
        } else {
            console.log('Product not found in cart.');
        }
    }

    calculateTotal() {
        return this.cart.reduce((total, cartItem) => {
            const productPrice = this.productInventory.getProductPrice(cartItem.productId);
            return total + (cartItem.quantity * productPrice);
        }, 0);
    }

    displayCartContents() {
        this.cart.forEach(cartItem => {
            this.displayCartItem(cartItem);
        });
        this.displayTotalCartValue();
    }

    displayCartItem(cartItem) {
        const product = this.productInventory.findProductById(cartItem.productId);
        console.log(`Product: ${product.name}, Quantity: ${cartItem.quantity}, Price per item: ${product.price}`);
    }

    displayTotalCartValue() {
        console.log(`Total Cart Value: ${this.calculateTotal()}`);
    }
}

class API {
    constructor() {
        this.inventory = new ProductInventory();
        this.cartManager = new CartManager(this.inventory);
    }

    addProductToInventory(id, name, price, stock) {
        const product = new Product({ id, name, price, stock });
        this.inventory.addProduct(product);
    }

    addToCart(productId, quantity) {
        this.cartManager.addToCart(productId, quantity);
    }

    updateCartQuantity(productId, newQuantity) {
        this.cartManager.updateQuantity(productId, newQuantity);
    }

    calculateTotal() {
        return this.cartManager.calculateTotal();
    }

    displayCartContents() {
        return this.cartManager.displayCartContents();
    }
}

module.exports = { API };