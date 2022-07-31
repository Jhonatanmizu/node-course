
// const sequelize = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../database/db');

const Question = sequelize.define('perguntas', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Question.sync({ force: false }).then((resp) => {
    console.log("TABELA CRIADA", resp);
}).catch(err => console.log(err))

module.exports = Question