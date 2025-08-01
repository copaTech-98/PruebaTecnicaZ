const crypto = require("crypto");
module.exports = {
  generateHash: (datos, hashAnterior = "") => {
    const contenido = JSON.stringify(datos) + hashAnterior;
    return crypto.createHash("sha256").update(contenido).digest("hex");
  },
};
