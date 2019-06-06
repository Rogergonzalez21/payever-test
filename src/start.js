/* eslint no-console: off */
require('dotenv').config();

// Start our app!
const app = require('./app');

let port;

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT;
} else {
  port = process.env.PORT;
}

app.set('port', port || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

module.exports = server;
