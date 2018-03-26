const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => res.send('Hello World!'))
// db connection, no frontend, only respons

// 2 actions

// Accept form (form with data posted to express app)
app.post('/vote', function(req, res){
    console.log(req.body)
    // res.send(200)
})
// Send result to deploy client (view over here)
app.get('/poll', (req, res) => res.render("poll"))

app.get('/poll-update', function(req, res){

})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
