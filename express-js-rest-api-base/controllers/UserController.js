const knex = require('knex')
const User = require('../models/User')
class UserController {
        async index(req, res) {

        }
        async create(req, res) {
                const { name, password, email, role } = req.body
                if (!name) {
                        res.status(400)
                        res.send("Nome inválido")
                        return
                }
                if (!email || !password || !role) {
                        res.send(400)
                        res.send("Dados inválidos")
                        return
                }
                const result = await User.findEmail(email)
                console.log(result);
                if (result.length >= 1) {
                        res.status(406)
                        res.send("Email já cadastrado")
                        return
                }
                await User.new(req.body)
                res.status(200)
                res.json(req.body)
        }
        async update(req, res) {

        }
        async deleteById(req, res) {

        }
        async getAll(req, res) {
                const result = await User.getUsers("asc")
                console.log(result);
                if (result) {
                        res.status(200)
                        res.json(result)
                } else {
                        res.status(404)
                        res.send("Ocorreu um erro, usuários não foram encontrados")
                }
        }
        async getById(req, res) {
                const { id } = req.params
                if (!id) {
                        res.status(403)
                        res.send("parâmetros inválidos")
                        return
                }
                const user = await User.getUserById(id)
                if (user.length >= 1) {
                        res.status(200)
                        res.json(user)
                        console.log(user);
                } else {
                        res.status(404)
                        res.send("Usuário não encontrado")
                }
        }
        async deleteById(req, res) {
                const { id } = req.params
                if (!id) {
                        res.status(403)
                        res.send("parâmetros inválidos")
                        return
                }
                const user = await User.deleteById(id)
                if (user) {
                        res.status(200)
                        res.json(user)
                        console.log(user);
                } else {
                        res.status(404)
                        res.send("Usuário não deletado")
                }
        }
}
module.exports = new UserController()