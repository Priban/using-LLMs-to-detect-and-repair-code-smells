class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    updatePrice(newPrice) {
        this.price = newPrice;
        this.logAction('Price updated');
    }

    logAction(action) {
        console.log(`${this.name}: ${action}`);
    }
}

class Order {
    constructor(orderId, product) {
        this.orderId = orderId;
        this.product = product;
    }

    addProduct(product) {
        this.product = product;
        this.logAction('Product added');
    }

    logAction(action) {
        console.log(`Order ${this.orderId}: ${action}`);
    }
}

class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    updateEmail(newEmail) {
        this.email = newEmail;
        this.logAction('Email updated');
    }

    logAction(action) {
        console.log(`${this.name}: ${action}`);
    }
}

class Inventory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        this.logAction('Product added to inventory');
    }

    logAction(action) {
        console.log(`Inventory: ${action}`);
    }
}

class API {
    constructor() {
        this.inventory = new Inventory();
        this.orders = [];
        this.customers = [];
    }

    addProductToInventory(name, price) {
        const product = new Product(name, price);
        this.inventory.addProduct(product);
        return product;
    }

    createOrder(orderId, productName, productPrice) {
        const product = new Product(productName, productPrice);
        const order = new Order(orderId, product);
        this.orders.push(order);
        return order;
    }

    addCustomer(name, email) {
        const customer = new Customer(name, email);
        this.customers.push(customer);
        return customer;
    }

    updateCustomerEmail(name, newEmail) {
        const customer = this.customers.find(c => c.name === name);
        if (customer) {
            customer.updateEmail(newEmail);
            return true;
        }
        return false;
    }

    updateProductPrice(productName, newPrice) {
        const product = this.inventory.products.find(p => p.name === productName);
        if (product) {
            product.updatePrice(newPrice);
            return true;
        }
        return false;
    }
}

module.exports = { API };