module.exports = {
  PING_INTERVAL_MS: 30_000,       // 30 seconds
  PONG_TIMEOUT_MS: 10_000,        // 10 seconds
  TURN_AUTH_SECRET: 'YOURAUTHSECRET',  // Must match your turnserver.conf
  TURN_SERVER_URLS: [
    'stun:stun.l.google.com:19302',
    'turn:YOURDOMAIN:3480?transport=udp',
    'turn:YOURDOMAIN:3480?transport=tcp'
  ]
};