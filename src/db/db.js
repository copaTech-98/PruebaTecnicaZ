const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { logError } = require('../utils/logError');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);


const modelsPath = path.join(__dirname, '..', 'models');
fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const modelDefiner = require(path.join(modelsPath, file));
    modelDefiner(sequelize); 
  });

const { models } = sequelize;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  logError(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const router = require('../routes/routes');
app.use(router);


module.exports = {
  server: app,
  BDinstance: sequelize,
  models: sequelize.models
}
