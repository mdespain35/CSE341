const path = require('path');

const express = require('express');

const adminCon = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminCon.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminCon.postAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminCon.getProducts)

router.get('/edit-product/:productId', isAuth, adminCon.getEditProduct);

router.post('/edit-product/', isAuth, adminCon.postEditProduct);

router.post('/delete-product', isAuth, adminCon.postDeleteProduct);

module.exports = router;
