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

    processOrder(orderDetails, callback) {
        const item = items.find(item => item.id === orderDetails.itemId);
        if (!item || item.quantity < orderDetails.quantityOrdered) {
            console.log('Item not available or insufficient quantity.');
            return false;
        }
        
        let totalPrice = item.price * orderDetails.quantityOrdered;
        
        let paymentStatus = orderDetails.paymentMethod === 'CreditCard' || orderDetails.paymentMethod === 'PayPal' ? true : false;
        if (!paymentStatus) {
            console.log('Payment failed.');
            return false;
        }
        
        item.quantity -= orderDetails.quantityOrdered;
        
        let shipmentStatus = orderDetails.shipmentMethod === 'Standard' || orderDetails.shipmentMethod === 'Express' ? true : false;
        if (!shipmentStatus) {
            console.log('Shipment failed.');
            return false;
        }
        
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