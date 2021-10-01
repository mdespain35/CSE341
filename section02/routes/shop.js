const path = require('path');

const express = require('express');

const productsCon = require('../controllers/products')
const adminData = require('./admin');

const router = express.Router();

router.get('/', productsCon.getProducts);

module.exports = router;
