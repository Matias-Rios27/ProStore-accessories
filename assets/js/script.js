document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];
    const carritoElement = document.getElementById("carrito");
    const carritoItems = document.getElementById("carritoItems");
    const totalCarrito = document.getElementById("totalCarrito");

    document.querySelectorAll(".btn-agregar").forEach((boton) => {
      boton.addEventListener("click", (event) => {
        const productoCard = event.target.closest(".card");
        const nombre = productoCard.querySelector("[data-nombre]").getAttribute("data-nombre");
        const precio = parseFloat(productoCard.querySelector("[data-precio]").getAttribute("data-precio"));
        const imagen = productoCard.querySelector("[data-imagen]").getAttribute("data-imagen");
        agregarAlCarrito(nombre, precio);

        mostrarCarrito();
      });
    });

    function agregarAlCarrito(nombre, precio, imagen) {
      carrito.push({ nombre, precio, imagen });
      actualizarCarrito();
    }

    function actualizarCarrito() {
      carritoItems.innerHTML = ""; 
      let total = 0;
  
      carrito.forEach((producto, index) => {
        total += producto.precio;
  
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
          <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
        </div>
        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
      `;
        carritoItems.appendChild(item);
      });
  
      totalCarrito.textContent = `$${total.toFixed(2)}`;
    }

    window.eliminarDelCarrito = function (index) {
      carrito.splice(index, 1);
      actualizarCarrito();
    };

    function mostrarCarrito() {
        carritoElement.classList.add("visible");
        setTimeout(() => {
          carritoElement.classList.remove("visible"); 
        }, 5000); 
      }
  });

 