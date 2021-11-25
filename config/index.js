const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('./db');

module.exports = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    password_salt: 12,
  },
  db,
  log: {
    level: process.env.LOG_LEVEL,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXP_TOKEN,
  },
  sendgrid: {
    key: process.env.SENDGRID_API_KEY,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PASS,
  },
  frontend: {
    web: {
      host: process.env.WEB_CLIENT_HOST,
    },
  },

  kafka: {
    host: process.env.KAFKA_HOST,
    topic: {
      stream: process.env.KAFKA_TOPIC_STREAM,
    },
    username: process.env.KAFKA_USERNAME,
    userpwd: process.env.KAFKA_PASSWORD,
  },
  aws: {
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
  },
  recognition: {
    register: process.env.API_RECOGNITION_REGISTER,
    delete: process.env.API_RECOGNITION_DELETE,
  },
  oauth: {
    google_client: process.env.GOOGLE_CLIENT_ID,
    google_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
