const express = require('express');
const router = express.Router();

const Products = require('../controllers/ProductsController');

router.post('/create', Products.createProducts);
router.get('/get', Products.getProducts);
router.get('/get/:uuid', Products.getProductByUuid);
router.put('/update', Products.updateProducto);
router.delete('/inactive/:uuid', Products.inactiveProduct);

module.exports = router;