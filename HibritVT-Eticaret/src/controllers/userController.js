const User = require("../models/User");

// Profil Bilgilerini Getir
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Profil Bilgilerini Güncelle
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Bu email adresi zaten kullanımda",
        });
      }
    }

    const user = await User.findByPk(req.user.id);
    await user.update({ firstName, lastName, email });

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Şifre Güncelle
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);

    // Mevcut şifre doğru mu kontrol et
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Mevcut şifre yanlış",
      });
    }

    // Yeni şifreyi ata ve kaydet
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Şifreniz başarıyla güncellendi",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
