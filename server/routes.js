router.post("/", (req, res) => {
  const { carrito } = req.body;

  carrito.forEach((prod) => {
    const sql = "INSERT INTO pedidos (nombre, precio) VALUES (?, ?)";
    db.query(sql, [prod.nombre, prod.precio], (err) => {
      if (err) throw err;
    });
  });

  res.json({ ok: true, mensaje: "Pedido guardado con éxito" });
});
