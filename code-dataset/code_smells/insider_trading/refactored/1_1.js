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

  updatePrice(newPrice) {
    this.price = newPrice;
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

  reduceQuantity(amount) {
    if (this.quantity >= amount) {
      this.quantity -= amount;
      return true;
    }
    return false;
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
    if (this.order.product.inventory.reduceQuantity(this.order.quantity)) {
      this.paymentStatus = 'Completed';
    } else {
      this.paymentStatus = 'Failed';
    }
  }

  toString() {
    return `Payment(${this.paymentId}, Order: ${this.order.orderId}, Amount: ${this.amount}, Status: ${this.paymentStatus})`;
  }
}

// Product Service
class ProductService {
  constructor() {
    this.products = [];
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

  updateProductPrice(productId, newPrice) {
    const product = this.products.find(p => p.productId === productId);
    if (product) {
      product.updatePrice(newPrice);
      return "Product price updated";
    }
    return "Product not found";
  }
}

// Customer Service
class CustomerService {
  constructor() {
    this.customers = [];
  }

  addCustomer(customerId, name, email) {
    const customer = new Customer(customerId, name, email);
    this.customers.push(customer);
  }

  getCustomerInfo(customerId) {
    const customer = this.customers.find(c => c.customerId === customerId);
    if (customer) {
      return `Customer Name: ${customer.name}, Email: ${customer.email}, Orders: ${customer.orders.length}`;
    }
    return "Customer not found";
  }
}

// Order Service
class OrderService {
  constructor() {
    this.orders = [];
  }

  orderProduct(product, customer, quantity) {
    if (product.inventory.quantity >= quantity) {
      const order = new Order(this.orders.length + 1, product, quantity);
      customer.addOrder(order);
      this.orders.push(order);
      return `Ordered ${quantity} of ${product.name} for ${customer.name}`;
    } else {
      return "Insufficient stock";
    }
  }
}

// Payment Service
class PaymentService {
  constructor() {
    this.payments = [];
  }

  processPayment(order, amount) {
    const payment = new Payment(this.payments.length + 1, order, amount);
    payment.processPayment();
    this.payments.push(payment);
    return `Payment status: ${payment.paymentStatus}`;
  }
}

// API Class
class API {
  constructor() {
    this.productService = new ProductService();
    this.customerService = new CustomerService();
    this.orderService = new OrderService();
    this.paymentService = new PaymentService();
  }

  addProduct(productId, name, price, stock) {
    this.productService.addProduct(productId, name, price, stock);
  }

  getProductInfo(productId) {
    return this.productService.getProductInfo(productId);
  }

  orderProduct(productId, customerId, quantity) {
    const product = this.productService.products.find(p => p.productId === productId);
    const customer = this.customerService.customers.find(c => c.customerId === customerId);
    if (product && customer) {
      return this.orderService.orderProduct(product, customer, quantity);
    }
    return "Product or customer not found";
  }

  updateProductPrice(productId, newPrice) {
    return this.productService.updateProductPrice(productId, newPrice);
  }

  addCustomer(customerId, name, email) {
    this.customerService.addCustomer(customerId, name, email);
  }

  processPayment(orderId, amount) {
    const order = this.orderService.orders.find(o => o.orderId === orderId);
    if (order) {
      return this.paymentService.processPayment(order, amount);
    }
    return "Order not found";
  }

  getCustomerInfo(customerId) {
    return this.customerService.getCustomerInfo(customerId);
  }
}

module.exports = { API };