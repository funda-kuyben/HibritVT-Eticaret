// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sequelize = require("./config/database");
const User = require("./models/User");
const sendEmail = require("./utils/email");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Bağlantısı ve tablolar
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL bağlantısı başarılı");
    return sequelize.sync(); // Model tablolarını oluşturur
  })
  .then(() => console.log("MySQL tabloları senkronize edildi"))
  .catch((err) => console.error("MySQL bağlantı hatası:", err));

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Route'lar
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));

// Test endpoint
app.get("/", (req, res) => {
  res.send("API çalışıyor");
});

// Hata yakalama
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Bir şeyler ters gitti!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
// src/index.js'in en altına test için ekle
sendEmail({
  email: "kendiadresin@gmail.com",
  subject: "Test Mail",
  message: "Bu bir test mesajıdır.",
})
  .then(() => console.log("E-posta gönderildi"))
  .catch((err) => console.error("E-posta gönderilemedi:", err));
