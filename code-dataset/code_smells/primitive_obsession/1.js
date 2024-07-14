class Product {
  constructor(id, name, price, contactPhone, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.contactPhone = contactPhone;
    this.quantity = quantity;
  }
}

class InventoryService {
  constructor() {
    this.inventory = [];
  }

  addProduct(id, name, price, contactPhone, quantity) {
    const product = new Product(id, name, price, contactPhone, quantity);
    this.inventory.push(product);
  }

  removeProduct(id) {
    const index = this.inventory.findIndex(product => product.id === id);
    if (index !== -1) {
      this.inventory.splice(index, 1);
    }
  }

  getCurrency(id) {
    const product = this.inventory.find(product => product.id === id);
    if (product) {
      // get the currency from price string
      return product.price.split(" ")[1];
    } else {
      return null;
    }
  }

  getProductDetails(id) {
    const product = this.inventory.find(product => product.id === id);
    if (product) {
      return `Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`;
    } else {
      return "Product not found";
    }
  }
}

class API {
  constructor() {
    this.inventoryService = new InventoryService();
  }

  addProduct(id, name, price, contactPhone, quantity) {
    this.inventoryService.addProduct(id, name, price, contactPhone, quantity);
  }

  removeProduct(id) {
    this.inventoryService.removeProduct(id);
  }

  getCurrency(id) {
    return this.inventoryService.getCurrency(id);
  }

  getProductDetails(id) {
    return this.inventoryService.getProductDetails(id);
  }
}

module.exports = { API };