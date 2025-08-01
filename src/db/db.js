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

module.exports = {
  ...sequelize.models,
  BDinstance: sequelize,
}
