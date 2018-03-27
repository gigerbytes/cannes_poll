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
  socket.on('vote', function(msg){
    io.emit('chat message', msg);
  });
});

/// initialize

r.connect({db:"test"}).then(function(conn){
    r.db('test').tableCreate('vote').run(conn, function(){
        console.log('hello')
    })

    r.table('vote').changes().run(conn, function(err, cursor){
        // io.emit("vote", item)
    })
})

// 2 actions

// Accept form (form with data posted to express app)
app.post('/vote', function(req, res){
    console.log(req.body)

    code = req.body.code
    group1 = req.body.group1
    group2 = req.body.group2
    group3 = req.body.group3

    datObj = {
        'code' : req.body.code,
        'PIECES' : 0,
        'Unigay' : 0,
        'MUN':0,
        'Orchestra':0,
        'Chess_Club':0,
        'Student_Theater':0,
        'Student_Impact':0,
        'IGNITE':0,
        'Oikos':0
    }

    datObj[req.body.group1] = 1
    datObj[req.body.group2] = 1
    datObj[req.body.group3] =1

    rdb.save('vote',datObj)
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
