class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartTotal = 0;
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

        this.applyDiscounts();
    }

    applyDiscounts() {
        const discount = Discount.calculateBlackFridayDiscount(this.cartTotal);
        this.cartTotal -= discount;
    }

    checkout() {
        if (this.items.length === 0) {
            console.error('Cannot checkout an empty cart.');
            return false;
        }

        console.log(`Processing payment of $${this.cartTotal.toFixed(2)}`);
        this.items = [];
        this.cartTotal = 0;
        return true;
    }
}

class Discount {
    static calculateBlackFridayDiscount(cartTotal) {
        if (DateUtils.isBlackFriday()) {
            return cartTotal * 0.1;
        }
        return 0;
    }
}

class DateUtils {
    static isBlackFriday() {
        const today = new Date();
        return today.getMonth() === 10 && today.getDate() === 26;
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