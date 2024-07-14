class Product {
  constructor({ id, name, price, description, stock, weight, category, image, rating, ratingCount, reviewCount, discount, discountType, discountValue, discountStart, discountEnd, discountText }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.weight = weight;
    this.category = category;
    this.image = image;
    this.rating = rating;
    this.ratingCount = ratingCount;
    this.reviewCount = reviewCount;
    this.discount = discount;
    this.discountType = discountType;
    this.discountValue = discountValue;
    this.discountStart = discountStart;
    this.discountEnd = discountEnd;
    this.discountText = discountText;
  }

  getDiscountedPrice() {
    if (this.discountType === 'percentage') {
      return this.price - (this.price * this.discountValue / 100);
    } else if (this.discountType === 'fixed') {
      return this.price - this.discountValue;
    } else {
      return this.price;
    }
  }

  getProductDescription() {
    return `${this.name} - ${this.description} - ${this.price}`;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addProduct(productDetails) {
    this.items.push(new Product(productDetails));
  }

  removeProduct(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItems() {
    return this.items;
  }
}

class Inventory {
  constructor() {
    this.products = [];
  }

  addProduct(productDetails) {
    this.products.push(new Product(productDetails));
  }

  removeProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  getProducts() {
    return this.products;
  }
}

class API {
  constructor() {
    this.cart = new ShoppingCart();
    this.inventory = new Inventory();
  }

  addProductToCart(productDetails) {
    this.cart.addProduct(productDetails);
  }

  removeProductFromCart(productId) {
    this.cart.removeProduct(productId);
  }

  getTotal() {
    return this.cart.calculateTotal();
  }

  getCartItems() {
    return this.cart.getItems();
  }

  addProductToInventory(productDetails) {
    this.inventory.addProduct(productDetails);
  }

  removeProductFromInventory(productId) {
    this.inventory.removeProduct(productId);
  }

  getInventoryProducts() {
    return this.inventory.getProducts();
  }
}

module.exports = { API };