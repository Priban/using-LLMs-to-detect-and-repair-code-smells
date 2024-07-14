class Item {
    constructor(id, name, price, qty = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    updateQuantity(newQty) {
        this.qty = newQty;
    }

    getTotalPrice() {
        return this.price * this.qty;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    findItemById(itemId) {
        return this.items.find(i => i.id === itemId);
    }

    addItem(item) {
        const existingItem = this.findItemById(item.id);
        if (existingItem) {
            existingItem.updateQuantity(existingItem.qty + 1);
        } else {
            this.items.push(new Item(item.id, item.name, item.price));
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(i => i.id !== itemId);
    }

    updateQty(itemId, newQty) {
        const item = this.findItemById(itemId);
        if (item && newQty > 0) {
            item.updateQuantity(newQty);
        } else {
            this.removeItem(itemId);
        }
    }

    calculateTotal() {
        return this.items.reduce((total, i) => total + i.getTotalPrice(), 0);
    }

    checkout() {
        if (this.items.length === 0) {
            console.log("Your cart is empty.");
            return false;
        }
        const total = this.calculateTotal();
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
        return this.cart.calculateTotal();
    }

    checkoutCart() {
        return this.cart.checkout();
    }
}

module.exports = { API };