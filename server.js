var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var router = require('./app/routes/router');
var path = require('path');

app.use(bodyParser.json());
//app.use('/', router);
app.use('/public', express.static('public'));


app.get('/',function(req,res){

  // res.sendFile(path.join(__dirname+'/Index.html'));
  res.sendFile(path.join(__dirname+'/public/Webpage/html/Blackboard.html'));

});

app.use(express.static('public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('join room', function(room) {
    socket.join(room);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('points', function(msg){
    io.to(msg[2]).emit('points',msg);
  });

  socket.on('clear', function(msg){
    io.to(msg).emit('clear', msg);
  });

});
