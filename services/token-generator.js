const jwt = require('jsonwebtoken');

const tokenGenerator = (id, secretKey, expiresIn) => {
  return jwt.sign({ user: { id } }, secretKey, { expiresIn });
};

module.exports = tokenGenerator;
