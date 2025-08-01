
require("dotenv").config();
const { PORT, HOST } = process.env;
const { server } = require("./src/App.js");
const { BDinstance } = require("./src/db/db.js");
require('./src/db/db.js')

server.listen(PORT, HOST, async () => {
  try {
    BDinstance
      .sync({ alter: true })
      .then(async () => {
        console.info("./index.js", `✡ Servidor corriendo en ${HOST}:${PORT}`);
      })

      .catch((e) => {
        console.error(e.message);
      });
  } catch (e) {
    console.error("Error!", e.message);
  }
});
