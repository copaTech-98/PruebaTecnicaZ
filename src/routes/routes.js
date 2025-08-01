const { Router } = require("express");
const { Paso, HistorialPaso } = require("../db/db");
const { generateHash } = require("../utils/GenerateHash");

const router = Router();

router.get("/historial", async (req, res, next) => {
  try {
    const historial = await HistorialPaso.findAll({
      order: [["fecha", "DESC"]],
    });
    res.json(historial);
  } catch (err) {
    next(err);
  }
});
router.get("/pasos", async (req, res) => {
  try {
    const result = await Paso.findAll()
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pasos" });
  }
});
router.post("/pasos", async (req, res, next) => {
  const { nombre, descripcion, orden } = req.body;
  try {
    const ultimo = await Paso.findOne({ order: [["id", "DESC"]] });
    const hashAnterior = ultimo?.hash || "";
    const hash = generateHash({ nombre, descripcion, orden }, hashAnterior);

    const nuevoPaso = await Paso.create({ nombre, descripcion, orden, hash });

    await HistorialPaso.create({
      paso_id: nuevoPaso.id,
      accion: "CREADO",
      hash_anterior: hashAnterior,
      hash_actual: hash,
    });

    res.json(nuevoPaso);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
