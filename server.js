const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').load();
var r = require('rethinkdb')
var rdb = require("./lib/rethink")


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// console.log()

var connection = null;
// r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//     if (err) throw err;
//     connection = conn;
//     r.db('test').tableCreate('authors').run(connection, function(err, result) {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
// })
// })

app.get('/', (req, res) => res.send('Hello World!'))
// db connection, no frontend, only respons

// 2 actions

// Accept form (form with data posted to express app)
app.post('/vote', function(req, res){
    console.log(req.body)
    rdb.save('vote',req.body)
    res.send("voted")
})
// Send result to deploy client (view over here)
app.get('/poll', function(req, res){
    // r.table('vote').group('group1').count();
    // r.table('vote').group('group2').count();
    // r.table('vote').group('group3').count();
    res.render("poll")
})

app.get('/poll-update', function(req, res){

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
