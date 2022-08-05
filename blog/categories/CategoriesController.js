const express = require('express')
const router = express.Router()


router.get('/categories', (req, res, next) => {
    res.send("ROTA DE CATEGORIAS")
})

router.get('/admin/categories/new', (req, res, next) => {
    res.send("ROTA DE NOVA CATEGORIA")
})

module.exports = router