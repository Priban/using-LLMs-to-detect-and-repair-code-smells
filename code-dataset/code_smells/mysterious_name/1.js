class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            item.qty = 1;
            this.items.push(item);
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(i => i.id !== itemId);
    }

    updateQty(itemId, newQty) {
        const item = this.items.find(i => i.id === itemId);
        if (item && newQty > 0) {
            item.qty = newQty;
        } else {
            this.removeItem(itemId);
        }
    }

    ct() {
        return this.items.reduce((total, i) => total + (i.price * i.qty), 0);
    }

    checkout() {
        if (this.items.length === 0) {
            console.log("Your cart is empty.");
            return false;
        }
        const total = this.ct();
        console.log(`The total amount is ${total}. Proceeding to payment.`);
        return true;
    }
}

class API {
    constructor() {
        this.cart = new ShoppingCart();
    }

    addItemToCart(item) {
        this.cart.addItem(item);
    }

    removeItemFromCart(itemId) {
        this.cart.removeItem(itemId);
    }

    updateItemQuantity(itemId, newQty) {
        this.cart.updateQty(itemId, newQty);
    }

    getTotalAmount() {
        return this.cart.ct();
    }

    checkoutCart() {
        return this.cart.checkout();
    }
}

module.exports = { API };