var express = require('express')
var app = express()
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

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/default.html')
});

http.listen(port, function(){
    console.log('listening on *: ' + port)
})