class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    updateQuantity(quantity) {
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor(user) {
        this.user = user;
        this.items = [];
        this.subscribers = [];
        this.notificationCount = 0;
    }

    addItem(product, quantity) {
        const index = this.findItemIndex(product.id);
        if (index > -1) {
            this.updateExistingItem(index, quantity, product);
        } else {
            this.addNewItem(product, quantity);
        }
        this.notifyAndUpdate();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.notifyAndUpdate();
    }

    updateQuantity(productId, quantity) {
        const index = this.findItemIndex(productId);
        if (index > -1) {
            this.items[index].updateQuantity(quantity);
            this.notifyAndUpdate();
        } else {
            console.error('Product not found in cart');
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    notifySubscribers() {
        this.subscribers.forEach(subscriber => subscriber.update(this));
    }

    updateCartDisplay() {
        console.log(`Cart updated for user ${this.user.username}. Total items: ${this.items.length}`);
    }

    notifyAndUpdate() {
        this.notifySubscribers();
        this.updateCartDisplay();
        this.notificationCount++;
    }

    findItemIndex(productId) {
        return this.items.findIndex(item => item.product.id === productId);
    }

    updateExistingItem(index, quantity, product) {
        this.items[index].updateQuantity(this.items[index].quantity + quantity);
        if (this.items[index].quantity > product.stock) {
            console.error('Not enough stock for product:', product.name);
            this.items[index].updateQuantity(product.stock);
        }
    }

    addNewItem(product, quantity) {
        if (quantity <= product.stock) {
            this.items.push(new CartItem(product, quantity));
        } else {
            console.error('Not enough stock for product:', product.name);
        }
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