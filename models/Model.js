const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let productInfo = new Schema(
    {   
        productId: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        category: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: ''
        },
        releaseDate: {
            type: String,
            default: ''
        },
        isAvailable: {
            type: Boolean,
            default: false
        }
    }
)

mongoose.model('Model', productInfo);