import Express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import jwt from 'jsonwebtoken'
const app = Express()
const port = 3000
const key = 'mizu'

app.use(cors())
const db = {
    games: [
        {
            id: 1,
            title: "CS GO",
            year: 2012,
            price: 0
        },
        {
            id: 2,
            title: "Megaman x",
            year: 1970,
            price: 50
        },
        {
            id: 10,
            title: "Minecraft",
            year: 2014,
            price: 100
        }
    ],
    users: [
        {
            id: 1,
            name: 'Jhonatan',
            email: 'jhon@gmail.com',
            password: 'anyCode'
        }
    ]
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.get('/games', auth, (req, res) => {
    res.status(200)
    res.json(db.games)
})
app.get('/game/:id', (req, res) => {
    const { id } = req.params
    if (isNaN(id)) {
        res.send("Error o id: " + id + " " + "não é um número!")
        res.status(400)
    } else {
        const game = db.games.find(game => game.id === Number(id))
        if (!game) {
            res.status(404)
            res.send("Não foi encontrado")
        } else {

            res.status(200)
            res.json(game)
        }
    }

})
app.post('/game', (req, res) => {
    const { title, year, price } = req.body
    if (title != '' && year > 0 && price >= 0) {

        let gameModel = {
            id: Math.random() * 1000 - 20,
            title: title,
            year: year,
            price: price
        }
        db.games.push(gameModel)
        res.status(200)
        res.send("Cadastrado com sucesso")
    } else {
        res.status(400)
        res.send("Error")
    }

})
app.delete('/game/:id', (req, res) => {
    const { id } = req.params
    if (isNaN(id)) {
        res.send("Error o id: " + id + " " + "não é um número!")
        res.status(400)
    } else {
        const gameIndex = db.games.findIndex(game => game.id === Number(id))
        if (gameIndex == -1) {
            res.status(404)
            res.send("Não foi encontrado")
        } else {
            res.status(200)
            res.json(db.games.splice(gameIndex, 1))
        }
    }
})
app.put('/game/:id', (req, res) => {
    const { id } = req.params
    const { title, year, price } = req.body

    if (isNaN(id)) {
        res.send("Error o id: " + id + " " + "não é um número!")
        res.status(400)
    } else {
        const gameIndex = db.games.findIndex(game => game.id === Number(id))
        if (gameIndex == -1) {
            res.status(404)
            res.send("Não foi encontrado")
        } else {
            res.status(200)
            let gameModel = {
                id: id,
                title: title,
                year: year,
                price: price
            }
            db.games[gameIndex] = gameModel
            res.json(db.games[gameIndex])
        }
    }
})
app.post('/auth', (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        const user = db.users.find(u => u.email == email && u.password == password)
        if (user) {
            jwt.sign({
                id: user.id,
                email: user.email
            }, key, { expiresIn: '5h' }, (err, token) => {
                if (err) {
                    res.send(err)
                } else {
                    res.status(200)
                    res.json({ token: token })
                    const resp = jwt.decode(token)
                    console.log('Resp', resp);
                }
            })
        } else {
            res.status(404)
            res.send('Nobody wanna see us together...')
        }
    } else {
        res.status(400)
        res.send('dados inválidos')
    }
})
function auth(req, res, next) {
    const authToken = req.headers['authorization']
    console.log("authtoken", authToken);
    if (authToken) {
        const bearer = authToken.split(' ')
        const token = bearer[1]
        jwt.verify(token, key, (err, resp) => {
            if (err) {
                console.error(err);
            } else {
                req.token = resp;
                req.currentUser = {
                    id: resp.id,
                    email: resp.email
                }
                next()
            }
        })
        // console.log(isValid);
    } else {
        res.status(401)
        res.json({ err: 'token inválido' })
    }
}
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})