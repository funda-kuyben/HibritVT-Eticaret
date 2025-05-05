const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes
router.use(protect);

// Supplier only routes
router.post('/', restrictTo('supplier'), productController.createProduct);
router.put('/:id', restrictTo('supplier'), productController.updateProduct);
router.delete('/:id', restrictTo('supplier'), productController.deleteProduct);

module.exports = router; 