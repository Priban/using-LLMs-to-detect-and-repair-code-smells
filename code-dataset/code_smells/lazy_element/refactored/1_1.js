class Price {
    constructor(amount) {
        this.amount = amount;
    }

    withTax(taxRate) {
        return new Price(this.amount * (1 + taxRate));
    }

    getAmount() {
        return this.amount;
    }
}

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = new Price(price);
    }

    getPriceWithTax(taxRate) {
        return this.price.withTax(taxRate).getAmount();
    }
}

class ShoppingCart {
    constructor(taxRate = 0.2) {
        this.items = [];
        this.taxRate = taxRate; // 20%
    }

    addItem(name, price) {
        this.items.push(new Item(name, price));
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + item.getPriceWithTax(this.taxRate);
        }, 0);
    }

    printTotal() {
        const totalPrice = this.calculateTotal();
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
        return this.shoppingCart.calculateTotal();
    }

    printCartTotal() {
        this.shoppingCart.printTotal();
    }
}

module.exports = { API };