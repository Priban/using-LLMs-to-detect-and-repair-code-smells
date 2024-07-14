class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    reduceStock(quantity) {
        if (this.stock < quantity) {
            throw new Error('Product is not available.');
        }
        this.stock -= quantity;
    }

    increaseStock(quantity) {
        this.stock += quantity;
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    increaseQuantity(quantity) {
        this.quantity += quantity;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const cartItem = this.items.find(item => item.product.id === product.id);
        if (cartItem) {
            cartItem.increaseQuantity(quantity);
        } else {
            this.items.push(new CartItem(product, quantity));
        }
        product.reduceStock(quantity);
    }

    removeItem(productId) {
        const cartIndex = this.items.findIndex(item => item.product.id === productId);
        if (cartIndex > -1) {
            const cartItem = this.items[cartIndex];
            cartItem.product.increaseStock(cartItem.quantity);
            this.items.splice(cartIndex, 1);
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }

    clear() {
        this.items = [];
    }

    getContents() {
        return this.items.map(item => ({
            product: item.product.name,
            quantity: item.quantity
        }));
    }
}

class User {
    constructor() {
        this.loggedIn = false;
        this.name = '';
        this.email = '';
    }

    login(email, password) {
        if (email === 'user@example.com' && password === 'password123') {
            this.loggedIn = true;
            this.name = 'John Doe';
            this.email = email;
        } else {
            throw new Error('Login failed. Please check your credentials.');
        }
    }

    logout() {
        this.loggedIn = false;
        this.name = '';
        this.email = '';
    }
}

class EShop {
    constructor() {
        this.products = [
            new Product(1, 'Laptop', 1000, 10),
            new Product(2, 'Smartphone', 700, 15),
            new Product(3, 'Tablet', 500, 20),
        ];
        this.cart = new Cart();
        this.user = new User();
    }

    listProducts() {
        return this.products;
    }

    addToCart(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product is not available.');
        }
        this.cart.addItem(product, quantity);
    }

    removeFromCart(productId) {
        this.cart.removeItem(productId);
    }

    checkout() {
        if (!this.user.loggedIn) {
            throw new Error('Please log in to proceed to checkout.');
        }
        if (this.cart.isEmpty()) {
            throw new Error('Your cart is empty.');
        }
        // Simulate checkout process
        this.cart.clear();
        return 'Checkout successful.';
    }

    loginUser(email, password) {
        this.user.login(email, password);
    }

    logoutUser() {
        this.user.logout();
    }

    displayCartContents() {
        return this.cart.getContents();
    }
}

class API {
    constructor() {
        this.eshop = new EShop();
    }

    listProducts() {
        return this.eshop.listProducts();
    }

    addToCart(productId, quantity) {
        return this.eshop.addToCart(productId, quantity);
    }

    removeFromCart(productId) {
        return this.eshop.removeFromCart(productId);
    }

    checkout() {
        return this.eshop.checkout();
    }

    loginUser(email, password) {
        return this.eshop.loginUser(email, password);
    }

    logoutUser() {
        return this.eshop.logoutUser();
    }

    displayCartContents() {
        return this.eshop.displayCartContents();
    }
}

module.exports = { API };