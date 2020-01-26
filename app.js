const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonWebToken = require('jsonwebtoken')

const PORT = 3000;

// VIEWS

app.set('views/', './views');
app.set('view engine', 'ejs');


// MIDDLEWARE

// use permet d'indiquer quelles sont les middleware à utiliser
// ici ici on ajoute le middleware afin de pouvoir utiliser des fichiers statics

app.use('/public',express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }))


// ROUTER

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/movies', (req, res) => {
  res.render('movies/index');
})

app.get('/movies/add', (req, res) => {
  res.render('movies/create');
})

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/movies/add', urlencodedParser, (req, res) => {
  console.log(req.body)
  res.sendStatus(201)
})

app.get('/movies/search', (req, res) => {
  res.render('movies/search')
})

// FAKE USER

const fakeUser = { email: 'benj@gmail.com', password: 'password'};
const secret = 'zeoi8ijfz43oeohfa123zoefhazi123enkczio098vch';

app.get('/login', (req, res) => {
  res.render('login/login')
})

app.post('/login', urlencodedParser, (req, res) => {
  if(!req.body) {
    res.sendStatus(500)
  }
  if(fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
    const myToken = jsonWebToken.sign({ iss: 'localhost:3000', user: 'Ben', role:'moderator'}, secret )
    res.json(myToken)
    console.log('ok')
  }
})



app.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  res.render('movies/show', { movieId : id });
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${3000}`);
})