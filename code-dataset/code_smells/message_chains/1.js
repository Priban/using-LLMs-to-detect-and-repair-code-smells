class Product {
    constructor(id, name, price, discount) {
        this.productInfo = {
            details: {
                id: id,
                name: name,
                pricing: {
                    price: price,
                    discount: discount
                }
            }
        };
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    get totalPrice() {
        const price = this.product.productInfo.details.pricing.price;
        const discount = this.product.productInfo.details.pricing.discount;
        return (price - price * discount) * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addProduct(product, quantity) {
        const existingItem = this.items.find(item => item.product.productInfo.details.id === product.productInfo.details.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new CartItem(product, quantity));
        }
    }

    removeProduct(productId) {
        const index = this.items.findIndex(item => item.product.productInfo.details.id === productId);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.productInfo.details.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    get totalCost() {
        return this.items.reduce((total, item) => total + item.totalPrice, 0);
    }
}

class API {
    constructor() {
        this.shoppingCart = new ShoppingCart();
    }

    addProductToCart(id, name, price, discount, quantity) {
        const product = new Product(id, name, price, discount);
        this.shoppingCart.addProduct(product, quantity);
    }

    removeProductFromCart(productId) {
        this.shoppingCart.removeProduct(productId);
    }

    updateProductQuantity(productId, quantity) {
        this.shoppingCart.updateQuantity(productId, quantity);
    }

    getTotalCost() {
        return this.shoppingCart.totalCost;
    }
}

module.exports = { API };