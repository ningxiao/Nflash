var io = require('socket.io').listen(8888);
var chat = io
  .of('/handle')
  .on('connection', function (socket) {
    socket.on('handle', function(data) {
        socket.broadcast.emit('acceptHandle', data);
    });  
  });
