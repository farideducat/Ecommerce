const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    ProductDetails: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    paymentDetails: {
        paymentId: String,
        payment_method_type: Array,
        payment_status: String,
    },
    shipping_option: {
        type: Array,
        default: []
    },
    total_amount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});


const orderModel = mongoose.model("order", schema);

module.exports = orderModel;