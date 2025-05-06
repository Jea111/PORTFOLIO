const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Configura tu conexión con la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia si usas otro usuario
  password: "", // Cambia si tienes contraseña
  database: "carrito_db", // Asegúrate de tener esta base creada
});

// Ruta para guardar pedidos
router.post("/", (req, res) => {
  const { carrito, total } = req.body;

  if (!carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Carrito vacío" });
  }

  // Insertar pedido (tabla "pedidos")
  const sqlPedido = "INSERT INTO pedidos (total) VALUES (?)";

  connection.query(sqlPedido, [total], (err, result) => {
    if (err) {
      console.error("Error al insertar pedido:", err);
      return res.status(500).json({ error: "Error al guardar el pedido" });
    }

    const pedidoId = result.insertId;

    // Insertar productos del pedido (tabla "pedido_productos")
    const valores = carrito.map((item) => [
      pedidoId,
      item.nombre,
      item.precio,
      item.cantidad,
    ]);

    const sqlProductos = `
      INSERT INTO pedido_productos (pedido_id, nombre, precio, cantidad)
      VALUES ?
    `;

    connection.query(sqlProductos, [valores], (err2) => {
      if (err2) {
        console.error("Error al insertar productos:", err2);
        return res
          .status(500)
          .json({ error: "Error al guardar los productos" });
      }

      res.status(200).json({ mensaje: "Pedido guardado con éxito" });
    });
  });
});

module.exports = router;
