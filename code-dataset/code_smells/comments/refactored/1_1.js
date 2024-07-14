class ShoppingCart {
  constructor() {
    this.items = [];
    this.logs = []; // Objects in this should be of the form { message: string, timestamp: Date }
  }

  addItem(item) {
    const index = this.findItemIndex(item.id);

    if (index > -1) {
      this.updateItemQuantity(index, item.quantity);
    } else {
      this.addItemToCart(item);
    }

    this.updateItemPositions();
    this.logItemAddition(item);
  }

  findItemIndex(itemId) {
    return this.items.findIndex(item => item.id === itemId);
  }

  updateItemQuantity(index, quantity) {
    this.items[index].quantity += quantity;
  }

  addItemToCart(item) {
    this.items.push(item);
  }

  updateItemPositions() {
    for (let i = 1; i < this.items.length; i++) {
      const previousItem = this.items[i - 1];
      this.items[i].position = previousItem.position + previousItem.quantity;
    }
  }

  logItemAddition(item) {
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