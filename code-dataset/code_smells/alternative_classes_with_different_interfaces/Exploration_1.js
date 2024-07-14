class Payment {
  constructor(customer, amount) {
      this.customer = customer;
      this.amount = amount;
  }

  processPayment() {
      throw new Error('processPayment() must be implemented by subclasses');
  }

  validatePayment() {
      throw new Error('validatePayment() must be implemented by subclasses');
  }
}

class CreditCardPayment extends Payment {
  validatePayment() {
      // Simulating card detail validation
      return true;
  }

  processPayment() {
      if (this.validatePayment()) {
          return { status: 'success', transactionId: `CC${Math.random().toString(36).substr(2, 9)}`, amount: this.amount, customer: this.customer };
      }
      return { status: 'failure' };
  }
}

class PayPalPayment extends Payment {
  validatePayment() {
      // Simulating PayPal account validation
      return this.customer.includes('@');
  }

  processPayment() {
      if (this.validatePayment()) {
          return { status: 'success', transactionId: `PP${Math.random().toString(36).substr(2, 9)}`, amount: this.amount, customer: this.customer };
      }
      return { status: 'failure' };
  }
}

class CheckoutService {
  constructor() {
      this.checkouts = [];
  }

  addCheckout(paymentType, paymentDetails) {
      let paymentProcessor;
      if (paymentType === 'creditCard') {
          paymentProcessor = new CreditCardPayment(paymentDetails.customer, paymentDetails.amount);
      } else if (paymentType === 'paypal') {
          paymentProcessor = new PayPalPayment(paymentDetails.customer, paymentDetails.amount);
      } else {
          throw new Error('Unsupported payment type');
      }
      this.checkouts.push(paymentProcessor);
  }

  processCheckout(paymentProcessor) {
      const paymentResult = paymentProcessor.processPayment();
      if (paymentResult.status === 'success') {
          console.log(`Payment processed successfully: Transaction ID ${paymentResult.transactionId}`);
      } else {
          console.error('Payment processing failed');
      }
      return paymentResult.status === 'success';
  }

  processAllCheckouts() {
      let allSuccess = true;
      for (const paymentProcessor of this.checkouts) {
          const success = this.processCheckout(paymentProcessor);
          if (!success) {
              allSuccess = false;
          }
      }
      return allSuccess;
  }
}

class API {
  constructor() {
      this.checkoutService = new CheckoutService();
  }

  addPayment(paymentType, paymentDetails) {
      this.checkoutService.addCheckout(paymentType, paymentDetails);
  }

  processPayments() {
      return this.checkoutService.processAllCheckouts();
  }
}

module.exports = { API };