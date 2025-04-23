document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
  
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const nombre = document.getElementById('usuario').value;
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        const confirmar = document.getElementById('confirmarContraseña').value;
  
        if (contraseña !== confirmar) {
          alert('Las contraseñas no coinciden');
          return;
        }
  
        try {
          const res = await fetch('http://localhost:3000/api/auth/registro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, contraseña })
          });
  
          const data = await res.json();
  
          if (res.ok) {
            alert(data.mensaje);
            window.location.href = '/views/login.html';
          } else {
            alert(data.error || 'Error en el registro');
          }
        } catch (error) {
          console.error('Error al registrar:', error);
          alert('Error de conexión con el servidor');
        }
      });
    }
  });