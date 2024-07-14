class ShoppingCart {
    constructor(user) {
        this.user = user;
        this.items = [];
        this.subscribers = [];
        this.notificationCount = 0;
    }

    addItem(product, quantity) {
        const index = this.items.findIndex(item => item.product.id === product.id);
        if (index > -1) {
            this.items[index].quantity += quantity;
            if (this.items[index].quantity > product.stock) {
                console.error('Not enough stock for product:', product.name);
                this.items[index].quantity = product.stock;
            }
        } else {
            if (quantity <= product.stock) {
                this.items.push({ product, quantity });
            } else {
                console.error('Not enough stock for product:', product.name);
                return;
            }
        }
        this.notifySubscribers();
        this.updateCartDisplay();
        this.notificationCount++;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.notifySubscribers();
        this.updateCartDisplay();
        this.notificationCount++;
    }

    updateQuantity(productId, quantity) {
        const index = this.items.findIndex(item => item.product.id === productId);
        if (index > -1) {
            this.items[index].quantity = quantity;
            this.notifySubscribers();
            this.updateCartDisplay();
            this.notificationCount++;
        } else {
            console.error('Product not found in cart');
        }
    }

    calculateTotal() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].product.price * this.items[i].quantity;
        }
        return total;
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    notifySubscribers() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i].update(this);
        }
    }

    updateCartDisplay() {
        console.log(`Cart updated for user ${this.user.username}. Total items: ${this.items.length}`);
    }
}

class CartSubscriber {
    update(cart) {
        console.log('Cart was updated. New total:', cart.calculateTotal());
    }
}

class API {
    constructor(user) {
        this.shoppingCart = new ShoppingCart(user);
    }

    addProductToCart(product, quantity) {
        this.shoppingCart.addItem(product, quantity);
    }

    removeProductFromCart(productId) {
        this.shoppingCart.removeItem(productId);
    }

    updateProductQuantity(productId, quantity) {
        this.shoppingCart.updateQuantity(productId, quantity);
    }

    getTotal() {
        return this.shoppingCart.calculateTotal();
    }

    addSubscriber(subscriber) {
        this.shoppingCart.subscribe(subscriber);
    }
}

module.exports = { API };