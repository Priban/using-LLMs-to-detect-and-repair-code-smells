// Module 1: Product Management
class Product {
  constructor(productId, name, price) {
      this.productId = productId;
      this.name = name;
      this.price = price;
      this.inventory = null;
  }

  setInventory(inventory) {
      this.inventory = inventory;
  }

  toString() {
      return `Product(${this.productId}, ${this.name}, ${this.price}, Inventory: ${this.inventory.quantity})`;
  }
}

// Module 2: Inventory Management
class Inventory {
  constructor(productId, quantity) {
      this.productId = productId;
      this.quantity = quantity;
      this.product = null;
  }

  setProduct(product) {
      this.product = product;
  }

  toString() {
      return `Inventory(Product ID: ${this.productId}, Quantity: ${this.quantity}, Product: ${this.product.name})`;
  }
}

// Module 3: Order Management
class Order {
  constructor(orderId, product, quantity) {
      this.orderId = orderId;
      this.product = product;
      this.quantity = quantity;
      this.customer = null;
  }

  setCustomer(customer) {
      this.customer = customer;
  }

  toString() {
      return `Order(${this.orderId}, Product: ${this.product.name}, Quantity: ${this.quantity}, Customer: ${this.customer.name})`;
  }
}

// Module 4: Customer Management
class Customer {
  constructor(customerId, name, email) {
      this.customerId = customerId;
      this.name = name;
      this.email = email;
      this.orders = [];
  }

  addOrder(order) {
      this.orders.push(order);
      order.setCustomer(this);
  }

  toString() {
      return `Customer(${this.customerId}, ${this.name}, ${this.email}, Orders: ${this.orders.length})`;
  }
}

// Module 5: Payment Processing
class Payment {
  constructor(paymentId, order, amount) {
      this.paymentId = paymentId;
      this.order = order;
      this.amount = amount;
      this.paymentStatus = 'Pending';
  }

  processPayment() {
      if (this.order.product.inventory.quantity >= this.order.quantity) {
          this.order.product.inventory.quantity -= this.order.quantity;
          this.paymentStatus = 'Completed';
      } else {
          this.paymentStatus = 'Failed';
      }
  }

  toString() {
      return `Payment(${this.paymentId}, Order: ${this.order.orderId}, Amount: ${this.amount}, Status: ${this.paymentStatus})`;
  }
}

// API Class
class API {
  constructor() {
      this.products = [];
      this.customers = [];
      this.orders = [];
      this.payments = [];
  }

  addProduct(productId, name, price, stock) {
      const product = new Product(productId, name, price);
      const inventory = new Inventory(productId, stock);
      product.setInventory(inventory);
      inventory.setProduct(product);
      this.products.push(product);
  }

  getProductInfo(productId) {
      const product = this.products.find(p => p.productId === productId);
      if (product) {
          return `Product Name: ${product.name}, Price: ${product.price}, Stock: ${product.inventory.quantity}`;
      }
      return "Product not found";
  }

  orderProduct(productId, customerId, quantity) {
      const product = this.products.find(p => p.productId === productId);
      const customer = this.customers.find(c => c.customerId === customerId);
      if (product && customer) {
          if (product.inventory.quantity >= quantity) {
              const order = new Order(this.orders.length + 1, product, quantity);
              customer.addOrder(order);
              this.orders.push(order);
              return `Ordered ${quantity} of ${product.name} for ${customer.name}`;
          } else {
              return "Insufficient stock";
          }
      }
      return "Product or customer not found";
  }

  updateProductPrice(productId, newPrice) {
      const product = this.products.find(p => p.productId === productId);
      if (product) {
          product.price = newPrice;
          return "Product price updated";
      }
      return "Product not found";
  }

  addCustomer(customerId, name, email) {
      const customer = new Customer(customerId, name, email);
      this.customers.push(customer);
  }

  processPayment(orderId, amount) {
      const order = this.orders.find(o => o.orderId === orderId);
      if (order) {
          const payment = new Payment(this.payments.length + 1, order, amount);
          payment.processPayment();
          this.payments.push(payment);
          return `Payment status: ${payment.paymentStatus}`;
      }
      return "Order not found";
  }

  getCustomerInfo(customerId) {
      const customer = this.customers.find(c => c.customerId === customerId);
      if (customer) {
          return `Customer Name: ${customer.name}, Email: ${customer.email}, Orders: ${customer.orders.length}`;
      }
      return "Customer not found";
  }
}

module.exports = { API };