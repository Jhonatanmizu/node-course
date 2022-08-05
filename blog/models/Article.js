const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/db')


const Article = sequelize.define('articles', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Article