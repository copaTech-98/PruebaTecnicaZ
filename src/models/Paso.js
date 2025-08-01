const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Paso", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
    orden: DataTypes.INTEGER,
    hash: DataTypes.STRING,
  }, { tableName: 'pasos', timestamps: true, createdAt: 'fecha', updatedAt: false });
};
