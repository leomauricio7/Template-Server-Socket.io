var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/',(req, res)=> {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

let messages = [];
io.on('connection',(socket) => {
  console.log('a user connected: ' + socket.id);

  // for (i in messages) {
  //   io.emit('chat message', messages[i]);
  //   // socket.broadcast.emit('chat message', messages[i]);
  // }
  socket.on('api',(data) => {
    console.log(data);
    io.emit('api', data);
  });

  socket.on('chat message',(msg) => {
    console.log('message: ' + msg);
    messages.push(msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect',() => {
    console.log('user disconnected');
  });

});

http.listen(3000,() => {
  console.log('listening on *:3000');
});