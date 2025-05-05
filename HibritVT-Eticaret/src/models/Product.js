const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ürün adı zorunludur'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Ürün açıklaması zorunludur']
  },
  price: {
    type: Number,
    required: [true, 'Ürün fiyatı zorunludur'],
    min: [0, 'Fiyat 0\'dan küçük olamaz']
  },
  supplierId: {
    type: Number,
    required: [true, 'Tedarikçi ID zorunludur'],
    ref: 'User'
  },
  stock: {
    type: Number,
    required: [true, 'Stok miktarı zorunludur'],
    min: [0, 'Stok 0\'dan küçük olamaz']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Soft delete için middleware
productSchema.pre('find', function() {
  this.where({ isDeleted: false });
});

productSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

module.exports = mongoose.model('Product', productSchema); 