const mongoose = require('mongoose')
const OrdersSchema = new mongoose.Schema({
    products: [
        {
            product_id: String
        }
    ],
    user: String,
    total_price: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrdersSchema)