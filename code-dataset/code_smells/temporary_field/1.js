class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartTotal = 0;
        this.blackFridayDiscount = null;
    }

    addItem(item) {
        this.items.push(item);
        this.updateCartTotal();
    }

    removeItem(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1);
            this.updateCartTotal();
        }
    }

    updateCartTotal() {
        this.cartTotal = this.items.reduce((total, currentItem) => {
            return total + currentItem.price;
        }, 0);

        this.applyBlackFridayDiscount();
    }

    applyBlackFridayDiscount() {
        if (this.isBlackFriday()) {
            this.blackFridayDiscount = this.cartTotal * 0.1;
            this.cartTotal -= this.blackFridayDiscount;
        }
    }

    isBlackFriday() {
        const today = new Date();
        return today.getMonth() === 10 && today.getDate() === 26;
    }

    checkout() {
        if (this.items.length === 0) {
            console.error('Cannot checkout an empty cart.');
            return false;
        }

        console.log(`Processing payment of $${this.cartTotal.toFixed(2)}`);
        this.items = [];
        this.cartTotal = 0;
        this.blackFridayDiscount = 0;
        return true;
    }
}

class API {
    constructor() {
        this.shoppingCart = new ShoppingCart();
    }

    addItemToCart(item) {
        this.shoppingCart.addItem(item);
    }

    removeItemFromCart(itemId) {
        this.shoppingCart.removeItem(itemId);
    }

    checkoutCart() {
        return this.shoppingCart.checkout();
    }

    getCartTotal() {
        return this.shoppingCart.cartTotal;
    }

}

module.exports = { API };