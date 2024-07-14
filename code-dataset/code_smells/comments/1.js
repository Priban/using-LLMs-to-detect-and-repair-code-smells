class ShoppingCart {
  constructor() {
    this.items = [];
    this.logs = []; // Objects in this should be of the form { message: string, timestamp: Date }
  }

  addItem(item) {
    // Check if item already exists in cart
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        index = i;
        break;
      }
    }

    // If item exists, increase quantity
    if (index > -1) {
      this.items[index].quantity += item.quantity;
    } else {
      // If item does not exist, add it to cart
      this.items.push(item);
    }

    // Update position of each item in cart
    for (let i = 1; i < this.items.length; i++) {
      const previousItem = this.items[i - 1];
      this.items[i].position = previousItem.position + previousItem.quantity;
    }

    this.logs.push({ message: `Added ${item.quantity} ${item.name}(s) to cart`, timestamp: new Date() });
  }
}

class API {
  constructor() {
    this.shoppingCart = new ShoppingCart();
  }

  addItemToCart(item) {
    this.shoppingCart.addItem(item);
  }

  getItems() {
    return this.shoppingCart.items;
  }

  getLogs() {
    return this.shoppingCart.logs;
  }

}

module.exports = { API };