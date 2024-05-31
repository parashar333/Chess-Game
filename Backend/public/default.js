var board;
var game;

window.onload = function () {
    initGame();
};

//setup socket client
var socket = io();

var initGame = function () {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop : handleMove,
    };

    board = new ChessBoard('gameBoard', cfg)
    game = new Chess();
}

var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});

    if (move === null) return 'snapback';
    else socket.emit("move", move);
};

//calls when socket broadcast is called by the server
socket.on('move', function(msg) {
    game.move(msg);
    board.position(game.fen()); //fen is board layout
})