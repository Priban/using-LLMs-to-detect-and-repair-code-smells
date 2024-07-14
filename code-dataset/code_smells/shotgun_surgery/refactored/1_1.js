class Logger {
    static logAction(context, action) {
        console.log(`${context}: ${action}`);
    }
}

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    updatePrice(newPrice) {
        this.price = newPrice;
        Logger.logAction(this.name, 'Price updated');
    }
}

class Order {
    constructor(orderId, product) {
        this.orderId = orderId;
        this.product = product;
    }

    addProduct(product) {
        this.product = product;
        Logger.logAction(`Order ${this.orderId}`, 'Product added');
    }
}

class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    updateEmail(newEmail) {
        this.email = newEmail;
        Logger.logAction(this.name, 'Email updated');
    }
}

class Inventory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        Logger.logAction('Inventory', 'Product added to inventory');
    }
}

class API {
    constructor() {
        this.initializeInventory();
        this.initializeOrders();
        this.initializeCustomers();
    }

    initializeInventory() {
        this.inventory = new Inventory();
    }

    initializeOrders() {
        this.orders = [];
    }

    initializeCustomers() {
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