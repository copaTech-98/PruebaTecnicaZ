const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("HistorialPaso", {
    paso_id: DataTypes.INTEGER,
    accion: DataTypes.STRING,
    hash_anterior: DataTypes.STRING,
    hash_actual: DataTypes.STRING,
  }, { 
    tableName: 'historial_pasos', 
    timestamps: true, 
    createdAt: 'fecha', 
    updatedAt: false 
  });
};

