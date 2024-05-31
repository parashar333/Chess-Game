var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

// socket server
var io = require('socket.io')(http, {
    //specifying CORS
    cors: {
        origin: "*",
    }
});

io.on('connection', function(socket) {
    console.log('new connection');

    //calls when socket move method is called by the client
    socket.on('move', function(msg) {
        socket.broadcast.emit('move', msg);
    });
});

app.get('/api/data', (req, res) => {
    // Handle the request, fetch data, and send a response
    res.json({ message: 'Hello from Express!' });
  });

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/default.html')
});

http.listen(port, function(){
    console.log('listening on *: ' + port)
})