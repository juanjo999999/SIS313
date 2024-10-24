const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.REAL, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    categoryId: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
    image: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: true
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
