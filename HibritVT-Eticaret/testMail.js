require("dotenv").config();
const sendEmail = require("./src/utils/email");

sendEmail({
  email: "seninmail@gmail.com", // ← buraya kendi Gmail adresini yaz
  subject: "Test Mail",
  message:
    "Bu bir test e-postasıdır. Eğer bu mail geldiyse sistem çalışıyor demektir.",
})
  .then(() => console.log("✅ E-posta başarıyla gönderildi."))
  .catch((err) => console.error("❌ E-posta gönderilemedi:", err));
