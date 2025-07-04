// Evento para envío del formulario (email y password por fetch)
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  // Validación simple (puedes mejorarla si quieres)
  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Enviar datos al backend
  fetch("/enviar-correo", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(data => {
      alert(data); // mensaje desde el backend (correo enviado, etc.)
      // Puedes limpiar el formulario si quieres:
      document.getElementById("registerForm").reset();
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Ocurrió un error al enviar el correo.");
    });
});

// Redirecciones a redes sociales
document.querySelector(".facebook-btn").addEventListener("click", () => {
  window.location.href = "https://www.facebook.com/login";
});

document.querySelector(".twitter-btn").addEventListener("click", () => {
  window.location.href = "https://twitter.com/login";
});

document.querySelector(".instagram-btn").addEventListener("click", () => {
  window.location.href = "https://www.instagram.com/accounts/login/";
});
