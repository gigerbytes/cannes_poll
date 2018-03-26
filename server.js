const express = require('express')
const path = require('path')
const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => res.send('Hello World!'))
// db connection, no frontend, only respons

// 2 actions

// Accept form (form with data posted to express app)

// Send result to deploy client (view over here)
app.get('/poll', (req, res) => res.render("poll"))

app.get('/poll-update', function(req, res){

})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
