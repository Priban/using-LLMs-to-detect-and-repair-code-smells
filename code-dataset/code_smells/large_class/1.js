class EShop {
    constructor() {
        this.products = [
            { id: 1, name: 'Laptop', price: 1000, stock: 10 },
            { id: 2, name: 'Smartphone', price: 700, stock: 15 },
            { id: 3, name: 'Tablet', price: 500, stock: 20 },
        ];
        this.cart = [];
        this.user = { loggedIn: false, name: '', email: '' };
    }

    listProducts() {
        return this.products;
    }

    addToCart(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (!product || product.stock < quantity) {
            throw new Error('Product is not available.');
        }
        const cartItem = this.cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            this.cart.push({ productId, quantity });
        }
        product.stock -= quantity;
    }

    removeFromCart(productId) {
        const cartIndex = this.cart.findIndex(item => item.productId === productId);
        if (cartIndex > -1) {
            const product = this.products.find(p => p.id === productId);
            product.stock += this.cart[cartIndex].quantity;
            this.cart.splice(cartIndex, 1);
        }
    }

    checkout() {
        if (!this.user.loggedIn) {
            throw new Error('Please log in to proceed to checkout.');
        }
        if (this.cart.length === 0) {
            throw new Error('Your cart is empty.');
        }
        // Simulate checkout process
        this.cart = [];
        return 'Checkout successful.';
    }

    loginUser(email, password) {
        // Simulate user login with static credentials
        if (email === 'user@example.com' && password === 'password123') {
            this.user = { loggedIn: true, name: 'John Doe', email: email };
        } else {
            throw new Error('Login failed. Please check your credentials.');
        }
    }

    logoutUser() {
        this.user = { loggedIn: false, name: '', email: '' };
    }

    displayCartContents() {
        return this.cart.map(item => {
            const product = this.products.find(p => p.id === item.productId);
            return { product: product.name, quantity: item.quantity };
        });
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