const path = require('path');

const express = require('express');

const shopCon = require('../controllers/shop')

const router = express.Router();

router.get('/', shopCon.getIndex);

router.get('/products', shopCon.getProducts);

router.get('/cart', shopCon.getCart);

router.get('/checkout', shopCon.getCheckout)

module.exports = router;
