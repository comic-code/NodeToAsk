const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('./database');
const Ask = require('./database/models/Ask');

connection
  .authenticate()
  .then(() => {
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
  res.render('index'); // Automaticamente pega "VIEWS"
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

app.post('/saveAsk', (req, res) => {
  const { title, description } = req.body;
  Ask.create({
    title,
    description
  }).then(() => {
    res.redirect('/');
  });
});

app.listen(4000, error => {
  error ? console.log(error) : console.log('Back-End 🚀');
});
