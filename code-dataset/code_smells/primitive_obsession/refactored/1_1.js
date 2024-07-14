class Price {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  static fromString(priceString) {
    const [amount, currency] = priceString.split(" ");
    return new Price(parseFloat(amount), currency);
  }

  toString() {
    return `${this.amount} ${this.currency}`;
  }
}

class Product {
  constructor({ id, name, price, contactPhone, quantity }) {
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

  addProduct(productDetails) {
    const product = new Product(productDetails);
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
      return product.price.currency;
    } else {
      return null;
    }
  }

  getProductDetails(id) {
    const product = this.inventory.find(product => product.id === id);
    if (product) {
      return `Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price.toString()}, Quantity: ${product.quantity}`;
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
    const productDetails = {
      id,
      name,
      price: Price.fromString(price),
      contactPhone,
      quantity
    };
    this.inventoryService.addProduct(productDetails);
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