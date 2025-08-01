const { BDinstance } = require("../db/db");

const Paso = BDinstance.define('Paso', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
    orden: DataTypes.INTEGER,
    hash: DataTypes.STRING,
  }, { tableName: 'pasos', timestamps: true, createdAt: 'fecha', updatedAt: false });

module.exports = { Paso }