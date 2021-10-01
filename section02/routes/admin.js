const path = require('path');

const express = require('express');

const productsCon = require('../controllers/products')

const router = express.Router();

// /admin/add-product => GET
router.get(productsCon.getAddProduct);

// /admin/add-product => POST
router.post(productsCon.postAddProduct);

exports.routes = router;
