const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;

const duration = '1h';

exports.generate = (username) => {
  return jwt.sign({username: username}, privateKey, {expiresIn: duration});
};

exports.validate = (session) => {
  try {
    const decodedSession = jwt.verify(session, privateKey);
    return { username: decodedSession.username };
  } catch (error) {
    return null;
  }
};
