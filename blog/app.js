const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
// DATABASE
const Article = require('./models/Article')
const Category = require('./models/Category')
const { ConnectDB, sequelize } = require('./database/db')
ConnectDB().then(() => {
    console.log("CONECTADO AO DB");
}).catch((err) => {
    console.log("Não foi possível se conectar ao db");
})
// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// VIEW ENGINE
app.set("view engine", "ejs");
app.use(express.static("public"));
// ROUTES
app.use('/', categoriesController);
app.use('/', articlesController);


app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
