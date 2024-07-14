class Product {
    constructor(name, price, inventoryCount) {
        this.name = name;
        this.price = new Price(price);
        this.inventoryCount = inventoryCount;
    }

    updateInventory(count) {
        this.inventoryCount += count;
    }

    isAvailable() {
        return this.inventoryCount > 0;
    }
}

class CatalogProduct extends Product {
    constructor(name, price, inventoryCount, weight) {
        super(name, price, inventoryCount);
        this.weight = new Weight(weight);
    }

    shippingCost() {
        const baseCost = 5;
        return this.weight.value * 0.5 + baseCost;
    }
}

class Tool extends Product {
    // Additional methods specific to tools
    maintenanceSchedule() {
        return `Maintenance required every 6 months for ${this.name}.`;
    }

    safetyGuidelines() {
        return `Safety guidelines for ${this.name}:\n1. Wear safety goggles\n2. Keep out of reach of children`;
    }
}

class InventoryService {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    updateProductInventory(productName, count) {
        const product = this.products.find(p => p.name === productName);
        if (product) {
            product.updateInventory(count);
        }
    }

    checkProductAvailability(productName) {
        const product = this.products.find(p => p.name === productName);
        return product ? product.isAvailable() : false;
    }

    getProductShippingCost(productName) {
        const product = this.products.find(p => p.name === productName);
        return product instanceof CatalogProduct ? product.shippingCost() : null;
    }
}

class API {
    constructor() {
        this.inventoryService = new InventoryService();
    }

    createCatalogProduct(name, price, inventoryCount, weight) {
        const product = new CatalogProduct(name, price, inventoryCount, weight);
        this.addProduct(product);
        return product;
    }

    createTool(name, price, inventoryCount) {
        const tool = new Tool(name, price, inventoryCount);
        this.addProduct(tool);
        return tool;
    }

    addProduct(product) {
        this.inventoryService.addProduct(product);
    }

    updateInventory(productName, count) {
        this.inventoryService.updateProductInventory(productName, count);
    }

    checkAvailability(productName) {
        return this.inventoryService.checkProductAvailability(productName);
    }

    getShippingCost(productName) {
        return this.inventoryService.getProductShippingCost(productName);
    }
}

class Price {
    constructor(value) {
        this.value = value;
    }
}

class Weight {
    constructor(value) {
        this.value = value;
    }
}

module.exports = { API };