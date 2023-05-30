import crypto from 'crypto';
import dbClient from '../utils/db';

function hashPassword(password) {
  const sha1Hash = crypto.createHash('sha1');
  sha1Hash.update(password);
  const hashedPassword = sha1Hash.digest('hex');
  return hashedPassword;
}

const UsersControllers = {
  postNew(req, res) {
    const { email, password } = req.params;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }
    const users = dbClient.db.collection('users');
    users.find({ email }).toArray((_, result) => {
      if (result) {
        res.status(400).json({ error: 'Already exist' });
      }
    });
    const user = { email, password: hashPassword(password) };
        dbClient.db.collection('users').insertOne(user, (err, res) => { 
            if (err) console.log(err)
            
    });
  },
};

module.exports = UsersControllers;
