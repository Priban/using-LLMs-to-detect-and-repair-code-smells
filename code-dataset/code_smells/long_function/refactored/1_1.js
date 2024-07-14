const items = [
    { id: 1, name: 'Laptop', price: 999, quantity: 10 },
    { id: 2, name: 'Smartphone', price: 699, quantity: 15 },
    { id: 3, name: 'Tablet', price: 499, quantity: 20 },
];

class OrderService {
    constructor() {
        this.orders = [];
    }

    addOrder(orderDetails) {
        this.orders.push(orderDetails);
    }

    isItemAvailable(item, quantityOrdered) {
        return item && item.quantity >= quantityOrdered;
    }

    isValidPaymentMethod(paymentMethod) {
        const validPaymentMethods = ['CreditCard', 'PayPal'];
        return validPaymentMethods.includes(paymentMethod);
    }

    isValidShipmentMethod(shipmentMethod) {
        const validShipmentMethods = ['Standard', 'Express'];
        return validShipmentMethods.includes(shipmentMethod);
    }

    processOrder(orderDetails, callback) {
        const item = items.find(item => item.id === orderDetails.itemId);
        if (!this.isItemAvailable(item, orderDetails.quantityOrdered)) {
            console.log('Item not available or insufficient quantity.');
            return false;
        }

        if (!this.isValidPaymentMethod(orderDetails.paymentMethod)) {
            console.log('Payment failed.');
            return false;
        }

        if (!this.isValidShipmentMethod(orderDetails.shipmentMethod)) {
            console.log('Shipment failed.');
            return false;
        }

        item.quantity -= orderDetails.quantityOrdered;
        const totalPrice = item.price * orderDetails.quantityOrdered;

        const orderConfirmation = {
            ...orderDetails,
            totalPrice,
            orderDate: new Date().toISOString(),
            status: 'Confirmed'
        };

        callback(orderConfirmation);
        return true;
    }

    processAllOrders(callback) {
        for (const order of this.orders) {
            const result = this.processOrder(order, callback);
            if (!result) return false;
        }
        return true;
    }
}

class API {
    constructor() {
        this.orderService = new OrderService();
    }

    addOrder(orderDetails) {
        this.orderService.addOrder(orderDetails);
    }

    processOrders(callback) {
        return this.orderService.processAllOrders(callback);
    }
}

module.exports = { API };