const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({ port: 9000 });

const sessions = new Map();

class Session {
  constructor(id) {
    this.id = id;
  }
}

function createId(len = 6, chars = 'abcdefghjkmnopqrstwxyz0123456789') {
  let id = '';
  while (len--) {
    id += chars[(Math.random() * chars.length) | 0];
  }
  return id;
}

server.on('connection', conn => {
  console.log('Connection established');

  conn.on('message', msg => {
    console.log('Message received:', msg);

    if (msg === 'create-session') {
      const session = new Session(createId());
      sessions.set(session.id, session);
      console.log(sessions);
    }
  });
  conn.on('close', () => {
    console.log('Connection closed');
  });
});
