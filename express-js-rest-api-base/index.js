const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./routes/routes")
const connection = require('./database/connection')
connection()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(cors())
app.use(bodyParser.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
