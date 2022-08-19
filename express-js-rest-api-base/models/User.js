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

            return await knex.select().into('users').where({ id: id }).del()
        } catch (error) {
            console.error(error)
        }
    }
    async updateUser(id, body) {
        const { email, name, role } = body
        try {
            const user = await this.getUserById(id)
            console.log("User", user);
            console.log(email);
            const editUser = {};
            if (user.length >= 1) {
                if (email) {
                    console.log(email !== user.email);
                    if (email !== user.email) {
                        let result = await this.findEmail(email)
                        console.log(result);
                        if (result.length < 1) {
                            editUser.email = email;
                        } else {
                            console.log("JJJJJJ");
                            return { status: false, err: "email já cadastrado" }
                        }
                    }
                }
                if (name && role) {
                    editUser.name = name
                    editUser.role = role
                }
                return await knex.update(editUser).where({ id }).into('users')
            } else {
                return {
                    status: false,
                    err: "Usuário não existe"
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports = new User()