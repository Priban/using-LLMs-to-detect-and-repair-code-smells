class CreditCardPayment {
    constructor(customer, amount) {
        this.customer = customer;
        this.amount = amount;
    }

    processPayment() {
        return { status: 'success', transactionId: 'CC12345XYZ', amount: this.amount, customer: this.customer };
    }

    validateCardDetails() {
        return true;
    }
}

class PayPalPayment {
    constructor(customer, amount) {
        this.customer = customer;
        this.amount = amount;
    }

    executePayment() {
        return { status: 'success', transactionId: 'PP67890ABC', amount: this.amount, customer: this.customer };
    }

    verifyAccount() {
        return this.customer.includes('@');
    }
}

class CheckoutService {
    constructor() {
        this.checkouts = [];
    }

    addCheckout(paymentType, paymentDetails) {
        this.checkouts.push({ paymentType, paymentDetails });
    }

    processCheckout(paymentType, paymentDetails) {
        let paymentProcessor;
        let paymentResult;

        if (paymentType === 'creditCard') {
            paymentProcessor = new CreditCardPayment(paymentDetails.customer, paymentDetails.amount);
            if (paymentProcessor.validateCardDetails()) {
                paymentResult = paymentProcessor.processPayment();
            }
        } else if (paymentType === 'paypal') {
            paymentProcessor = new PayPalPayment(paymentDetails.customer, paymentDetails.amount);
            if (paymentProcessor.verifyAccount()) {
                paymentResult = paymentProcessor.executePayment();
            }
        } else {
            console.error('Unsupported payment type');
            throw new Error('Unsupported payment type');
        }

        if (paymentResult && paymentResult.status === 'success') {
            console.log(`Payment processed successfully: Transaction ID ${paymentResult.transactionId}`);
        } else {
            console.error('Payment processing failed');
        }
    }

    processAllCheckouts() {
        try {
            for (const checkout of this.checkouts) {
                this.processCheckout(checkout.paymentType, checkout.paymentDetails);
            }
            return true;
        } catch (error) {
            console.error('An error occurred while processing payments');
            return false;
        }
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