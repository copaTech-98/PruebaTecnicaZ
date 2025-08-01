const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logError = require('./utils/logError');
const router = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  logError(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use(router);

module.exports = {
  server: app,
}
