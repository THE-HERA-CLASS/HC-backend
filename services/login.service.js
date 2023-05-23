const RedisClientRepository = require('../repositories/redis.repository.js');

class LoginService {
  redisClientRepository = new RedisClientRepository();
}

module.exports = LoginService;
