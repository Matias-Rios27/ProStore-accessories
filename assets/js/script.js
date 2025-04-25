document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoElement = document.getElementById("carritoCompras");
  const carritoItems = document.getElementById("carritoItems");
  const totalCarrito = document.getElementById("totalCarrito");
  const mensajeCarrito = document.getElementById("mensajeCarrito");

  function agregarProductoAlCarrito(productoCard) {
    const nombre = productoCard
      .querySelector("[data-nombre]")
      .getAttribute("data-nombre");
    const precio = parseFloat(
      productoCard.querySelector("[data-precio]").getAttribute("data-precio")
    );
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
      item.className =
        "list-group-item d-flex justify-content-between align-items-center";
      item.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${producto.imagen}" alt="${
        producto.nombre
      }" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
          <span>${producto.nombre} - $${producto.precio.toLocaleString(
        "es-CL"
      )}</span> <!-- Formato de peso chileno -->
        </div>
        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
      `;
      carritoItems.appendChild(item);
    });

    totalCarrito.textContent = `Total: $${total.toLocaleString("es-CL")}`; // Formato del total
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

  const accordions = document.querySelectorAll(".accordion-item");

  accordions.forEach((item) => {
    const button = item.querySelector(".accordion-button");

    button.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  function toggleOpciones(id) {
    const opciones = document.getElementById(id);
    opciones.style.display =
      opciones.style.display === "block" ? "none" : "block";
  }

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("nombreUsuario", data.usuario.nombre);
        sessionStorage.setItem("loginExitoso", "Inicio de sesión exitoso");
        window.location.href = "/index.html";
      } else {
        alert(data.mensaje || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userLink = document.getElementById("userLink");
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (nombreUsuario) {
    userLink.innerHTML = `${nombreUsuario} <span id="logoutButton" class="btn btn-danger btn-sm ms-2">Cerrar sesión</span>`;
    userLink.setAttribute("href", "/views/perfil.html");
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
      event.preventDefault();
      localStorage.removeItem("nombreUsuario");
      window.location.reload();
    });
  } else {
    userLink.innerHTML = `<i class='bx bx-user'></i> Iniciar sesión`;
    userLink.setAttribute("href", "/views/login.html");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const miniaturas = document.querySelectorAll(".miniatura");
  const imagenPrincipal = document.getElementById("imagenPrincipal");

  miniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", () => {
      miniaturas.forEach((min) => min.classList.remove("activa"));
      miniatura.classList.add("activa");

      imagenPrincipal.src = miniatura.src;

      imagenPrincipal.classList.remove("animar-imagen");
      void imagenPrincipal.offsetWidth;
      imagenPrincipal.classList.add("animar-imagen");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
  const mensaje = sessionStorage.getItem("registroExitoso");

  if (mensaje) {
    mostrarToast(mensaje);
    sessionStorage.removeItem("registroExitoso");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const mensaje = sessionStorage.getItem("loginExitoso");

  function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  if (mensaje) {
    mostrarToast(mensaje);
    sessionStorage.removeItem("loginExitoso");
  }
});
