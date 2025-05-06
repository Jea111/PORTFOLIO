// 🌙/☀️ Modo oscuro
const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("red-background");
  toggleButton.textContent = toggleButton.textContent === "🌙" ? "☀️" : "🌙";
});

// Alerta de bienvenida
swal(
  "Bienvenido a la tienda de productos",
  "¡Explora nuestros productos!",
  "info"
);

// 🛒 Carrito
const botonesAgregar = document.querySelectorAll(".btnAgregar");
const carrito = [];
const contenedorCarrito = document.querySelector(".productos-carrito");
const totalElementos = document.getElementById("totalPrecio");

function agregarProducto(nombre, precio) {
  const existente = carrito.find((item) => item.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
}

function actualizarCarrito() {
  contenedorCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const productoHTML = document.createElement("li");
    productoHTML.textContent = `${item.nombre} x${item.cantidad}: $${(
      item.precio * item.cantidad
    ).toLocaleString()}`;
    contenedorCarrito.appendChild(productoHTML);
    total += item.precio * item.cantidad;
  });

  totalElementos.textContent = `$${total.toLocaleString()}`;
}

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const producto = e.target.closest(".producto");
    const nombre = producto.querySelector("h2").textContent;
    const precio = parseFloat(producto.dataset.precio);
    agregarProducto(nombre, precio);
    swal(`Agregaste ${nombre} $${precio} al carrito`);
    actualizarCarrito();
  });
});

const btnFinish = document.getElementById("btnFinish");

btnFinish.addEventListener("click", async () => {
  if (carrito.length === 0) {
    swal("El carrito está vacío", "Agrega productos para continuar", "error");
    return;
  }

  const productos = carrito
    .map((item) => `${item.nombre} x${item.cantidad}`)
    .join(", ");
  const precio = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  try {
    // Enviar pedido al backend
    const respuesta = await fetch("/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productos: carrito }), // perfecto
    });

    if (!respuesta.ok) throw new Error("Error al enviar pedido");

    swal(
      `Gracias por tu compra de ${productos}. Total: $${precio.toLocaleString()}`,
      "Te esperamos pronto",
      "success"
    );

    // Limpiar carrito después de enviar
    carrito.length = 0;
    actualizarCarrito();
  } catch (error) {
    console.error("Error:", error);
    swal("Error", "No se pudo registrar tu compra", "error");
  }
});
