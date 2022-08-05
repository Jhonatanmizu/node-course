const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/db')
const Category = sequelize.define('categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Category