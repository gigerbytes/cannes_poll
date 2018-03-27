const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
var r = require('rethinkdb')
var rdb = require("./lib/rethink")


// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.use("/public", express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})
// db connection, no frontend, only respons
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
    

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

http.listen(3000, () => console.log('Example app listening on port 3000!'))
