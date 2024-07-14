class Product {
  constructor(id, name, price, stock) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stock = stock;
  }
}

class User {
  constructor() {
      this.loggedIn = false;
      this.name = '';
      this.email = '';
  }

  login(email, password) {
      if (email === 'user@example.com' && password === 'password123') {
          this.loggedIn = true;
          this.name = 'John Doe';
          this.email = email;
      } else {
          throw new Error('Login failed. Please check your credentials.');
      }
  }

  logout() {
      this.loggedIn = false;
      this.name = '';
      this.email = '';
  }
}

class EShop {
  constructor() {
      this.products = [
          new Product(1, 'Laptop', 1000, 10),
          new Product(2, 'Smartphone', 700, 15),
          new Product(3, 'Tablet', 500, 20),
      ];
      this.cart = [];
      this.user = new User();
  }

  listProducts() {
      return this.products;
  }

  findProduct(productId) {
      return this.products.find(p => p.id === productId);
  }

  findCartItem(productId) {
      return this.cart.find(item => item.productId === productId);
  }

  addToCart(productId, quantity) {
      const product = this.findProduct(productId);
      if (!product || product.stock < quantity) {
          throw new Error('Product is not available.');
      }

      const cartItem = this.findCartItem(productId);
      if (cartItem) {
          cartItem.quantity += quantity;
      } else {
          this.cart.push({ productId, quantity });
      }
      product.stock -= quantity;
  }

  removeFromCart(productId) {
      const cartIndex = this.cart.findIndex(item => item.productId === productId);
      if (cartIndex > -1) {
          const product = this.findProduct(productId);
          product.stock += this.cart[cartIndex].quantity;
          this.cart.splice(cartIndex, 1);
      }
  }

  checkout() {
      if (!this.user.loggedIn) {
          throw new Error('Please log in to proceed to checkout.');
      }
      if (this.cart.length === 0) {
          throw new Error('Your cart is empty.');
      }

      // Simulate checkout process
      this.cart = [];
      return 'Checkout successful.';
  }

  displayCartContents() {
      return this.cart.map(item => {
          const product = this.findProduct(item.productId);
          return { product: product.name, quantity: item.quantity };
      });
  }
}

class API {
  constructor() {
      this.eshop = new EShop();
  }

  listProducts() {
      return this.eshop.listProducts();
  }

  addToCart(productId, quantity) {
      return this.eshop.addToCart(productId, quantity);
  }

  removeFromCart(productId) {
      return this.eshop.removeFromCart(productId);
  }

  checkout() {
      return this.eshop.checkout();
  }

  loginUser(email, password) {
      return this.eshop.user.login(email, password);
  }

  logoutUser() {
      return this.eshop.user.logout();
  }

  displayCartContents() {
      return this.eshop.displayCartContents();
  }
}

module.exports = { API };