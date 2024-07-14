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
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.getTotalPrice();
        });
        return totalPrice;
    }

    applyDiscounts() {
        this.items.forEach(item => {
            let discountRate = 0;
            switch (item.category) {
                case 'electronics':
                    discountRate = 0.10;
                    break;
                case 'books':
                    discountRate = 0.15;
                    break;
                case 'clothing':
                    discountRate = 0.05;
                    break;
                default:
                    discountRate = 0;
            }
            item.discount = item.price * item.quantity * discountRate;
        });
    }

    calculateShipping() {
        let shippingCost = 0;
        this.items.forEach(item => {
            switch (item.category) {
                case 'electronics':
                    shippingCost += 10;
                    break;
                case 'books':
                    shippingCost += 5;
                    break;
                case 'clothing':
                    shippingCost += 3;
                    break;
                default:
                    shippingCost += 8;
            }
        });
        return shippingCost;
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