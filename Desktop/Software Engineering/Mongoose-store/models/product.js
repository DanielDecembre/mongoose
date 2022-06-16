const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, requires: true},
    img: { type: String, required: true },
    price: { type: Number},
    qty: { type: Number},
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
