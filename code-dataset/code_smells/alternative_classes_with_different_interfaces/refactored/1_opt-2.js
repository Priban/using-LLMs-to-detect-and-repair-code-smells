class Payment {
    constructor(customer, amount) {
        this.customer = customer;
        this.amount = amount;
    }

    processPayment() {
        throw new Error('processPayment() must be implemented by subclasses');
    }

    validatePaymentDetails() {
        throw new Error('validatePaymentDetails() must be implemented by subclasses');
    }
}

class CreditCardPayment extends Payment {
    processPayment() {
        return { status: 'success', transactionId: 'CC12345XYZ', amount: this.amount, customer: this.customer };
    }

    validatePaymentDetails() {
        return true;
    }
}

class PayPalPayment extends Payment {
    processPayment() {
        return { status: 'success', transactionId: 'PP67890ABC', amount: this.amount, customer: this.customer };
    }

    validatePaymentDetails() {
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

    createPaymentProcessor(paymentType, paymentDetails) {
        switch (paymentType) {
            case 'creditCard':
                return new CreditCardPayment(paymentDetails.customer, paymentDetails.amount);
            case 'paypal':
                return new PayPalPayment(paymentDetails.customer, paymentDetails.amount);
            default:
                throw new Error('Unsupported payment type');
        }
    }

    processCheckout(paymentType, paymentDetails) {
        const paymentProcessor = this.createPaymentProcessor(paymentType, paymentDetails);

        if (paymentProcessor.validatePaymentDetails()) {
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
            for (const checkout of this.checkouts) {
                if (!this.processCheckout(checkout.paymentType, checkout.paymentDetails)) {
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