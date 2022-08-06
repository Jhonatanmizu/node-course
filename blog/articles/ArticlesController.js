const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const Article = require('../models/Article')
const slugify = require('slugify')
router.get('/admin/articles', (req, res, next) => {
    // res.send("ROTA DE ARTICLES")
    Article.findAll().then((articles) => {

        res.render('admin/articles/articles', { articles: articles })
    }).catch((err) => {
        console.log(err);
    })
})

router.get('/admin/articles/new', (req, res, next) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })
})
router.post('/article/save', (req, res) => {
    const { title, body, category } = req.body
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        console.log("Artigo salvo com sucesso");
        res.redirect('/admin/articles')
    }).catch(err => {
        console.error("ERRO AO SALVAR O ARTIGO", err)
    })
})
router.post('/admin/articles/delete', (req, res) => {
    const id = req.body.id
    Article.destroy({
        where: {

            id: id

        }
    }).then(() => {
        res.redirect('/admin/articles')
    }).catch(err => {
        console.error(err)
    })
})
// router.post('')
module.exports = router