const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carrito_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

// consulta a la base de datos
const pedidos = "SELECT * FROM `pedidos`";

connection.query(pedidos, (err, list) => {
  if (err) throw err;
  console.log("lista de pedidos: " + pedidos);
});

module.exports = connection;
