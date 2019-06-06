const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressWinston = require('express-winston');

const errorHandlers = require('./utils/errorHandlers');
const { winstonConfig } = require('./utils/config');
const appRoutes = require('./routes/app');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  app.use(expressWinston.logger(winstonConfig));
}

app.use('/', appRoutes);

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  app.use(expressWinston.errorLogger(winstonConfig));
}

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

app.use(errorHandlers.productionErrors);

module.exports = app;
