const knex = require('../database/connection')
const bcrypt = require('bcrypt')
class User {
    async new(user) {
        const { email, password, name, role } = user
        const hash = await bcrypt.hash(password, 10)
        try {
            await knex.insert({ email, password: hash, name, role: 0 }).into('users')
        } catch (error) {
            console.error(error);
        }
    }
    async findEmail(email) {
        try {

            return await knex.select().into("users").where({ email: email })
        } catch (error) {
            console.error(error)
        }
    }
    async getUsers(sort) {
        try {

            return await knex.select(["id", "email", "role", "name"]).into('users').orderBy("id", sort)
        } catch (error) {
            console.error(error)
        }
    }
    async getUserById(id) {
        try {

            return await knex.select(["id", "email", "role", "name"]).into('users').where("id", id)
        } catch (error) {
            console.error(error)
        }
    }
    async deleteById(id) {
        try {

            return await knex.select().into('users').where("id", id).del()
        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = new User()