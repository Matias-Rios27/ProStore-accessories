document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoElement = document.getElementById("carritoCompras");
  const carritoItems = document.getElementById("carritoItems");
  const totalCarrito = document.getElementById("totalCarrito");
  const mensajeCarrito = document.getElementById("mensajeCarrito");

  function agregarProductoAlCarrito(productoCard) {
    const nombre = productoCard.querySelector("[data-nombre]").getAttribute("data-nombre");
    const precio = parseFloat(productoCard.querySelector("[data-precio]").getAttribute("data-precio"));
    const imagen = productoCard.querySelector("img").getAttribute("src");
    
    carrito.push({ nombre, precio, imagen });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    mostrarCarrito();
    mostrarMensajeCarrito();
  }

  document.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const productoCard = event.target.closest(".cards"); 
      agregarProductoAlCarrito(productoCard);
    });
  });

  const btnAgregarDetalle = document.querySelector(".btn-agregar");
  if (btnAgregarDetalle) {
    btnAgregarDetalle.addEventListener("click", (event) => {
      const productoCard = event.target.closest(".producto"); 
      agregarProductoAlCarrito(productoCard);
    });
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
          <span>${producto.nombre} - $${producto.precio.toLocaleString('es-CL')}</span> <!-- Formato de peso chileno -->
        </div>
        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
      `;
      carritoItems.appendChild(item);
    });
  
    totalCarrito.textContent = `Total: $${total.toLocaleString('es-CL')}`;  // Formato del total
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

  function mostrarMensajeCarrito() {
    mensajeCarrito.classList.add("visible");
    setTimeout(() => {
      mensajeCarrito.classList.remove("visible");
    }, 3000); 
  }

  const accordions = document.querySelectorAll('.accordion-item');

  accordions.forEach(item => {
    const button = item.querySelector('.accordion-button');

    button.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  function toggleOpciones(id) {
    const opciones = document.getElementById(id);
    opciones.style.display = opciones.style.display === "block" ? "none" : "block";
  }
  
});

document.addEventListener('DOMContentLoaded', () => {
  const miniaturas = document.querySelectorAll('.miniatura');
  const imagenPrincipal = document.getElementById('imagenPrincipal');

  miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', () => {

      miniaturas.forEach(min => min.classList.remove('activa'));
      miniatura.classList.add('activa');

      imagenPrincipal.src = miniatura.src;

      imagenPrincipal.classList.remove('animar-imagen');
      void imagenPrincipal.offsetWidth; 
      imagenPrincipal.classList.add('animar-imagen');
    });
  });
});


document.getElementById('loginForm').addEventListener("submit", function(event) {
  event.preventDefault();

  const usuarioCorrecto = "admin";
  const passwordCorrecto = "1234";

  const usuarioIngresado = document.getElementById("username").value;
  const passwordIngresado = document.getElementById("password").value;

  if(usuarioIngresado == usuarioCorrecto && passwordCorrecto == passwordIngresado){
    alert("Inicio de sesión exitoso")
    window.location.href = "/index.html";
  }else{
    alert("Usuario o contraseña incorrectos");
  }
})




