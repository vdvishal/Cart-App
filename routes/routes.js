const express = require('express')
const controller = require('./../controllers/controllerCart')

const appConfig = require("./../config/appConfig")


let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/product';

    app.post(baseUrl + '/create', controller.createlisting);

    /**
    * @api {post} /api/v1/product/create Create product
    * @apiVersion 0.0.1
    * @apiGroup create
    *
    * @apiParam {String} name name of the product passed as a body parameter
    * @apiParam {String} description description of the product passed as a body parameter
    * @apiParam {String} price price of the product passed as a body parameter
    * @apiParam {String} category category of the product passed as a body parameter
    * @apiParam {Date} releaseDate  Release date of the product passed as a body parameter
    * @apiParam {Boolean} isAvailable  Boolean True/False of the product passed as a body parameter
    *  @apiSuccessExample {json} Success-Response:
    *  {
       "error": false,
       "message": "Product Created successfully",
       "status": 200,
       "data":{
               "name": String,
               "description": String,
               "category": String,
               "price": String,
               "releaseDate": Date,
               "isAvailable": Boolean,
               "_id": String,
               "productId": String,
               "__v": number
               }
           }
       }
   }
     @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Error Occured.,
       "status": 500,
       "data": null
      }
    */

    app.get(baseUrl + '/all', controller.viewAllProducts);

    /**
	 * @api {get} api/v1/product/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "All Products Details",
    "status": 200,
    "data": [
                {
        "name": String,
        "description": String,
        "category": String,
        "price": String,
        "releaseDate": Date,
        "isAvailable": Boolean,
        "_id": String,
        "productId": String,
        "__v": number
                }
            ]
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl + '/:productId', controller.viewByProductId);

    /**
 * @api {get} /api/v1/product/:productId Get a single product
 * @apiVersion 0.0.1
 * @apiGroup read
 *
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
"error": false,
"message": "Product Details",
"status": 200,
"data": {
    "name": String,
    "description": String,
    "category": String,
    "price": String,
    "releaseDate": Date,
    "isAvailable": Boolean,
    "_id": String,
    "productId": String,
    "__v": number
}
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured.",
    "status": 500,
    "data": null
   }
 */

    app.put(baseUrl + '/:productId/edit', controller.editProductInfo);

    /**
  * @api {put} /api/v1/product/:productId/edit Edit product details
  * @apiVersion 0.0.1
  * @apiGroup edit
  *  
  *  @apiParam {String} productId of the product passed as the URL parameter
  *  @apiSuccessExample {json} Success-Response:
  *  {
 "error": false,
 "message": "Product Details Editted Successfully",
 "status": 200,
 "data": {
     "n": 1,
     "nModified": 1,
     "ok": 1
 }
}
   @apiErrorExample {json} Error-Response:
  *
  * {
     "error": true,
     "message": "Error Occured.,
     "status": 500,
     "data": null
    }
  */

    app.post(baseUrl + '/:productId/delete', controller.deleteByProductId);

    /**
  * @api {post} /api/v1/product/:productId/delete Delete product by productId
  * @apiVersion 0.0.1
  * @apiGroup delete
  *
  * @apiParam {String} productId of the product passed as the URL parameter
  *
  *  @apiSuccessExample {json} Success-Response:
  *  {
 "error": false,
 "message": "Product Deleted Successfully",
 "status": 200,
 "data": {
     "n": 1,
     "ok": 1
 }
}
   @apiErrorExample {json} Error-Response:
  *
  * {
     "error": true,
     "message": "Error Occured.,
     "status": 500,
     "data": null
    }
  */

    app.post(baseUrl + '/add/:productId', controller.addToCart);

    /**
    * @api {post} /api/v1/product/add/:productId Add product to cart by productId
    * @apiVersion 0.0.1
    * @apiGroup create
    *
    * @apiParam {String} productId of the product passed as the URL parameter
    *
    *  @apiSuccessExample {json} Success-Response:
    *  {
   "error": false,
   "message": "Product Added to Cart ",
   "status": 200,
   "data": {
       "quantity": Number,
       "_id": String,
       "productId": String,
       "__v": Number
   }
   }
    * @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Error Occured.,
       "status": 500,
       "data": null
      }
    */


    app.post(baseUrl + '/cart/remove/:productId', controller.removeCartProduct);

    /**
    * @api {post} /api/v1/product/cart/remove/:productId Remove product from cart
    * @apiVersion 0.0.1
    * @apiGroup delete
    *
    * @apiParam {String} productId of the product passed as the URL parameter
    *
    *  @apiSuccessExample {json} Success-Response:
    *  {
    "error": false,
    "message": "Product removed from Cart ",
    "status": 200,
    "data": {
        "n": 1,
        "ok": 1
    }
}
    * @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Error Occured.,
       "status": 500,
       "data": null
      }
    */
}


module.exports = {
    setRouter: setRouter
}