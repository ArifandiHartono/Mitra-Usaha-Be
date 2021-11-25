const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const baseConfiguration = require('../config');

const config = baseConfiguration.db[baseConfiguration.app.env === 'test' ? 'test' : 'default'];

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
