const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("guiapress", "root", "password", {
    host: "localhost",
    dialect: "mariadb",
    timezone: "-03:00"
});

async function ConnectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
module.exports = { sequelize, ConnectDB }