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
Category.sync({ force: false }).then(() => {
    console.log("CREATED ARTICLE CATEGORY");
}).catch(err => {
    console.log("ERROR IN CREATE ARTICLE CATEGORY", err);
})
module.exports = Category