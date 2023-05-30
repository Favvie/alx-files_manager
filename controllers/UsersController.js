import crypto from 'crypto';
import dbClient from '../utils/db';

function hashPassword(password) {
  const sha1Hash = crypto.createHash('sha1');
  sha1Hash.update(password);
  const hashedPassword = sha1Hash.digest('hex');
  return hashedPassword;
}

// function findUser(email) {
//   const users = dbClient.db.collection('users');
//   const user = users.find({ email });
//   return user;
// }

const UsersControllers = {
  postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }
    const users = dbClient.db.collection('users');
    users.find({ email }).toArray((err, result) => {
      if (err) console.log(err);
      if (result) {
        res.status(400).json({ error: 'Already exist' });
      } else {
        const user = { email, password: hashPassword(password) };
        dbClient.db.collection('users').insertOne(user, (err, resp) => {
          if (err) console.log('insertion', err);
          res.status(201).json({ email, id: resp.insertedId });
        });
      }
    });
  },
};

module.exports = UsersControllers;
