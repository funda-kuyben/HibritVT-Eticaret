const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Ürün bulunamadı'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      supplierId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Ürün bulunamadı'
      });
    }

    // Sadece ürünün sahibi güncelleyebilir
    if (product.supplierId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Ürün bulunamadı'
      });
    }

    // Sadece ürünün sahibi silebilir
    if (product.supplierId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    // Ürünü soft delete yap
    product.isDeleted = true;
    await product.save();

    // Ürünü sepetlerde kontrol et
    const carts = await Cart.find({
      'items.productId': req.params.id
    });

    if (carts.length > 0) {
      // Sepetlerdeki ürünleri güncelle
      for (const cart of carts) {
        cart.items = cart.items.filter(item => item.productId !== req.params.id);
        await cart.save();
      }
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 