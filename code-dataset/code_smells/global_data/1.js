let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Smartphone', price: 500 },
  { id: 3, name: 'Tablet', price: 750 },
];

let cart = [];

function addProductToCart(productId, quantity) {
  const product = products.find(product => product.id === productId);
  if (product) {
    const cartItemIndex = cart.findIndex(item => item.product.id === productId);
    if (cartItemIndex > -1) {
      cart[cartItemIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
  }
}

function removeProductFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.product.id === productId);
  if (cartItemIndex > -1) {
    cart.splice(cartItemIndex, 1);
  }
}

function updateProductQuantity(productId, quantity) {
  const cartItemIndex = cart.findIndex(item => item.product.id === productId);
  if (cartItemIndex > -1) {
    cart[cartItemIndex].quantity = quantity;
  }
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function checkout() {
  if (cart.length === 0) {
    console.log('Your cart is empty.');
    return;
  }
  
  const totalAmount = calculateTotal();
  console.log(`The total amount is $${totalAmount}.`);
  
  cart = [];
}

class API {
  addProductToCart(productId, quantity) {
    addProductToCart(productId, quantity);
  }

  removeProductFromCart(productId) {
    removeProductFromCart(productId);
  }

  clearCart() {
    cart = [];
  }

  updateProductQuantity(productId, quantity) {
    updateProductQuantity(productId, quantity);
  }

  calculateTotal() {
    return calculateTotal();
  }

  checkout() {
    checkout();
  }
}

module.exports = { API };