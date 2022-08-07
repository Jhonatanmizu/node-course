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

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            [
                "id", "DESC"
            ]
        ]
    }).then((articles) => {
        Category.findAll().then(categories => {

            res.render('index', { articles: articles, categories: categories })
        })
    })
})
app.get('/:slug', (req, res) => {
    const slug = req.params.slug
    console.log("SLUG", slug);
    Article.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if (article)
            Category.findAll().then(categories => {

                res.render('reader', { articles: articles, categories: categories })
            })
    }).catch((err) => {

        console.error(err);
        res.redirect('/')
    }
    )
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
