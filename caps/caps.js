'use strict';
const net = require('net');
const server = net.createServer();
const port = process.env.PORT || 4000;
server.listen(port, ()=> console.log(`server is running on ${port}`));
let socketPool = {};
server.on('connection', (socket)=> {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', buffer => {
    let msg = JSON.parse(buffer.toString());
    if(msg.event && msg.payload){
      console.log( msg); 
      broadcast(msg);
    }else{
      console.log('bad data');
    }
  });
  server.on('error', (e)=> {
    console.log('ERROR !!!!!!! ', e);
  });
  server.on('close', ()=> {
    delete socketPool[id];
  });
});
function broadcast(msg) {
  let payload = JSON.stringify(msg);
  for (let id in socketPool) {
    socketPool[id].write(payload);
  }
}