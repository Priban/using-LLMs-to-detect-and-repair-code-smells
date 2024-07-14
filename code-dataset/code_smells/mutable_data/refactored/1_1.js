class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  updateStock(quantity) {
    this.stock -= quantity;
  }

  updatePrice(newPrice) {
    this.price = newPrice;
  }
}

class ProductCatalog {
  constructor() {
    this.products = {};
  }

  addProduct(product) {
    this.products[product.id] = product;
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

  addToCart(user, product, quantity) {
    if (product && product.stock >= quantity) {
      this.userCarts[user].push({ product, quantity });
      product.updateStock(quantity);
    }
  }

  removeFromCart(user, productId) {
    for (let i = 0; i < this.userCarts[user].length; i++) {
      if (this.userCarts[user][i].product.id === productId) {
        const quantity = this.userCarts[user][i].quantity;
        this.userCarts[user][i].product.updateStock(-quantity);
        this.userCarts[user].splice(i, 1);
        break;
      }
    }
  }

  getUserCart(user) {
    return this.userCarts[user];
  }

  clearCart(user) {
    this.userCarts[user] = [];
  }
}

class Order {
  constructor() {
    this.orders = [];
  }

  placeOrder(user, userCart) {
    const cartItems = userCart.getUserCart(user);
    if (cartItems) {
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.product.price * item.quantity;
      });
      this.orders.push({ user, items: cartItems, totalPrice });
      userCart.clearCart(user);
    }
  }
}

class User {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }

  updateAddress(newAddress) {
    this.address = newAddress;
  }
}

class UserDirectory {
  constructor() {
    this.users = {
      user1: new User('user1', 'Alice', '123 Main St'),
      user2: new User('user2', 'Bob', '456 Maple Ave'),
    };
  }

  getUser(userId) {
    return this.users[userId];
  }

  updateUserAddress(userId, newAddress) {
    const user = this.getUser(userId);
    if (user) {
      user.updateAddress(newAddress);
    }
  }
}

class API {
  constructor() {
    this.productCatalog = new ProductCatalog();
    this.userCart = new UserCart();
    this.orderClass = new Order();
    this.userDirectory = new UserDirectory();
  }

  addProduct(productId, name, price, stock) {
    const product = new Product(productId, name, price, stock);
    this.productCatalog.addProduct(product);
  }

  getProductInfo(productId) {
    const product = this.productCatalog.getProduct(productId);
    if (product) {
      return `Product Name: ${product.name}, Price: ${product.price}`;
    }
    return "Product not found";
  }

  orderProduct(user, productId, quantity) {
    const product = this.productCatalog.getProduct(productId);
    if (product && product.stock >= quantity) {
      this.userCart.addToCart(user, product, quantity);
      this.orderClass.placeOrder(user, this.userCart);
      return `Ordered ${quantity} of ${product.name}`;
    }
    return "Insufficient stock or product not found";
  }

  updateProductPrice(productId, newPrice) {
    const product = this.productCatalog.getProduct(productId);
    if (product) {
      product.updatePrice(newPrice);
      return "Product price updated";
    }
    return "Product not found";
  }

  updateUserAddress(user, newAddress) {
    const userObj = this.userDirectory.getUser(user);
    if (userObj) {
      this.userDirectory.updateUserAddress(user, newAddress);
      return "Address updated";
    }
    return "User not found";
  }
}

module.exports = { API };