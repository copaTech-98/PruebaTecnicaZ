const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const {logError} = require('../utils/logError');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    logError(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
  const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
      logging: false,
      native: false,
    }
  );
  
  app.get('/pasos', async (req, res, next) => {
    try {
      const pasos = await Paso.findAll({ order: [['orden', 'ASC']] });
      res.json(pasos);
    } catch (err) {
      next(err);
    }
  });
  app.post('/pasos', async (req, res, next) => {
    const { nombre, descripcion, orden } = req.body;
    try {
      const ultimo = await Paso.findOne({ order: [['id', 'DESC']] });
      const hashAnterior = ultimo?.hash || '';
      const hash = generarHash({ nombre, descripcion, orden }, hashAnterior);
  
      const nuevoPaso = await Paso.create({ nombre, descripcion, orden, hash });
  
      await HistorialPaso.create({
        paso_id: nuevoPaso.id,
        accion: 'CREADO',
        hash_anterior: hashAnterior,
        hash_actual: hash
      });
  
      res.json(nuevoPaso);
    } catch (err) {
      next(err);
    }
  });
  app.get('/historial', async (req, res, next) => {
    try {
      const historial = await HistorialPaso.findAll({ order: [['fecha', 'DESC']] });
      res.json(historial);
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = {
    server: app,
    BDinstance: sequelize
  }
