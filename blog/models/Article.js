const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/db')

const Category = require('./Category')
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
Article.belongsTo(Category)
Category.hasMany(Article)

Article.sync({ force: false }).then(() => {
    console.log("CREATED ARTICLE TABLE");
}).catch(err => {
    console.log("ERROR IN CREATE ARTICLE TABLE", err);
})
module.exports = Article