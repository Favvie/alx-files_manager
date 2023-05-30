const { MongoClient, ServerApiVersion } = require('mongodb');

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || '127.0.0.1';
    const DB_PORT = process.env.DB_PORT || 27017;
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(DB_DATABASE);
    // this.db = this.client.db(DB_DATABASE);
  }

  async isAlive() {
    try {
      this.db.command({ ping: 1 });
      return true;
    } catch (err) {
      console.log('is alive error');
      return false;
    }
  }

  async nbUsers() {
    try {
      const users = this.db.collection('users');
      const value = await users.countDocuments({});
      return value;
    } catch (err) {
      console.log('user collection error', err);
      return err;
    }
  }

  async nbFiles() {
    try {
      const files = this.db.collection('files');
      const value = await files.countDocuments({});
      return value;
    } catch (err) {
      console.log('user collection error', err);
      return err;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
