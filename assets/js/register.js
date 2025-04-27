document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  function validarContraseña(contraseña) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(contraseña);
  }

  function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const usuario = document.getElementById("usuario").value;
      const correo = document.getElementById("correo").value;
      const contraseña = document.getElementById("contraseña").value;
      const confirmar = document.getElementById("confirmarContraseña").value;

      if (!validarEmail(correo)) {
        document.getElementById("errorCorreo").textContent =
          "El correo es invalido";
        return;
      }

      if (contraseña !== confirmar) {
        document.getElementById("errorConfirmar").textContent =
          "Las contraseñas no coinciden";
        return;
      }

      if (!validarContraseña(contraseña)) {
        document.getElementById("errorContraseña").textContent =
          "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/auth/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuario, correo, contraseña }),
        });

        const data = await res.json();

        if (res.ok) {
          sessionStorage.setItem("registroExitoso", data.mensaje);
          window.location.href = "/views/login.html";
        } else {
          alert(data.error || "Error en el registro");
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error de conexión con el servidor");
      }
    });
  }

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("contraseña");

  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    togglePassword.classList.toggle("bx-show");
    togglePassword.classList.toggle("bx-hide");
  });

  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const confirmInput = document.getElementById("confirmarContraseña");

  toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmInput.type === "password" ? "text" : "password";
    confirmInput.type = type;

    toggleConfirmPassword.classList.toggle("bx-show");
    toggleConfirmPassword.classList.toggle("bx-hide");
  });
});
