const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLXSkwLCnQtYC2nmM67Uh0THjmePv8fEzL08a-e4pBtW8o61hVQV5s2PwFkqVUqcYtRA/exec";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  if (!usuario || !password) {
    message.textContent = "Ingresa usuario y contraseña";
    return;
  }

  message.textContent = "Validando credenciales...";

  const url = `${SCRIPT_URL}?action=login&usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("RESPUESTA:", data);

      if (!data.ok) {
        message.textContent = data.mensaje || "Error de autenticación";
        return;
      }

      localStorage.setItem("sessionId", data.sessionId);
      localStorage.setItem("rol", data.rol);

      window.location.href = "https://ingjuank23.github.io/IntraNetEX/";
    })
    .catch(err => {
      console.error(err);
      message.textContent = "Error de conexión con el servidor";
    });
});


