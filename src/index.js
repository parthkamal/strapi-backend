  'use strict';
  const socketIo = require('socket.io');

  module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     */
    register({ strapi }) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     */
    async bootstrap({ strapi }) {

      // @ts-ignore
      const io = socketIo(strapi.server.httpServer, {
        cors: { origin: "*", methods: ["GET", "POST", "PUT"]},
        credential: true,
      })
      


      strapi.io = io;

      io.on('connection', (/** @type {{ on: (arg0: string, arg1: { (msg: any): void; (): void; }) => void; emit: (arg0: string, arg1: any) => void; }} */ socket) => {
        console.log('a user connected');

        socket.on('message', (/** @type {any} */ msg) => {
          console.log('message received:', msg);
          let {user, text} = msg ; 
          text = `from server : ${text}`
          io.emit('message', {user, text}); // Echo the message
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    }


  };
