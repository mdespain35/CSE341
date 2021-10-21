const path = require('path');

const express = require('express');

const shopCon = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopCon.getIndex);

router.get('/products', shopCon.getProducts);

router.get('/products/:productId', shopCon.getProduct);

router.get('/cart', isAuth, shopCon.getCart);

router.post('/cart', isAuth, shopCon.postCart);

router.post('/cart-delete-item', isAuth, shopCon.postCartDeleteProduct);

router.post('/create-order', isAuth, shopCon.postOrder);

router.get('/orders', isAuth, shopCon.getOrders);

module.exports = router;
