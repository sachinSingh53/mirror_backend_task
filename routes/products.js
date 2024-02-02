const express = require('express');
const router = express.Router({mergeParams:true});
const Product = require('../models/product');
const productController = require('../controllers/product');

router.get('/search',productController.search);

router.route('/')
    .get(productController.index)
    .post(productController.create)




router.route('/:id')
    .get(productController.show)
    .put(productController.update)
    .delete(productController.delete)




module.exports = router;