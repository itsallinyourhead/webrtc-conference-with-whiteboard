const config = require('./conference-config');
const crypto = require('crypto');
const http = require('http');
const WebSocket = require('ws');
const { LRUCache } = require('lru-cache');

// Make imported config variables global (if really needed)
for (const key in config) {
  global[key] = config[key];
}

// Safety constants
const MAX_BUFFERED_MESSAGES_PER_USER = 40;
const MAX_BUFFERED_USERS_PER_ROOM = 25;
const BUFFER_TTL_MS = 10 * 60 * 1000; // 10 minutes
const PING_INTERVAL_MS = 30 * 1000;

// Generate ICE servers
function buildTurnIceServers(username, credential) {
  return TURN_SERVER_URLS.map(url => {
    if (url.startsWith('stun:')) {
      return { urls: url };
    }
    return {
      credential,
      urls: url,
      username,
    };
  });
}

// HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/api/get-turn-credentials' && req.method === 'GET') {
    const userId = 'user-' + Math.floor(Math.random() * 100000);
    const credentials = generateTurnCredentials(userId, TURN_AUTH_SECRET);

    const responseData = {
      iceServers: buildTurnIceServers(credentials.username, credentials.credential)
    };

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(responseData));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

// Generate TURN credentials
function generateTurnCredentials(userId, secret) {
  const ttl = 3600;
  const timestamp = Math.floor(Date.now() / 1000) + ttl;
  const username = `${timestamp}:${userId}`;
  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(username);
  const credential = hmac.digest('base64');
  return { username, credential };
}

// State
let idCounter = 1;
const rooms = {}; // roomId → { peers: [], bufferedCandidates: LRUCache }

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {
  let userId;
  const createUserId = () => {
    userId = idCounter++;
    if (idCounter >= Number.MAX_SAFE_INTEGER - 1000) idCounter = 1;
    socket.send(JSON.stringify({ type: 'userId', userId }));
  };
  createUserId();

  socket.isAlive = true;
  let roomId = null;

  const leaveRoom = () => {
    if (!roomId || !rooms[roomId]) return;

    const room = rooms[roomId];
    room.peers = room.peers.filter(peer => peer.socket !== socket);

    room.peers.forEach(peer => {
      if (peer.socket.readyState === WebSocket.OPEN) {
        peer.socket.send(JSON.stringify({
          partnerId: userId,
          type: 'peerDisconnected'
        }));
      }
    });

    if (room.peers.length === 0) {
      delete rooms[roomId];
    }
  };

  socket.on('close', leaveRoom);

  socket.on('error', err => {
    console.error(`Socket error for user ${userId} in room ${roomId}:`, err.message);
  });

  socket.on('message', message => {
    socket.isAlive = true;

    let msg;
    try {
      msg = JSON.parse(message);
    } catch {
      return;
    }

    if (msg.type === 'heartbeat') return;

    if (msg.type === 'join') {
      if (typeof msg.room !== 'string') return;

      if (roomId) {
        leaveRoom();
        createUserId();
      }

      roomId = msg.room;

      if (!rooms[roomId]) {
        rooms[roomId] = {
          peers: [],
          bufferedCandidates: new LRUCache({
            max: MAX_BUFFERED_USERS_PER_ROOM,
            ttl: BUFFER_TTL_MS,
            updateAgeOnGet: true,     // refresh TTL when accessed
            dispose: (value, key) => {
              console.log(`Expired buffered candidates for user ${key} in room ${roomId}`);
            }
          })
        };
      }

      const room = rooms[roomId];

      if (!room.peers.some(p => p.socket === socket)) {
        room.peers.push({ socket, userId });
      }

      room.peers.forEach(peer => {
        if (peer.socket !== socket && peer.socket.readyState === WebSocket.OPEN) {
          peer.socket.send(JSON.stringify({
            partnerId: userId,
            type: 'peerJoined'
          }));
        }
      });

      // Send and remove buffered messages
      if (room.bufferedCandidates.has(userId)) {
        const messages = room.bufferedCandidates.get(userId);
        messages.forEach(m => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(m));
          }
        });
        room.bufferedCandidates.delete(userId);
      }

      return;
    }

    if (!roomId || !rooms[roomId]) return;

    const room = rooms[roomId];
    msg.partnerId = userId;

    if (msg.targetId) {
      const targetId = msg.targetId;
      delete msg.targetId;

      const targetPeer = room.peers.find(p => p.userId === targetId);

      if (targetPeer && targetPeer.socket.readyState === WebSocket.OPEN) {
        targetPeer.socket.send(JSON.stringify(msg));
      } else {
        // Buffer with limits
        let messages = room.bufferedCandidates.get(targetId);
        if (!messages) {
          messages = [];
          room.bufferedCandidates.set(targetId, messages);
        }

        messages.push(msg);

        // Keep only the most recent messages
        if (messages.length > MAX_BUFFERED_MESSAGES_PER_USER) {
          messages.shift();
        }
      }
    } else {
      // Broadcast
      room.peers.forEach(peer => {
        if (peer.socket !== socket && peer.socket.readyState === WebSocket.OPEN) {
          peer.socket.send(JSON.stringify(msg));
        }
      });
    }
  });

  socket.on('pong', () => {
    socket.isAlive = true;
  });
});

// Heartbeat
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, PING_INTERVAL_MS);

// Cleanup on server close
wss.on('close', () => {
  clearInterval(heartbeatInterval);
});

server.listen(3001, () => {
  console.log('Server started on http://localhost:3001 and ws://localhost:3001');
});