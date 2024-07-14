class CartModule {
  constructor() {
    this.carts = {};
  }

  addToCart(productID, quantity, customerName, customerEmail, customerAddress) {
    const cart = this.getCartForCustomer(customerName, customerEmail, customerAddress);
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

  removeFromCart(productID, quantity, customerName, customerEmail, customerAddress) {
    const cart = this.getCartForCustomer(customerName, customerEmail, customerAddress);
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

  getCartForCustomer(customerName, customerEmail, customerAddress) {
    const customerKey = `${customerName}_${customerEmail}_${customerAddress}`;
    if (!this.carts[customerKey]) {
      this.carts[customerKey] = { customerName, customerEmail, customerAddress, items: [] };
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
    const { name, email, address } = customerDetails;
    this.cartModule.addToCart(productID, quantity, name, email, address);
  }

  removeFromCart(productID, quantity, customerDetails) {
    const { name, email, address } = customerDetails;
    this.cartModule.removeFromCart(productID, quantity, name, email, address);
  }

  getCart(customerDetails) {
    const { name, email, address } = customerDetails;
    return this.cartModule.getCartForCustomer(name, email, address);
  }
}

module.exports = { API };