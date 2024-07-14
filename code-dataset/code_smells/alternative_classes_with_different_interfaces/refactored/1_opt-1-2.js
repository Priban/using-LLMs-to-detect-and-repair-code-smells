class Payment {
    constructor(customer, amount) {
        this.customer = customer;
        this.amount = amount;
    }

    processPayment() {
        throw new Error('processPayment() must be implemented by subclasses');
    }

    validate() {
        throw new Error('validate() must be implemented by subclasses');
    }
}

class CreditCardPayment extends Payment {
    processPayment() {
        return { status: 'success', transactionId: 'CC12345XYZ', amount: this.amount, customer: this.customer };
    }

    validate() {
        return true;
    }
}

class PayPalPayment extends Payment {
    processPayment() {
        return { status: 'success', transactionId: 'PP67890ABC', amount: this.amount, customer: this.customer };
    }

    validate() {
        return this.customer.includes('@');
    }
}

class CheckoutService {
    constructor() {
        this.checkouts = [];
    }

    addCheckout(paymentType, paymentDetails) {
        let paymentProcessor;

        switch (paymentType) {
            case 'creditCard':
                paymentProcessor = new CreditCardPayment(paymentDetails.customer, paymentDetails.amount);
                break;
            case 'paypal':
                paymentProcessor = new PayPalPayment(paymentDetails.customer, paymentDetails.amount);
                break;
            default:
                console.error('Unsupported payment type');
                throw new Error('Unsupported payment type');
        }

        this.checkouts.push(paymentProcessor);
    }

    processCheckout(paymentProcessor) {
        if (paymentProcessor.validate()) {
            const paymentResult = paymentProcessor.processPayment();
            if (paymentResult.status === 'success') {
                console.log(`Payment processed successfully: Transaction ID ${paymentResult.transactionId}`);
                return true;
            }
        }
        console.error('Payment processing failed');
        return false;
    }

    processAllCheckouts() {
        try {
            for (const paymentProcessor of this.checkouts) {
                if (!this.processCheckout(paymentProcessor)) {
                    return false;
                }
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