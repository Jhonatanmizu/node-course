const sequelize = require('../database/db');

const { Sequelize, DataTypes } = require('sequelize')

const Answeer = sequelize.define('respostas', {
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
Answeer.sync({ force: false }).then((resp) => {
    console.log("TABELA RESPOSTAS CRIADA ", resp);
}).catch(err => console.log(err));

module.exports = Answeer