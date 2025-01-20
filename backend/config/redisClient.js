const Redis = require('ioredis');

const redis = new Redis({
  host: 'redis',
  port: process.env.REDIS_PORT || 6379,
});

redis.on('error', (err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

module.exports = redis;
