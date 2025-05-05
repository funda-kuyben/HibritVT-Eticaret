const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const router = express.Router();
const User = require("../models/User");
const sendEmail = require("../utils/email");

// Kayıt (Register)
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ msg: "Tüm alanlar zorunludur" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Bu email zaten kullanılıyor" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    return res.status(201).json({
      msg: "Kayıt başarılı",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ msg: "Sunucu hatası" });
  }
});

// Giriş (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: "Geçersiz e-posta veya şifre" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Geçersiz e-posta veya şifre" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      msg: "Giriş başarılı",
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ msg: "Sunucu hatası" });
  }
});

// Şifremi Unuttum (Forgot Password)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 10 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpire;
    await user.save();

    const resetURL = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Şifre Sıfırlama Bağlantısı",
      message: `Şifrenizi sıfırlamak için bu bağlantıya tıklayın:\n\n${resetURL}`,
    });

    res.status(200).json({
      msg: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
});

// Şifre Sıfırlama (Reset Password)
router.post("/reset-password/:token", async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Token geçersiz veya süresi dolmuş" });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ msg: "Şifreniz başarıyla güncellendi" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
});

module.exports = router;
