const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cartData: {
        type: Array,
        required: [true, 'Please send cartData']
    },
    cartId: {
        type: String,
        unique: true,
        required: [true, 'Please send cartId']

    }
})

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);