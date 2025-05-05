const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Veritabanı bağlantısını test et
sequelize.authenticate()
  .then(() => console.log('MySQL bağlantısı başarılı'))
  .catch(err => console.error('MySQL bağlantı hatası:', err));

module.exports = sequelize; 