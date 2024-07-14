class PriceCalculator {
    calculateTotalPriceWithTax(price, taxRate) {
        return price * (1 + taxRate);
    }
}

class ShoppingCart {
    constructor(taxRate = 0.2) {
        this.items = [];
        this.taxRate = taxRate;
        this.priceCalculator = new PriceCalculator();
    }

    addItem(name, price) {
        this.items.push({ name, price });
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + this.priceCalculator.calculateTotalPriceWithTax(item.price, this.taxRate);
        }, 0);
    }

    getTotalPriceWithTax() {
        return this.calculateTotal();
    }

    printTotalPrice() {
        const totalPrice = this.getTotalPriceWithTax();
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
        return this.shoppingCart.getTotalPriceWithTax();
    }

    printCartTotal() {
        this.shoppingCart.printTotalPrice();
    }
}

module.exports = { API };