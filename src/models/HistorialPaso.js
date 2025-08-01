const {BDinstance} = require('../db.js');

const HistorialPaso = BDinstance.define('HistorialPaso', {
    paso_id: DataTypes.INTEGER,
    accion: DataTypes.STRING,
    hash_anterior: DataTypes.STRING,
    hash_actual: DataTypes.STRING,
  }, { tableName: 'historial_pasos', timestamps: true, createdAt: 'fecha', updatedAt: false });
  
  module.exports = { HistorialPaso };