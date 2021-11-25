const { member } = require('../models');

module.exports = {
  findByEmail(email) {
    return member.findOne({ where: { email } });
  },

  findByGoogleId(googleId) {
    return member.findOne({ where: { googleId } });
  },

  findById(id) {
    return member.findByPk(id);
  },

  findByUsername(username) {
    return member.findOne({ where: { username } });
  },
};
