// Función para previsualizar la imagen
function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const avatarImg = document.getElementById("avatarImg");
    avatarImg.src = reader.result;
    avatarImg.style.width = "200px";
    avatarImg.style.height = "200px";
    avatarImg.style.objectFit = "cover";
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function cargarPerfil() {
  const correo = localStorage.getItem("usuarioCorreo");
  const encodedCorreo = encodeURIComponent(correo);

  fetch(`/api/perfil/${encodedCorreo}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("usuario").value = data.usuario;
      document.getElementById("nombre").value = data.nombre;
      document.getElementById("apellido").value = data.apellido;
      document.getElementById("correo").value = data.correo;
      document.getElementById("telefono").value = data.telefono;
      document.getElementById("direccion").value = data.direccion;
      document.getElementById("pais").value = data.pais;
      document.getElementById("ciudad").value = data.ciudad;

      if (data.imagen) {
        const avatarImg = document.getElementById('avatarImg');
        avatarImg.src = '/' + data.imagen; 
        avatarImg.style.width = "200px";
        avatarImg.style.height = "200px";
        avatarImg.style.objectFit = "cover";
    }

    })
    .catch((error) => {
      console.error("Error al cargar el perfil:", error);
    });
}

window.addEventListener("DOMContentLoaded", cargarPerfil);

function guardarCambios() {
  const correo = localStorage.getItem("usuarioCorreo");
  const nombre = document.getElementById("nombre").value;
  const usuario = document.getElementById("usuario").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const pais = document.getElementById("pais").value;
  const ciudad = document.getElementById("ciudad").value;
  const imagenInput = document.getElementById("avatarInput");

  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("usuario", usuario);
  formData.append("apellido", apellido);
  formData.append("correo", correo);
  formData.append("telefono", telefono);
  formData.append("direccion", direccion);
  formData.append("pais", pais);
  formData.append("ciudad", ciudad);

  if (imagenInput.files.length > 0) {
    formData.append("imagen", imagenInput.files[0]);
  }

  fetch("/api/perfil", {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al actualizar el perfil:", error);
    });

  localStorage.setItem("nombreUsuario", `${usuario}`);

  const userLink = document.getElementById("userLink");
  if (userLink) {
    userLink.innerHTML = `${usuario} <span id="logoutButton" class="btn btn-danger btn-sm ms-2">Cerrar sesión</span>`;
    userLink.setAttribute("href", "/views/perfil.html");

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("nombreUsuario");
      window.location.href = "/index.html";
    });
  }
}

function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.textContent = "Cambios guardados correctamente";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document
  .getElementById("guardarCambiosBtn")
  .addEventListener("click", guardarCambios);
document
  .getElementById("guardarCambiosBtn")
  .addEventListener("click", mostrarToast);
