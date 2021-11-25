const app = require('./app');
const config = require('./config');

const port = config.app.port || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`program running on port ${port}`);
});
