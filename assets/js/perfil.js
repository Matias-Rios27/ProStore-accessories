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
  
  // Función para cargar el perfil
  function cargarPerfil() {
    const correo = localStorage.getItem('usuarioCorreo');
    const encodedCorreo = encodeURIComponent(correo); // Codificar el correo
    
    fetch(`/api/perfil/${encodedCorreo}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre').value = data.nombre 
            document.getElementById('apellido').value = data.apellido 
            document.getElementById('correo').value = data.correo 
            document.getElementById('telefono').value = data.telefono 
            document.getElementById('direccion').value = data.direccion 
            document.getElementById('pais').value = data.pais 
            document.getElementById('ciudad').value = data.ciudad 
        })
        .catch(error => {
            console.error('Error al cargar el perfil:', error);
        });
  }

  window.addEventListener('DOMContentLoaded', cargarPerfil);

  function guardarCambios() {
      const correo = localStorage.getItem('usuarioCorreo');
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const telefono = document.getElementById('telefono').value;
      const direccion = document.getElementById('direccion').value;
      const pais = document.getElementById('pais').value;
      const ciudad = document.getElementById('ciudad').value;
  
      const datos = { nombre, apellido, correo, telefono, direccion, pais, ciudad };
  
      fetch('/api/perfil', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos) 
      })
      .then(response => response.json())
      .then(data => {
          alert('Perfil actualizado exitosamente');
          console.log(data);
      })
      .catch(error => {
          console.error('Error al actualizar el perfil:', error);
      });
  }

  document.getElementById('guardarCambiosBtn').addEventListener('click', guardarCambios);
  