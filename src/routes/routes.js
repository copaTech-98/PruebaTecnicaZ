const { Router } = require("express");
const { HistorialPaso } = require("../models/HistorialPaso");
const { Paso } = require("../models/Paso");

router.get('/historial', async (req, res, next) => {
    try {
      const historial = await HistorialPaso.findAll({ order: [['fecha', 'DESC']] });
      res.json(historial);
    } catch (err) {
      next(err);
    }
  });

router.post('/pasos', async (req, res, next) => {
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
router.get('/historial', async (req, res, next) => {
    try {
      const historial = await HistorialPaso.findAll({ order: [['fecha', 'DESC']] });
      res.json(historial);
    } catch (err) {
      next(err);
    }
  });
const router = Router();


module.exports = router;
