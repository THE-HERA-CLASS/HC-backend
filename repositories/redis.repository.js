require('dotenv').config();

class RedisClientRepository {
  constructor(redis) {
    this.redisClient = redis.createClient({
      url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
      legacyMode: true, // 이전 버전의 Redis와의 호환성 유지
    });
    this.initialize(); // 인스턴스화 시 연결 초기화
  }

  // Redis가 클라이언트와 제대로 연결이 되었는지 확인하고 초기화하는 메서드
  async initialize() {
    this.redisClient.on('connect', () => {
      // 연결 성공
      console.info('Redis connected!');
    });
    this.redisClient.on('error', (error) => {
      // 연결 실패
      console.error('Redis Client 실패', error);
    });
    try {
      // Redis 서버와 연결 시도하기
      await this.redisClient.connect();
    } catch (error) {
      console.error('Redis Connection 실패', error);
    }
  }

  // 특정 키에 대한 값을 Redis 데이터베이스에 설정하고, 그 키의 만료 시간을 설정하는 메서드
  async setData(key, value, EXPIRE_TIME) {
    try {
      await this.redisClient.v4.set(String(key), value, 'keepttl');
      await this.redisClient.v4.expire(String(key), Number(EXPIRE_TIME)); // EXPIRE_TIME: 만료시간
    } catch (error) {
      console.error('Redis setData 실패', error);
      throw error; // Error를 상위로 전파
    }
  }

  // Redis 서버에서 특정 키 (Key)를 가져온다
  async getData(key) {
    try {
      return await this.redisClient.v4.get(key);
    } catch (error) {
      console.error('Redis getData 실패', error);
      throw error; // Error를 상위로 전파
    }
  }

  // 특정 키 (Key)를 삭제한다
  async deleteData(key) {
    try {
      await this.redisClient.v4.del(key);
      return 1; // 성공적으로 작업 수행 표시
    } catch (error) {
      console.error('Redis deleteData 실패', error);
      throw error; // Error를 상위로 전파
    }
  }
}

module.exports = RedisClientRepository;
