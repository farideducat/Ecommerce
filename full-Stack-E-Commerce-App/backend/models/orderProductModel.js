const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    ProductDetails: {
        type: Array,
        default: []
    },
    email: String,
    userId: String,
    paymentDetails: {
        paymentId: String,
        payment_method_type: [],
        payment_status: String, 
    },
    // IMPORTANT: This must match your "Final Object to Save"
    shipping_options: [
        {
            shipping_amount: Number
        }
    ],
    total_amount: Number
}, {
    timestamps: true
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;