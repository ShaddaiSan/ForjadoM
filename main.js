(function () {
  "use strict";
  var C = window.FORJADO || {};
  var doc = document;
  doc.documentElement.classList.add("js");

  function waLink(text) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text || "Hola, quiero información sobre Forjado Marketing Digital.");
  }
  doc.querySelectorAll("[data-wa]").forEach(function (a) { a.href = waLink(a.getAttribute("data-wa")); });
  doc.querySelectorAll("[data-mail]").forEach(function (a) { a.href = "mailto:" + C.email; });
  doc.querySelectorAll("[data-email-text]").forEach(function (el) { el.textContent = C.email; });
  doc.querySelectorAll("[data-phone-text]").forEach(function (el) { el.textContent = "+" + C.whatsapp; });

  var btn = doc.querySelector(".nav-toggle"), nav = doc.getElementById("nav");
  if (btn && nav) {
    var set = function (open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Cerrar" : "Menú";
    };
    btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") set(false); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  var form = doc.getElementById("form-contacto"), status = doc.getElementById("estado");
  if (form) {
    var build = function () {
      var d = new FormData(form);
      return "Hola, soy " + d.get("nombre") + " (" + d.get("negocio") + ").\nMe interesa: " + d.get("servicio") + ".\n" + (d.get("mensaje") || "");
    };
    var say = function (m) { status.textContent = m; };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (!C.whatsappConfigurado) { say("Aviso para el propietario del sitio: configura tu número en js/config.js para activar este botón."); return; }
      say("Abriendo WhatsApp con tu mensaje listo para enviar…");
      window.open(waLink(build()), "_blank", "noopener");
    });
    var mailBtn = doc.getElementById("btn-correo");
    if (mailBtn) mailBtn.addEventListener("click", function () {
      if (!form.reportValidity()) return;
      window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Solicitud de información") + "&body=" + encodeURIComponent(build());
    });
  }
})();
