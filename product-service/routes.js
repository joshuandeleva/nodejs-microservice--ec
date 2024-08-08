const express = require('express');
const { doAddProduct, BuyProduct } = require('./controller');
const { isAuthenticated } = require('./middleware');

const productRouter = express.Router();

productRouter.post('/createProduct',isAuthenticated, doAddProduct)
productRouter.post('/buy',isAuthenticated, BuyProduct)

module.exports = productRouter;