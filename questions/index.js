const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const path = require("path");
const port = 3000;

// VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'))
// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CONNECT DATABASE
const QuestionModel = require('./models/Question')
const AnsweerModel = require('./models/Answeer')
const sequelize = require('./database/db')
sequelize.authenticate().then((resp) => {
  console.log("CONNECTED", resp);
}).catch(err => console.log(err))

// ROUTES
app.get("/", (req, res) => {
  QuestionModel.findAll({
    raw: true, order: [
      ['id', 'DESC'] // ASC
    ]
  }).then((qs) => {
    console.log("asfdhsdfajsafd", qs);
    res.render("index", {
      questions: qs
    })
  }).catch(err => {
    console.log(err);
  })

});
app.get("/perguntar", (req, res) => {

  res.render("perguntar");
})
app.post("/salvarpergunta", (req, res) => {
  QuestionModel.create({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
  }).then((resp) => {
    console.log(resp);

    res.redirect('/')
  }).catch(err => console.log(err))
  console.log("REQ", req.body);


})
app.get("/pergunta/:id", (req, res) => {
  let paramId = req.params.id
  QuestionModel.findOne({
    where: { id: paramId }
  }).then(qs => {
    if (qs) {
      AnsweerModel.findAll({
        where: { questionId: paramId },
        order: [
          ['id', 'DESC']
        ]
      }).then(ans => {
        console.log("QS", qs);
        console.log("ANS", ans);
        if (ans) {

          res.render("pergunta", {
            question: qs,
            answeers: ans
          })
        } else {
          res.render("pergunta", {
            question: qs,

          })
        }
      })
      // res.send(qs)

    } else {
      res.redirect('/')
    }
  }).catch(err => {
    res.send(`<h1>Pergunta não encontrada!</h1>`)

  })
})
app.post("/resposta", (req, res) => {
  let corpo = req.body.body
  let idQuest = req.body.questId
  console.log("REQ", req.body);
  AnsweerModel.create({
    body: corpo,
    questionId: idQuest
  }).then(() => {
    res.redirect(`/pergunta/${idQuest}`)
  }).catch((err) => {
    console.error(err);
  })
})
app.listen(port, () => {
  console.log(`Running the project in http://localhost:${port}`);
});
