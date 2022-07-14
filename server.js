
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', client => {
  client.on('message', (message,isBinary) => {
    [...wss.clients]
      .filter(c => c !== client)
      .forEach(c => c.send(isBinary ? message.toString() : message));
  });
});

server.listen(port, function() {
    console.log(`Server is listening on ${port}!`)
  })