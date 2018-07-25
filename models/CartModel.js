const mongoose = require('mongoose')
model = require('./Model.js')

const Schema = mongoose.Schema;

let cartSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true
        },
        name: {
            type: String,
        },
        price: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
)

mongoose.model('CartModel', cartSchema);