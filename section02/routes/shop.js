const path = require('path');

const express = require('express');

const shopCon = require('../controllers/shop')

const router = express.Router();

router.get('/', shopCon.getIndex);

router.get('/products', shopCon.getProducts);

router.get('/products/:productId', shopCon.getProduct);

router.get('/cart', shopCon.getCart);

router.post('/cart', shopCon.postCart);

router.post('/cart-delete-item', shopCon.postCartDeleteItem);

router.get('/checkout', shopCon.getCheckout)

module.exports = router;
