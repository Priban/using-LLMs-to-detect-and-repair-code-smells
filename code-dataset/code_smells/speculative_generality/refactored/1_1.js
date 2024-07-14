class Product {
    constructor({ id, name, price, description, category }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
    }
}

class ProductDisplay {
    static displayBasicInfo(product) {
        console.log(`${product.name} - $${product.price}`);
    }

    static displayDetailedInfo(product) {
        console.log(`${product.name} - $${product.price}\nDescription: ${product.description}\nCategory: ${product.category}`);
    }
}

class Manager {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }
}

class InventoryManager extends Manager {
    constructor() {
        super();
    }

    listProducts() {
        this.items.forEach(product => ProductDisplay.displayBasicInfo(product));
    }
}

class API {
    constructor() {
        this.inventoryManager = new InventoryManager();
    }

    addProduct(id, name, price, description, category) {
        const product = new Product({ id, name, price, description, category });
        this.inventoryManager.addItem(product);
    }

    removeProduct(id) {
        this.inventoryManager.removeItem(id);
    }

    listAllProducts() {
        return this.inventoryManager.items.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
        }));
    }
}

module.exports = { API };