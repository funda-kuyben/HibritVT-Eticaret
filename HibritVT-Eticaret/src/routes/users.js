// src/routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/auth");

// Tüm kullanıcı endpoint’leri için token şart
router.use(protect);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.put("/password", userController.updatePassword);

module.exports = router;
