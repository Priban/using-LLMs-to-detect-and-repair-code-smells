class CartItem {
    constructor(name, price, quantity, category) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.discount = 0; // Added discount property
    }

    getTotalPrice() {
        return this.price * this.quantity - this.discount;
    }

    applyDiscount() {
        const discountRates = {
            'electronics': 0.10,
            'books': 0.15,
            'clothing': 0.05,
            'default': 0
        };
        const discountRate = discountRates[this.category] || discountRates['default'];
        this.discount = this.price * this.quantity * discountRate;
    }

    getShippingCost() {
        const shippingCosts = {
            'electronics': 10,
            'books': 5,
            'clothing': 3,
            'default': 8
        };
        return shippingCosts[this.category] || shippingCosts['default'];
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total += item.getTotalPrice(), 0);
    }

    applyDiscounts() {
        this.items.forEach(item => item.applyDiscount());
    }

    calculateShipping() {
        return this.items.reduce((total, item) => total += item.getShippingCost(), 0);
    }
}

class Order {
    constructor(cart) {
        this.cart = cart;
    }

    checkout() {
        this.cart.applyDiscounts();
        const totalPrice = this.cart.getTotalPrice();
        const shippingCost = this.cart.calculateShipping();
        const grandTotal = totalPrice + shippingCost;

        console.log(`Total Price: $${totalPrice.toFixed(2)}`);
        console.log(`Shipping Cost: $${shippingCost.toFixed(2)}`);
        console.log(`Grand Total: $${grandTotal.toFixed(2)}`);
        return { totalPrice, shippingCost, grandTotal };
    }
}

class API {
    constructor() {
        this.cart = new ShoppingCart();
    }

    addItemToCart(name, price, quantity, category) {
        const item = new CartItem(name, price, quantity, category);
        this.cart.addItem(item);
    }

    checkout() {
        const order = new Order(this.cart);
        return order.checkout();
    }
}

module.exports = { API };