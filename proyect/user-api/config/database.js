const { Sequelize } = require('sequelize');

// Configura tu conexión a SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'  // Cambia esto a la ruta que uses
});

module.exports = sequelize;
