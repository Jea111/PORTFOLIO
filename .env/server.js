const express = require("express");
const bodyParser = require("body-parser");
const pedidosRoutes = require("./routes/pedidos");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/pedidos", pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
