
const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [200, 'name cannot be more than 40 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add a imageUrl'],
    },
    comment: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    yumFactor: {
        type: Number,
        required: true,
        min: [1, 'Min value is 1 '],
        max: [5, 'Max Value is 5'],
    }
})

module.exports = mongoose.models.Cake || mongoose.model('Cake', CakeSchema);