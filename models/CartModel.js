const mongoose = require('mongoose')
model = require('./Model.js')

const Schema = mongoose.Schema;

let cartSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
)

mongoose.model('CartModel', cartSchema);