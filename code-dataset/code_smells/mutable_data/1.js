class Product {
  constructor() {
    this.products = {
      1: { name: "Laptop", price: 1000, stock: 10 },
      2: { name: "Smartphone", price: 500, stock: 5 },
    };
  }

  addProduct(productId, name, price, stock) {
    this.products[productId] = { name, price, stock };
  }

  getProduct(productId) {
    return this.products[productId];
  }
}

class UserCart {
  constructor() {
    this.userCarts = {
      user1: [],
      user2: [],
    };
  }

  addToCart(user, productId, quantity, productClass) {
    const product = productClass.getProduct(productId);
    if (product && product.stock >= quantity) {
      this.userCarts[user].push([productId, quantity]);
      product.stock -= quantity;
    }
  }

  removeFromCart(user, productId, productClass) {
    for (let i = 0; i < this.userCarts[user].length; i++) {
      if (this.userCarts[user][i][0] === productId) {
        const quantity = this.userCarts[user][i][1];
        this.userCarts[user].splice(i, 1);
        productClass.getProduct(productId).stock += quantity;
        break;
      }
    }
  }
}

class Order {
  constructor() {
    this.orders = [];
  }

  placeOrder(user, userCart, productClass) {
    if (userCart.userCarts[user]) {
      let totalPrice = 0;
      userCart.userCarts[user].forEach(item => {
        const product = productClass.getProduct(item[0]);
        totalPrice += product.price * item[1];
      });
      this.orders.push({ user: user, items: userCart.userCarts[user], totalPrice: totalPrice });
      userCart.userCarts[user] = [];
    }
  }
}

class User {
  constructor() {
    this.users = {
      user1: { name: "Alice", address: "123 Main St" },
      user2: { name: "Bob", address: "456 Maple Ave" },
    };
  }

  updateAddress(user, newAddress) {
    if (this.users[user]) {
      this.users[user].address = newAddress;
    }
  }

  getUser(user) {
    return this.users[user];
  }
}

class API {
  constructor() {
    this.productClass = new Product();
    this.userCart = new UserCart();
    this.orderClass = new Order();
    this.userClass = new User();
  }

  addProduct(productId, name, price, stock) {
    this.productClass.addProduct(productId, name, price, stock);
  }

  getProductInfo(productId) {
    const product = this.productClass.getProduct(productId);
    if (product) {
      return `Product Name: ${product.name}, Price: ${product.price}`;
    }
    return "Product not found";
  }

  orderProduct(user, productId, quantity) {
    const product = this.productClass.getProduct(productId);
    if (product && product.stock >= quantity) {
      this.userCart.addToCart(user, productId, quantity, this.productClass);
      this.orderClass.placeOrder(user, this.userCart, this.productClass);
      return `Ordered ${quantity} of ${product.name}`;
    }
    return "Insufficient stock or product not found";
  }

  updateProductPrice(productId, newPrice) {
    const product = this.productClass.getProduct(productId);
    if (product) {
      product.price = newPrice;
      return "Product price updated";
    }
    return "Product not found";
  }

  updateUserAddress(user, newAddress) {
    if (this.userClass.getUser(user)) {
      this.userClass.updateAddress(user, newAddress);
      return "Address updated";
    }
    return "User not found";
  }
}

module.exports = { API };