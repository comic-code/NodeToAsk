const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

  res.send('Formulário recebido!');
});

app.listen(4000, error => {
  error ? console.log(error) : console.log('🚀');
});
