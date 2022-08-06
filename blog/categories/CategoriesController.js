const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const slugify = require('slugify')

router.post('/categories/save', (req, res, next) => {
    console.log(req.body);
    if (req.body.title) {
        Category.create({
            title: req.body.title,
            slug: slugify(req.body.title)
        }).then((resp) => {
            console.log(resp);
            res.redirect('/admin/categories')
        }).catch(err => {
            console.log("erro ao criar categoria", err);
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})

router.get('/admin/categories/new', (req, res, next) => {
    res.render('admin/categories/new')
})

router.get('/admin/categories', (req, res, next) => {
    Category.findAll().then((resp) => {

        res.render('admin/categories', { categories: resp })
    })

})
router.post('/admin/categories/delete', (req, res, next) => {
    if (req.body.id) {
        if (Number(req.body.id)) {
            Category.destroy({
                where: {
                    id: req.body.id
                }
            }).then(d => {
                console.log("DELETED");
                res.redirect('/admin/categories')

            }).catch(err => {
                console.error("err", err);
            })
        } else {
            res.redirect('/admin/categories')
        }
    }
    else {
        res.redirect('/admin/categories')

    }

})
router.get('/admin/categories/edit/:id', (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.redirect('/admin/categories')
    }
    Category.findByPk(id).then((cat) => {
        if (cat) {
            console.log("CAT", cat);
            res.render('admin/categories/edit', { cat })
        } else {
            res.redirect('/admin/categories')
        }
    })
})
router.post('/categories/update', (req, res) => {
    const { id, title } = req.body;
    Category.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(r => {
        console.log("Atualizado com sucesso");
        res.redirect('/admin/categories')
    }).catch(e => {
        console.log("Erro ao tentar atualizar");
    })
})
module.exports = router