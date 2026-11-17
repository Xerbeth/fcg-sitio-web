// FCG — comportamiento del sitio (versión de revisión)
(function () {
  // Mostrar / ocultar las marcas de texto pendiente
  var toggle = document.getElementById('togglePendientes');
  var oculto = false;
  var estilo = document.createElement('style');
  document.head.appendChild(estilo);
  toggle.addEventListener('click', function () {
    oculto = !oculto;
    estilo.textContent = oculto
      ? '.pendiente{background:none!important;outline:none!important;color:inherit!important;padding:0!important}.pendiente-bloque{outline:none!important}'
      : '';
    toggle.textContent = oculto ? 'Mostrar marcas' : 'Ocultar marcas';
  });

  // "Solicitar información" preselecciona el servicio en el formulario
  document.querySelectorAll('[data-servicio]').forEach(function (a) {
    a.addEventListener('click', function () {
      document.getElementById('servicio').value = a.getAttribute('data-servicio');
    });
  });

  // Validación del formulario (aún sin envío real)
  var form = document.getElementById('formContacto');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('was-validated');
    if (form.checkValidity()) {
      document.getElementById('formAviso').classList.remove('d-none');
    }
  });

  // Resaltar en el menú la sección visible
  var links = document.querySelectorAll('.navbar-nav .nav-link');
  var secciones = ['inicio', 'nosotros', 'servicios', 'normas', 'contacto']
    .map(function (id) { return document.getElementById(id); });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { if (s) obs.observe(s); });
  }
})();
