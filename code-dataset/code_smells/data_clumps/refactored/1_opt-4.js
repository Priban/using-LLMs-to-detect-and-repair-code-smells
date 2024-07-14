class Customer {
  constructor(name, email, address) {
    this.name = name;
    this.email = email;
    this.address = address;
  }

  getKey() {
    return `${this.name}_${this.email}_${this.address}`;
  }
}

class CartModule {
  constructor() {
    this.carts = {};
  }

  addToCart(productID, quantity, customer) {
    const cart = this.getCartForCustomer(customer);
    const product = this.getProductByID(productID);
    if (!product) {
      console.error('Product not found');
      return;
    }
    if (product.stock < quantity) {
      console.error('Not enough stock');
      return;
    }
    cart.items.push({ productID, quantity, price: product.price });
  }

  removeFromCart(productID, quantity, customer) {
    const cart = this.getCartForCustomer(customer);
    const cartItemIndex = cart.items.findIndex(item => item.productID === productID);
    if (cartItemIndex === -1) {
      console.error('Product not in cart');
      return;
    }
    const cartItem = cart.items[cartItemIndex];
    if (cartItem.quantity <= quantity) {
      cart.items.splice(cartItemIndex, 1);
    } else {
      cartItem.quantity -= quantity;
    }
  }

  getCartForCustomer(customer) {
    const customerKey = customer.getKey();
    if (!this.carts[customerKey]) {
      this.carts[customerKey] = { customerName: customer.name, customerEmail: customer.email, customerAddress: customer.address, items: [] };
    }
    return this.carts[customerKey];
  }

  getProductByID(productID) {
    return { id: productID, name: `Product ${productID}`, price: 10, stock: 100 };
  }
}

class API {
  constructor() {
    this.cartModule = new CartModule();
  }

  addToCart(productID, quantity, customerDetails) {
    const customer = new Customer(customerDetails.name, customerDetails.email, customerDetails.address);
    this.cartModule.addToCart(productID, quantity, customer);
  }

  removeFromCart(productID, quantity, customerDetails) {
    const customer = new Customer(customerDetails.name, customerDetails.email, customerDetails.address);
    this.cartModule.removeFromCart(productID, quantity, customer);
  }

  getCart(customerDetails) {
    const customer = new Customer(customerDetails.name, customerDetails.email, customerDetails.address);
    return this.cartModule.getCartForCustomer(customer);
  }
}

module.exports = { API };