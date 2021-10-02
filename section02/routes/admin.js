const path = require('path');

const express = require('express');

const adminCon = require('../controllers/admin')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminCon.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminCon.postAddProduct);

// /admin/products => GET
router.get('/products', adminCon.getProducts)

router.get('/edit-product/:productId', adminCon.getEditProduct);

router.post('/edit-product/', adminCon.postEditProduct);

module.exports = router;
