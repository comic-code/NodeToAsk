const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('./database');
const Ask = require('./database/models/Ask');
const Response = require('./database/models/Response');

connection.authenticate().then(() => {
    console.log('DB 🚀');
  })
  .catch(error => {
    console.log(error);
  });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // Necessário para receber os dados corretamente
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Ask.findAll({ raw: true, order: [ // raw: true trás apenas os dados
    ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente
  ]}).then(asks => {
    res.render('index', {
      asks
    });
  });
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

app.get('/ask/:id', (req, res) => {
  const { id } = req.params;
  Ask.findOne({
    raw: true,
    where: {id}
  }).then(ask => {
    if(ask) {
      Response.findAll({ 
        raw: true, 
        where: {askId: ask.id}, 
        order: [
          ['id', 'DESC']
        ]
      }).then(responses => {
        res.render('currentAsk', { ask, responses });
      })
    } else {
      res.redirect('/');
    }
  });
})

app.post('/saveAsk', (req, res) => {
  const { title, description } = req.body;
  Ask.create({
    title,
    description
  }).then(() => {
    console.log('Ask salvo ✔️');
    res.redirect('/');
  });
});

app.post('/response', (req, res) => {
  const { askId, body } = req.body;
  Response.create({
    askId,
    body
  }).then(() => {
    console.log(`Resposta para Ask ${askId} ✔️`);
    res.redirect(`/ask/${askId}`);
  }).catch(e => console.log(e));
})

app.listen(4000, error => {
  error ? console.log(error) : console.log('Back-End 🚀');
});
