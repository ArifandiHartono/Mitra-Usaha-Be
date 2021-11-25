module.exports = {
  default: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER,
    logging: process.env.SQL_LOG === 'true' || false,

    // only used when dialect is sqlite
    storage: process.env.DB_DATABASE,

    // storage to save information of seeder has been run
    seederStorage: 'sequelize',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
};
