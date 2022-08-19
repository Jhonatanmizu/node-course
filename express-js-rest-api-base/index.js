const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./routes/routes")
const connection = require('./database/connection')
const port = 3000
connection()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(cors())
app.use(bodyParser.json())

app.use("/", router);

app.listen(port, () => {
    console.log("Servidor rodando na porta http://localhost:3000")
});
