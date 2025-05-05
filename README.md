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
  
## Projenin Sağladığı Avantajlar
- Çoklu Veritabanı Kullanımı: MySQL ve MongoDB birlikte kullanılarak veritabanı yönetim sistemlerinin entegrasyonu gösterilmiş ve her veritabanı türünün güçlü yanlarından faydalanılmıştır.

- Esneklik: Kullanıcı, müşteri veya tedarikçi olarak farklı rollerle sisteme erişim sağlayabilir. Bu, sistemin esnekliğini artırır ve kullanıcı deneyimini geliştirir.

- Gelişmiş Güvenlik: JWT tabanlı kimlik doğrulama ve bcrypt şifreleme kullanılarak uygulama güvenliği üst seviyeye çıkarılmıştır.

- E-posta Sistemi: Nodemailer ve Gmail SMTP kullanılarak sistemden şifre sıfırlama gibi bildirimler, güvenli ve pratik bir şekilde kullanıcıya iletilir.

- Soft Delete Özelliği: Verilerin yanlışlıkla silinmesini engelleyen ve geri dönüşüm imkanı tanıyan bir soft delete özelliği projeye entegre edilmiştir.

- Kolay Kullanıcı Arayüzü: Basit ve kullanıcı dostu frontend arayüzleri ile kullanıcı deneyimi iyileştirilmiştir.

## Sonuç
Bu projede hem ilişkisel (MySQL) hem de NoSQL (MongoDB) veritabanlarının birlikte kullanıldığı hibrit bir e-ticaret sistemi geliştirilmiştir. Kullanıcı kimlik doğrulama süreçleri, ürün ve sepet yönetimi gibi temel e-ticaret işlevleri JWT tabanlı güvenli bir altyapı ile gerçekleştirilmiştir. Proje sürecinde kullanıcı arayüzü, backend API'ler ve veritabanı işlemleri uçtan uca test edilmiştir. Şifre sıfırlama gibi ileri düzey özellikler de dahil edilerek tam işlevsel ve güvenli bir sistem ortaya konmuştur.

Bu sistem, gerçek dünya senaryoları için temel bir örnek teşkil etmekte ve farklı veritabanı türlerinin avantajlarını bir arada kullanmayı göstermektedir.
