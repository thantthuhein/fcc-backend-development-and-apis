let express = require('express')
require('dotenv').config()
let app = express()
let bodyParser = require('body-parser')

app.use('/public', express.static(__dirname + '/public'))

app.use((req, res, next) => {
  console.log('I am middleware')
  
  next()
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html'

  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
  let responseStr = "Hello json"
  process.env.MESSAGE_STYLE === 'uppercase' ?
    res.json({ "message": responseStr.toUpperCase() }) :
    res.json({"message": responseStr})
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.send({time: req.time});
})

app.get('/:word/echo', (req, res) => {
  let word = req.params.word
  
  res.json({echo: word})
})

app.route('/name')
  .get((req, res) => {
    let firstname = req.query.first
    let lastname = req.query.last
    
    res.json({ name: firstname + ' ' + lastname})
  })
  .post((req, res) => {
    let firstname = req.body.first
    let lastname = req.body.last

    res.json({ name: firstname + ' ' + lastname})
  })

module.exports = app
