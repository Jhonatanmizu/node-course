const { Sequelize } = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})
async function connectDB() {
    try {

        await sequelize.authenticate()
        console.log("CONNECTED TO DB");
    } catch (err) {
        console.error("ERROR IN CONNECTION WITH DB", err)
    }
}
module.exports = sequelize