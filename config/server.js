const strapi = require('@strapi/strapi');
const http = require('http');
const socketIo = require('socket.io');

(async () => {
  // Initialize Strapi
  const strapiInstance = strapi();
  await strapiInstance.load();

  // Create an HTTP server with Strapi's Koa app
  const server = http.createServer(strapiInstance.server);

  // Initialize Socket.IO
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
      console.log('message received:', msg);
      socket.emit('message', msg); // Echo the message
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // Start the server)
  server.listen(strapi.config.server.port, strapi.config.server.host, () => {
    console.log(`Server is running on http://${strapi.config.server.host}:${strapi.config.server.port}`);
  });
})();
