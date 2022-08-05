const express = require('express')
const router = express.Router()


router.get('/articles', (req, res, next) => {
    res.send("ROTA DE ARTICLES")
})

router.get('/admin/articles/new', (req, res, next) => {
    res.send("ROTA DE NOVO ARTIGO")
})

module.exports = router