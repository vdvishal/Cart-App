const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')

const Model = mongoose.model('Model')
const CartModel = mongoose.model('CartModel')
const response = require('./../libs/responseLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib');

let createlisting = (req, res) => {

    let productId = shortid.generate()

    let newListing = new Model({
        productId: productId,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        releaseDate: req.body.releaseDate,
        isAvailable: true
    })

    newListing.save((err, result) => {
        if (err) {
            logger.error(`${err}`, 'Controller: createListing', 10)
            res.send(err)
        } else {
            let apiResponse = response.generate(false, 'Product Created successfully', 200, result)
                res.send(apiResponse)
        }
    })
}

let viewAllProducts = (req, res) => {
    Model.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(`${err}`, 'Controller: viewAllProduct', 10)
                let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Controller: viewAllProduct')
                let apiResponse = response.generate(true, 'No Product Found ', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Products Details', 200, result)
                res.send(apiResponse)
            }
        })
}

let viewByProductId = (req, res) => {

    Model.findOne({ 'productId': req.params.productId },
        (err, result) => {

            if (err) {
                logger.error(`${err}`, 'Controller: viewByProductId', 10)
                let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Controller: viewByProductId')
                let apiResponse = response.generate(true, 'No Product Found ', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Product Details', 200, result)
                res.send(apiResponse)
            }
        })
}


let deleteByProductId = (req, res) => {
    Model.remove({ 'productId': req.params.productId },
        (err, result) => {
            if (err) {
                logger.error(`${err}`, 'Controller: deleteByProductId', 10)
                let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Controller: deleteByProductId')
                let apiResponse = response.generate(true, 'No Product Found ', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Product Deleted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
}

let editProductInfo = (req, res) => {
    let options = req.body;
    Model.update({ 'productId': req.params.productId }, options, { multi: true })
        .exec((err, result) => {

            if (err) {
                logger.error(`${err}`, 'Controller: editProductInfo', 10)
                let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Controller: editProductInfo')
                let apiResponse = response.generate(true, 'No Product Found ', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Product Details Editted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
}

let addToCart = (req,res) => {

    CartModel.findOne({ 'productId': req.params.productId },
        (err, result) => {
            if (err) {
                logger.error(`${err}`, 'Controller: addToCart', 10)
                let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                res.send(apiResponse)
            } else if (result) {   
            result.quantity += 1;
            result.save(function (err, result) {
                if (err) {
                    logger.error(`${err}`, 'Controller: addToCart', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                    res.send(apiResponse)
                }
                else {
                    logger.info('Product Added')
                    res.send(result)
                }
            })
            } else {
                let id =  req.params.productId;
                Model.findOne({ 'productId': req.params.productId },
                (err, result) => {
                    let newCart = new CartModel({
                        productId: result.productId,
                        name:result.name,
                        price:result.price
                    })
                    newCart.save((err, result) => {
                        if (err) {
                            logger.error(`${err}`, 'Controller: addToCart', 10)
                            let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                            res.send(apiResponse)
                        } else {
                            let apiResponse = response.generate(false, 'Product Added to Cart ', 200, result)
                            res.send(apiResponse)
                            logger.info('Product Added')
                        }
                    })
                })

            }
        })
}


let removeCartProduct = (req,res) => {
    CartModel.remove({'productId': req.params.productId},
    (err,result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed To Find Products Details', 500, null)
                res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No Product Found ', 404, null)
                res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Product removed from Cart ', 200, result)
            res.send(apiResponse)
            logger.info('Product removed')
        }
    }
    )
}


module.exports = {
    createlisting: createlisting,
    viewAllProducts: viewAllProducts,
    viewByProductId: viewByProductId,
    editProductInfo: editProductInfo,
    deleteByProductId: deleteByProductId,
    addToCart: addToCart,
    removeCartProduct: removeCartProduct
}