const path = require('path');

const express = require('express');

const adminCon = require('../controllers/admin')

const router = express.Router();

// /admin/add-product => GET
router.get(adminCon.getAddProduct);

// /admin/add-product => POST
router.post(adminCon.postAddProduct);

// /admin/products => GET
router.get('/products', adminCon.getProducts)

exports.routes = router;
