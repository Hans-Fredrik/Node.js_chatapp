/**
 * Created by Hans Fredrik on 27.11.2014.
 */
var app = require("http").createServer(handler),
    io = require("socket.io").listen(app),
    fs = require("fs");

app.listen(1234);

var counter = 0;

// Get frontend site?
function handler(req, res) {
    fs.readFile(__dirname + '/thaview.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {
    //when recieving the data from the server, push the same message to client

    socket.on('clickEvent', function(data){
        // same client
        socket.emit('clickEvent', data.color);
        // all clients
        socket.broadcast.emit('clickEvent', data.color);
    });

});