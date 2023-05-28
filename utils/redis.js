import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.log(error);
    });
    // this.client.on('connect', () => console.log('connected'));
  }

  isAlive() {
    try {
      this.client.ping();
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  async get(key) {
    const asynGet = promisify(this.client.get).bind(this.client);
    const value = await asynGet(key);
    return value;
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.set).bind(this.client);
    try {
      await asyncSet(key, value, 'EX', duration);
    } catch (err) {
      console.log('setting error', err);
    }
  }

  // async del(key) {
  //     await client.del(key)
  // }
}

const redisClient = new RedisClient();

export default redisClient;
