const Cart = require('../models/Cart');
const sendEmail = require('../utils/email');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Ürün sepette var mı kontrol et
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }

    await cart.save();

    // Email bildirimi gönder
    await sendEmail({
      email: req.user.email,
      subject: 'Sepetiniz Güncellendi',
      message: `${name} ürünü sepetinize eklendi.`
    });

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Sepet bulunamadı'
      });
    }

    const item = cart.items.find(item => item.productId === productId);
    
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Ürün sepette bulunamadı'
      });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Sepet bulunamadı'
      });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Sepetiniz boş'
      });
    }

    // Sipariş oluşturma işlemleri burada yapılacak
    // ...

    // Email bildirimi gönder
    await sendEmail({
      email: req.user.email,
      subject: 'Siparişiniz Alındı',
      message: 'Siparişiniz başarıyla alındı. Sipariş detaylarınızı en kısa sürede göndereceğiz.'
    });

    // Sepeti temizle
    cart.items = [];
    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Siparişiniz başarıyla alındı'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 