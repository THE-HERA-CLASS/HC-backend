require('dotenv').config();

// Redis를 위한 유틸 함수 작성
// Redis에 Refresh Token을 저장할 것이기 때문에, 미리 Redis를 셋팅

// Redis 클라이언트 생성 'redis'모듈을 사용하여 Redis클라이언트 생성
class RedisClientRepository {
  constructor(redis) {
    this.redisClient = redis.createClient({
      url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
      legacyMode: true, // 이전 버전의 Redis와의 호환성 유지
    });
    // this.redisConnected = false;
  }
  
  // Redis가 클라이언트와 제대로 연결이 되었는지 확인하고 초기화하는 메서드
  initialize = async () => {
    this.redisClient.on('connect', () => {
      // 연결 성공
      this.redisConnected = true; // 플래그를 true로 설정
      console.info('Redis connected!');
    });
    this.redisClient.on('error', (err) => {
      // 연결 실패
      console.error('Redis Client Error', err);
    });
    if (!this.redisConnected) {
      // Redis 서버와 연결 시도하기
      this.redisClient.connect().then();
    }
  };

  // 특정 키에 대한 값을 Redis 데이터베이스에 설정하고, 그 키의 만료 시간을 설정하는 메서드
  setData = async (key, value, EXPIRE_TIME) => {
    await this.initialize(); // initialize 호출, Redis 서버와의 연결 상태를 확인하고, 비연결상태일시 새로운 연결을 생성
    await this.redisClient.v4.set(key, value, 'keepttl'); // keepttl 옵션은 이전에 설정된 TTL(Time To Live 즉, 데이터의 만료 시간)을 유지하는 옵션
    await this.redisClient.v4.expire(key, EXPIRE_TIME); // EXPIRE_TIME: 만료시간
  };

  // Redis 서버에서 특정 키 (Key)를 가져온다
  getData = async (key) => {
    await this.initialize();
    return await this.redisClient.v4.get(key);
  };

  delData = async (key) => {
    await this.initialize(); // Redis 클라이언트가 제대로 연결되어 있는지 확인하고 초기화하는 메서드
    await this.redisClient.v4.del(key); // 특정 키 (Key)와 연관된 데이터를 삭제
    return 1; // 1를 리턴 성공적으로 작업이 수행됬을때를 나타냄
  };
}

module.exports = RedisClientRepository;
