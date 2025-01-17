const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    productCode: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)