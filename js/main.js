// Invitación Primera Comunión de Mia
// 1) Cuenta regresiva  2) Pétalos flotantes  3) Aparición al hacer scroll

var FECHA_EVENTO = new Date("2026-10-11T16:00:00-03:00").getTime();

function pad(n) {
  return String(n).padStart(2, "0");
}

function iniciarCuentaRegresiva() {
  var dias = document.getElementById("dias");
  var horas = document.getElementById("horas");
  var minutos = document.getElementById("minutos");
  var segundos = document.getElementById("segundos");
  if (!dias) return;

  function tick() {
    var diff = Math.max(0, FECHA_EVENTO - Date.now());
    dias.textContent = pad(Math.floor(diff / 86400000));
    horas.textContent = pad(Math.floor((diff / 3600000) % 24));
    minutos.textContent = pad(Math.floor((diff / 60000) % 60));
    segundos.textContent = pad(Math.floor((diff / 1000) % 60));
  }

  tick();
  setInterval(tick, 1000);
}

function crearPetalos() {
  var cont = document.getElementById("petals");
  if (!cont) return;

  for (var i = 0; i < 18; i++) {
    var p = document.createElement("span");
    p.className = "petal";
    var size = 4 + (i % 4) * 2;
    p.style.left = ((i * 37) % 100) + "%";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = i % 3 === 0 ? "#cddcee" : "#e4d3a9";
    p.style.animationDuration = 12 + (i % 5) * 3 + "s";
    p.style.animationDelay = (i % 9) * 1.6 + "s";
    cont.appendChild(p);
  }
}

function activarAparicion() {
  var elementos = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (el) {
      el.classList.add("shown");
    });
    return;
  }

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("shown");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach(function (el) {
    obs.observe(el);
  });
}

// 4) Secreto escondido: tocar 5 veces la copita dorada
function iniciarSecreto() {
  var RESPUESTA = "miaa";
  var TOQUES_NECESARIOS = 5;
  var VENTANA_MS = 4000;

  var trigger = document.getElementById("secreto-trigger");
  var overlay = document.getElementById("secreto-overlay");
  var box = document.getElementById("secreto-box");
  var vistaBloqueada = document.getElementById("secreto-locked");
  var vistaDesbloqueada = document.getElementById("secreto-unlocked");
  var input = document.getElementById("secreto-input");
  var btnDescubrir = document.getElementById("secreto-btn");
  var btnCerrar = document.getElementById("secreto-cerrar");
  var mensajeError = document.getElementById("secreto-error");

  if (!trigger || !overlay) return;

  var toques = 0;
  var temporizador = null;

  trigger.addEventListener("click", function () {
    toques++;
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      toques = 0;
    }, VENTANA_MS);

    if (toques >= TOQUES_NECESARIOS) {
      toques = 0;
      clearTimeout(temporizador);
      abrirSecreto();
    }
  });

  function abrirSecreto() {
    vistaBloqueada.hidden = false;
    vistaDesbloqueada.hidden = true;
    mensajeError.hidden = true;
    input.value = "";
    overlay.hidden = false;
    requestAnimationFrame(function () {
      overlay.classList.add("mostrar");
    });
    setTimeout(function () {
      input.focus();
    }, 300);
  }

  function cerrarSecreto() {
    overlay.classList.remove("mostrar");
    setTimeout(function () {
      overlay.hidden = true;
    }, 300);
  }

  function intentarRespuesta() {
    var valor = (input.value || "").trim().toLowerCase();
    if (valor === RESPUESTA) {
      vistaBloqueada.hidden = true;
      vistaDesbloqueada.hidden = false;
      crearConfetti();
    } else {
      mensajeError.hidden = false;
      box.classList.remove("secreto-shake");
      void box.offsetWidth;
      box.classList.add("secreto-shake");
    }
  }

  btnDescubrir.addEventListener("click", intentarRespuesta);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") intentarRespuesta();
  });
  btnCerrar.addEventListener("click", cerrarSecreto);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) cerrarSecreto();
  });
}

function crearConfetti() {
  var cont = document.getElementById("secreto-confetti");
  if (!cont) return;
  cont.innerHTML = "";

  for (var i = 0; i < 22; i++) {
    var pieza = document.createElement("span");
    pieza.className = "confetti-heart";
    pieza.textContent = i % 2 === 0 ? "♥" : "✦";
    pieza.style.left = Math.random() * 100 + "%";
    pieza.style.color = i % 3 === 0 ? "#cddcee" : "#b3924f";
    pieza.style.fontSize = 10 + Math.random() * 10 + "px";
    pieza.style.animationDuration = 2.4 + Math.random() * 2 + "s";
    pieza.style.animationDelay = Math.random() * 0.6 + "s";
    cont.appendChild(pieza);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarCuentaRegresiva();
  crearPetalos();
  activarAparicion();
  iniciarSecreto();
});
