await fetch("http://localhost:3000/api/guardar-pedido", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ productos: carrito }),
});
//   swal("Pedido realizado", "Gracias por tu compra", "success");
//   carrito.length = 0;
