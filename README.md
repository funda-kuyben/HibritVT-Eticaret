# HibritVT-Eticaret Projesi

## Projenin Amacı

Bu proje, Veri Tabanı Yönetim Sistemleri (VTYS) dersi kapsamında, hem ilişkisel (MySQL) hem de NoSQL (MongoDB) veritabanlarını birlikte kullanarak hibrit bir e-ticaret sistemi geliştirmeyi amaçlamaktadır. Proje, modern web uygulamalarında çoklu veritabanı kullanımının nasıl entegre edileceğini ve yönetileceğini göstermektedir.

## Özellikler

- Kullanıcı kayıt & giriş (JWT tabanlı kimlik doğrulama)
- Rol tabanlı erişim (müşteri & tedarikçi)
- Şifre sıfırlama (e-posta üzerinden token gönderimi)
- Ürün işlemleri (oluşturma, listeleme, güncelleme, silme)
- Sepet işlemleri (ekle, güncelle, sil, sipariş tamamla)
- Soft delete özelliği
- Basit frontend arayüzleri (HTML & JS)
- E-posta bildirim sistemi (Nodemailer & Gmail SMTP)

## Kullanılan Teknolojiler

- **Backend:** Node.js (Express.js)
- **Frontend:** HTML, Vanilla JavaScript
- **Veritabanı:** MySQL (Sequelize ORM), MongoDB (Mongoose ODM)
- **Kimlik Doğrulama:** JWT
- **Şifreleme:** bcrypt
- **E-posta Servisi:** Nodemailer + Gmail SMTP

## Klasör Yapısı

```
HibritVT-Eticaret/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── cart.html
│   ├── reset-password.html
│   └── js/
│       ├── api.js
│       ├── auth.js
│       ├── product.js
│       └── cart.js
├── .env
├── package.json
└── README.md
```

## Kurulum

### 1. Bağımlılıkları Yükleme

```bash
npm install
```

### 2. .env Dosyası

Proje kök dizinine `.env` dosyası oluşturup aşağıdaki bilgileri girin:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hibritdb
JWT_SECRET=benimsirrim

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=hibritdb

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seninmail@gmail.com
EMAIL_PASS=uygulama_sifresi
```

### 3. Sunucuyu Başlat

```bash
npm start
```

### 4. Frontend Kullanımı

Tarayıcıdan HTML dosyalarını doğrudan açabilirsiniz:

- `register.html` – Kullanıcı kaydı
- `login.html` – Kullanıcı girişi
- `products.html` – Ürün işlemleri
- `cart.html` – Sepet yönetimi
- `reset-password.html` – Şifre sıfırlama

