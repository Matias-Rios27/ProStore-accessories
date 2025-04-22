document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoItems = document.querySelectorAll("#carritoItems");
    const totalCarrito = document.querySelectorAll("#totalCarrito");
    const subtotalSpan = document.getElementById("subtotal");
    const envioSpan = document.getElementById("envio");
    const totalCarritoFinal = document.getElementById("totalCarritoFinal");
    const envio = 5000;
  
    // Función para formatear el precio en CLP (peso chileno)
    const formatearPrecioCLP = (precio) => {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio);
    };
  
    function renderizarCarrito() {
      let subtotal = 0;
  
      carritoItems.forEach(lista => lista.innerHTML = "");
  
      carrito.forEach((producto, index) => {
        subtotal += producto.precio;
  
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
            <span>${producto.nombre} - ${formatearPrecioCLP(producto.precio)}</span>
          </div>
          <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
        `;
  
        carritoItems.forEach(lista => lista.appendChild(item));
      });
  
      totalCarrito.forEach(el => el.textContent = formatearPrecioCLP(subtotal));
  
      if (subtotalSpan) subtotalSpan.textContent = formatearPrecioCLP(subtotal);
      if (envioSpan) envioSpan.textContent = formatearPrecioCLP(envio);
      if (totalCarritoFinal) totalCarritoFinal.textContent = formatearPrecioCLP(subtotal + envio);
    }
  
    window.eliminarDelCarrito = function(index) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    };
  
    window.finalizarCompra = function() {
      alert("¡Gracias por tu compra!");
      localStorage.removeItem("carrito");
      location.reload();
    };
  
    renderizarCarrito();
  });
  