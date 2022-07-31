const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('questions', 'root', 'password', {
    host: 'localhost',
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