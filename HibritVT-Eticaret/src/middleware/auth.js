// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Kullanıcı doğrulama (JWT token kontrolü)
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Lütfen giriş yapın",
      });
    }

    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcı veritabanında hala var mı?
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Bu token ile ilişkili kullanıcı artık mevcut değil",
      });
    }

    // Başarılı → request'e ekle
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Geçersiz token",
    });
  }
};

// Roller için yetki kısıtlaması (örneğin: sadece supplier)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Bu işlemi gerçekleştirmek için yetkiniz yok",
      });
    }
    next();
  };
};
