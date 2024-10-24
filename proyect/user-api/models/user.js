const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que esta ruta es correcta

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // Si deseas usar timestamps automáticos
});

module.exports = User;
