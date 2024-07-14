class ProductDetails {
    constructor(name, price, inventoryCount) {
        this.name = name;
        this.price = price;
        this.inventoryCount = inventoryCount;
    }
}

class CatalogProduct {
    constructor(details, weight) {
        this.details = details;
        this.weight = weight;
    }

    updateInventory(count) {
        this.details.inventoryCount += count;
    }

    isAvailable() {
        return this.details.inventoryCount > 0;
    }

    shippingCost() {
        const baseCost = 5;
        return this.weight * 0.5 + baseCost;
    }
}

class Tool {
    constructor(details) {
        this.details = details;
    }

    updateInventory(count) {
        this.details.inventoryCount += count;
    }

    isAvailable() {
        return this.details.inventoryCount > 0;
    }

    maintenanceSchedule() {
        return `Maintenance required every 6 months for ${this.details.name}.`;
    }

    safetyGuidelines() {
        return `Safety guidelines for ${this.details.name}:\n1. Wear safety goggles\n2. Keep out of reach of children`;
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
        const product = this.products.find(p => p.details.name === productName);
        if (product) {
            product.updateInventory(count);
        }
    }

    checkProductAvailability(productName) {
        const product = this.products.find(p => p.details.name === productName);
        return product ? product.isAvailable() : false;
    }

    getProductShippingCost(productName) {
        const product = this.products.find(p => p.details.name === productName);
        return product && product instanceof CatalogProduct ? product.shippingCost() : null;
    }
}

class API {
    constructor() {
        this.inventoryService = new InventoryService();
    }

    createCatalogProduct(name, price, inventoryCount, weight) {
        const details = new ProductDetails(name, price, inventoryCount);
        const product = new CatalogProduct(details, weight);
        this.addProduct(product);
        return product;
    }

    createTool(name, price, inventoryCount) {
        const details = new ProductDetails(name, price, inventoryCount);
        const tool = new Tool(details);
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

module.exports = { API };