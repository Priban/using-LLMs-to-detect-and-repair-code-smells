class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity) {
    const cartItemIndex = this.items.findIndex(item => item.product.id === product.id);
    if (cartItemIndex > -1) {
      this.items[cartItemIndex].quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }
  }

  removeProduct(productId) {
    const cartItemIndex = this.items.findIndex(item => item.product.id === productId);
    if (cartItemIndex > -1) {
      this.items.splice(cartItemIndex, 1);
    }
  }

  updateProductQuantity(productId, quantity) {
    const cartItemIndex = this.items.findIndex(item => item.product.id === productId);
    if (cartItemIndex > -1) {
      this.items[cartItemIndex].quantity = quantity;
    }
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clear() {
    this.items = [];
  }
}

class API {
  constructor() {
    this.products = [
      new Product(1, 'Laptop', 1000),
      new Product(2, 'Smartphone', 500),
      new Product(3, 'Tablet', 750),
    ];
    this.cart = new Cart();
  }

  addProductToCart(productId, quantity) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      this.cart.addProduct(product, quantity);
    }
  }

  removeProductFromCart(productId) {
    this.cart.removeProduct(productId);
  }

  clearCart() {
    this.cart.clear();
  }

  updateProductQuantity(productId, quantity) {
    this.cart.updateProductQuantity(productId, quantity);
  }

  calculateTotal() {
    return this.cart.calculateTotal();
  }

  checkout() {
    if (this.cart.items.length === 0) {
      console.log('Your cart is empty.');
      return;
    }

    const totalAmount = this.calculateTotal();
    console.log(`The total amount is $${totalAmount}.`);

    this.clearCart();
  }
}

module.exports = { API };