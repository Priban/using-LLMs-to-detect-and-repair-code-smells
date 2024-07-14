class TaxRate {
    constructor(rate) {
        this.rate = rate;
    }

    apply(price) {
        return price * (1 + this.rate);
    }
}

class ShoppingCart {
    constructor(taxRate = 0.2) {
        this.items = [];
        this.taxRate = new TaxRate(taxRate);
    }

    addItem(name, price) {
        this.items.push({ name, price });
    }

    calculateTotalPrice() {
        return this.items.reduce((total, item) => {
            return total + this.taxRate.apply(item.price);
        }, 0);
    }

    printTotalPrice() {
        const totalPrice = this.calculateTotalPrice();
        console.log(`Total price with tax: $${totalPrice.toFixed(2)}`);
    }
}

class API {
    constructor() {
        this.shoppingCart = new ShoppingCart();
    }

    addItemToCart(name, price) {
        this.shoppingCart.addItem(name, price);
    }

    getTotalPrice() {
        return this.shoppingCart.calculateTotalPrice();
    }

    printCartTotal() {
        this.shoppingCart.printTotalPrice();
    }
}

module.exports = { API };