class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
    }

    getDisplayName() {
        return `${this.name} ${this.price}`;
    }
}

class Order {
    constructor(products = []) {
        this.products = products;
        this.status = 'pending';
        this.orderDate = new Date();
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        const index = this.products.findIndex(product => product.getId() === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }

    getTotalPrice() {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }

    getTotalQuantity() {
        return this.products.length;
    }

    getOrderSummary() {
        return {
            totalQuantity: this.getTotalQuantity(),
            totalPrice: this.getTotalPrice(),
            status: this.status,
            orderDate: this.orderDate
        };
    }

    listProductNames() {
        return this.products.map(product => product.getDisplayName());
    }

    applyDiscount(discountPercentage) {
        const total = this.getTotalPrice();
        const discountAmount = total * (discountPercentage / 100);
        return total - discountAmount;
    }
}

class API {
    constructor() {
        this.order = new Order();
    }

    addProductToOrder(id, name, price) {
        const product = new Product(id, name, price);
        this.order.addProduct(product);
    }

    removeProductFromOrder(productId) {
        this.order.removeProduct(productId);
    }

    getOrderSummary() {
        return this.order.getOrderSummary();
    }

    applyDiscountToOrder(discountPercentage) {
        return this.order.applyDiscount(discountPercentage);
    }

    listProductNames() {
        return this.order.listProductNames();
    }
}

module.exports = { API };