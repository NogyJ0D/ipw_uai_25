'use strict';

// ===== CONFIGURACIÓN =====

var audiosBeep = ['./public/sounds/Beep-10.mp3', './public/sounds/Beep-5.mp3', './public/sounds/Beep.mp3', './public/sounds/Beep+5.mp3', './public/sounds/Beep+10.mp3'];
var audioJuga = './public/sounds/juga.mp3';

// ===== DOM =====

var audioBeep = document.getElementById('audio-sonido');

var nombreJugadorP = document.getElementById('nombre-jugador');
var nombreJugadorSpan = document.getElementById('nombre-jugador-span');
var puntajeJugadorP = document.getElementById('puntaje-jugador');
var puntajeJugadorSpan = document.getElementById('puntaje-jugador-span');

var botonJugar = document.getElementById('boton-jugar');
var botonContacto = document.getElementById('boton-contacto');
var botonClasificaciones = document.getElementById('boton-clasificaciones');
var botonReiniciar = document.getElementById('boton-reiniciar');

var articuloFormularioNombre = document.getElementById('art-form-nombre');
var formularioNombre = document.getElementById('form-nombre');

var articuloContacto = document.getElementById('art-form-contacto');
var formularioContacto = document.getElementById('form-contacto');
var contactoNombre = document.getElementById('contacto-nombre');
var contactoEmail = document.getElementById('contacto-email');
var contactoMensaje = document.getElementById('contacto-mensaje');
var errorContactoNombre = document.getElementById('span-error-contacto-nombre');
var errorContactoEmail = document.getElementById('span-error-contacto-email');
var errorContactoMensaje = document.getElementById('span-error-contacto-mensaje');

var articuloJuego = document.getElementById('art-juego');
var textoTiempo = document.getElementById('tiempo');
var textoJuga = document.getElementById('juga');
var botonesJuego = document.getElementsByClassName('juego-boton');

var articuloClasificatoria = document.getElementById('art-clasificatoria');
var botonOrdenarPuntos = document.getElementById('ordenar-puntos');
var botonOrdenarFecha = document.getElementById('ordenar-fecha');

// Modal de resultado
var modalResultado = document.getElementById('modal-resultado');
var modalNombre = document.getElementById('modal-nombre');
var modalPuntuacion = document.getElementById('modal-puntuacion');
var modalRondas = document.getElementById('modal-rondas');
var modalTiempo = document.getElementById('modal-tiempo');
var modalFecha = document.getElementById('modal-fecha');
var botonCerrarModal = document.getElementById('modal-cerrar');

// ===== ESTADO =====

var modoSecuencia = true;
var nombreJugador = undefined;
var puntaje = 0;
var secuencia = [];
var ronda = 1;
var pasoActual = 0;
var errores = 0;
var tiempoInicio = 0;
var intervaloTiempo = null;

// ===== UTILIDADES =====

function actualizarTiempo() {
  if (tiempoInicio > 0) {
    var tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    var minutos = Math.floor(tiempoTranscurrido / 60);
    var segundos = tiempoTranscurrido % 60;
    textoTiempo.innerText = (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
  }
}

function reproducirSonido(botonIndex) {
  audioBeep.pause();
  audioBeep.currentTime = 0;
  audioBeep.src = audiosBeep[botonIndex];
  audioBeep.play().catch(function (err) {});
}

// ===== NAVEGACIÓN =====

function mostrarJugar() {
  articuloClasificatoria.style.display = 'none';
  articuloContacto.style.display = 'none';
  botonJugar.style.display = 'none';

  botonContacto.style.display = 'block';
  botonClasificaciones.style.display = 'block';
  articuloFormularioNombre.style.display = 'flex';
}

function mostrarContacto() {
  articuloFormularioNombre.style.display = 'none';
  articuloClasificatoria.style.display = 'none';
  botonContacto.style.display = 'none';

  botonClasificaciones.style.display = 'block';
  botonJugar.style.display = 'block';
  articuloContacto.style.display = 'flex';
}

function mostrarClasificacion() {
  articuloFormularioNombre.style.display = 'none';
  articuloContacto.style.display = 'none';
  botonClasificaciones.style.display = 'none';

  botonContacto.style.display = 'block';
  botonJugar.style.display = 'block';
  articuloClasificatoria.style.display = 'flex';

  agregarClasificaciones();
}

// ===== FORMULARIO NOMBRE =====

function manejarEnvioFormularioNombre(e) {
  e.preventDefault();

  if (e.target.nombre && e.target.nombre.value) {
    if (e.target.nombre.value.length < 3) {
      document.getElementById('span-error-nombre-nombre').innerText = 'El nombre debe tener al menos 3 letras.';
      document.getElementById('span-error-nombre-nombre').style.display = 'block';
      return;
    }

    nombreJugador = e.target.nombre.value.trim();
    articuloFormularioNombre.style.display = 'none';

    nombreJugadorP.style.display = 'flex';
    nombreJugadorSpan.innerText = nombreJugador;

    puntajeJugadorP.style.display = 'flex';
    puntajeJugadorSpan.innerText = puntaje;

    botonContacto.style.display = 'none';
    botonClasificaciones.style.display = 'none';
    botonReiniciar.style.display = 'block';
    botonReiniciar.innerText = 'Terminar';

    articuloJuego.style.display = 'block';

    secuencia = [];
    puntaje = 0;
    ronda = 1;
    errores = 0;
    tiempoInicio = Date.now();
    textoTiempo.innerText = '00:00';

    if (intervaloTiempo) {
      clearInterval(intervaloTiempo);
    }
    intervaloTiempo = setInterval(actualizarTiempo, 1000);

    audioBeep.pause();
    audioBeep.currentTime = 0;
    audioBeep.src = audioJuga;
    audioBeep.play();
    setTimeout(function () {
      crearSecuencia(false);
    }, 1000);
  } else {
    document.getElementById('span-error-nombre-nombre').style.display = 'block';
  }
}

formularioNombre.addEventListener('submit', manejarEnvioFormularioNombre);

// ===== JUEGO =====

function crearSecuencia(reiniciar) {
  modoSecuencia = true;
  pasoActual = 0;

  if (!reiniciar) {
    var randomBoton = Math.floor(Math.random() * 4);
    secuencia.push(randomBoton);
  }

  textoJuga.innerText = 'Ronda ' + ronda;

  var delay = 0;
  for (var i = 0; i < secuencia.length; i++) {
    (function (index) {
      setTimeout(function () {
        var botonIndex = secuencia[index];
        botonesJuego.item(botonIndex).classList.add('juego-boton-hover');
        reproducirSonido(botonIndex);

        setTimeout(function () {
          botonesJuego.item(botonIndex).classList.remove('juego-boton-hover');

          if (index === secuencia.length - 1) {
            modoSecuencia = false;
          }
        }, 800);
      }, delay);
      delay += 1000;
    })(i);
  }
}

function clicBotonJuego(e) {
  if (modoSecuencia) {
    return;
  }

  var id = Number(e.target.id.split('-')[2]);
  reproducirSonido(id);

  if (secuencia[pasoActual] === id) {
    pasoActual++;

    if (pasoActual === secuencia.length) {
      puntaje++;
      ronda++;
      puntajeJugadorSpan.innerText = puntaje;
      setTimeout(function () {
        crearSecuencia(false);
      }, 500);
    }
  } else {
    errores++;

    if (errores >= 3) {
      finalizarJuegoPorErrores();
    } else {
      textoJuga.innerText = '¡MAL!, repetilo.';
      setTimeout(function () {
        crearSecuencia(true);
      }, 2000);
    }
  }
}

function terminarJuego() {
  var tiempoFinal = Date.now();
  var segundosTranscurridos = Math.floor((tiempoFinal - tiempoInicio) / 1000);
  var penalizacion = Math.floor(segundosTranscurridos / 10);
  var puntajeFinal = Math.max(0, puntaje - penalizacion);

  console.log('Tiempo: ' + segundosTranscurridos + 's, Penalización: -' + penalizacion + ', Puntaje base: ' + puntaje + ', Puntaje final: ' + puntajeFinal);

  var fechaActual = new Date();
  var fechaFormateada = fechaActual.toLocaleDateString('es-AR') + ' ' + fechaActual.toLocaleTimeString('es-AR', { hour12: false });

  if (nombreJugador) {
    var clave = 'clasif_' + nombreJugador;

    if (localStorage.getItem(clave) !== null) {
      var datosExistentes = JSON.parse(localStorage.getItem(clave));
      datosExistentes.ultimaPartida = fechaFormateada;
      datosExistentes.puntaje = puntajeFinal;

      if (puntajeFinal > datosExistentes.mayorPuntuacion) {
        datosExistentes.mayorPuntuacion = puntajeFinal;
        datosExistentes.fechaMayorPuntuacion = fechaFormateada;
      }

      localStorage.setItem(clave, JSON.stringify(datosExistentes));
    } else {
      var datosJugador = {
        puntaje: puntajeFinal,
        ultimaPartida: fechaFormateada,
        mayorPuntuacion: puntajeFinal,
        fechaMayorPuntuacion: fechaFormateada,
      };
      localStorage.setItem(clave, JSON.stringify(datosJugador));
    }
  }

  var minutos = Math.floor(segundosTranscurridos / 60);
  var segundos = segundosTranscurridos % 60;
  var tiempoFormateado = (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;

  modalNombre.innerText = nombreJugador || 'Anónimo';
  modalPuntuacion.innerText = puntajeFinal;
  modalRondas.innerText = ronda - 1;
  modalTiempo.innerText = tiempoFormateado;
  modalFecha.innerText = fechaFormateada;
  modalResultado.style.display = 'flex';

  secuencia = [];
  puntaje = 0;
  errores = 0;
  tiempoInicio = 0;

  if (intervaloTiempo) {
    clearInterval(intervaloTiempo);
    intervaloTiempo = null;
  }
}

function reiniciarJuego() {
  nombreJugador = undefined;

  articuloJuego.style.display = 'none';
  nombreJugadorP.style.display = 'none';
  nombreJugadorSpan.innerText = undefined;

  puntajeJugadorP.style.display = 'none';
  puntajeJugadorSpan.innerText = undefined;

  botonContacto.style.display = 'block';
  botonClasificaciones.style.display = 'block';
  botonReiniciar.style.display = 'none';
  botonReiniciar.innerText = 'Reiniciar';

  articuloFormularioNombre.style.display = 'flex';
}

function finalizarJuegoPorErrores() {
  textoJuga.innerText = 'GAME OVER - 3 errores';
  modoSecuencia = true;

  setTimeout(function () {
    terminarJuego();
    reiniciarJuego();
  }, 2500);
}

function manejarHoverBotonJuego(e) {
  e.target.classList.add('juego-boton-hover');
}

function manejarSalirHoverBotonJuego(e) {
  e.target.classList.remove('juego-boton-hover');
}

for (var i = 0; i < botonesJuego.length; i++) {
  botonesJuego.item(i).addEventListener('mouseover', manejarHoverBotonJuego);
  botonesJuego.item(i).addEventListener('mouseout', manejarSalirHoverBotonJuego);
  botonesJuego.item(i).addEventListener('click', clicBotonJuego);
}

botonReiniciar.addEventListener('click', function () {
  terminarJuego();
  reiniciarJuego();
});

// ===== CONTACTO =====

function manejarEnvioFormularioContacto(e) {
  e.preventDefault();

  errorContactoNombre.style.display = 'none';
  errorContactoEmail.style.display = 'none';
  errorContactoMensaje.style.display = 'none';

  var nombre = contactoNombre.value.trim();
  var email = contactoEmail.value.trim();
  var mensaje = contactoMensaje.value.trim();
  var esValido = true;

  var regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nombre || nombre.length < 3) {
    errorContactoNombre.innerText = 'El nombre debe tener al menos 3 caracteres.';
    errorContactoNombre.style.display = 'block';
    esValido = false;
  } else if (!regexNombre.test(nombre)) {
    errorContactoNombre.innerText = 'El nombre solo puede contener letras y espacios.';
    errorContactoNombre.style.display = 'block';
    esValido = false;
  }

  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errorContactoEmail.innerText = 'Ingrese un email.';
    errorContactoEmail.style.display = 'block';
    esValido = false;
  } else if (!regexEmail.test(email)) {
    errorContactoEmail.innerText = 'Ingrese un email válido (ej: usuario@dominio.com).';
    errorContactoEmail.style.display = 'block';
    esValido = false;
  }

  if (!mensaje || mensaje.length < 5) {
    errorContactoMensaje.innerText = 'El mensaje debe tener al menos 5 caracteres.';
    errorContactoMensaje.style.display = 'block';
    esValido = false;
  }

  if (esValido) {
    var destinatario = 'vgiarra@proton.me';
    var asunto = 'Simón Dice - ' + nombre;
    var cuerpo = mensaje;

    var mailtoLink = 'mailto:' + destinatario + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);

    window.location.href = mailtoLink;

    contactoNombre.value = '';
    contactoEmail.value = '';
    contactoMensaje.value = '';
  }
}

formularioContacto.addEventListener('submit', manejarEnvioFormularioContacto);

// ===== CLASIFICACIÓN =====

var ordenActual = 'puntos';

function agregarClasificaciones() {
  var tbody = document.getElementById('tabla-clasificatoria-cuerpo');
  tbody.innerHTML = '';

  var clasificaciones = [];

  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);

    if (clave.indexOf('clasif_') !== 0) {
      continue;
    }

    var datos = JSON.parse(localStorage.getItem(clave));
    clasificaciones.push({
      nombre: clave.substring(7, clave.length),
      puntos: datos.mayorPuntuacion,
      fecha: datos.fechaMayorPuntuacion,
      fechaTimestamp: new Date(datos.fechaMayorPuntuacion.split(' ').reverse().join(' ')).getTime(),
    });
  }

  if (clasificaciones.length === 0) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="3">Tabla vacía</td>';
    tbody.appendChild(tr);
    return;
  }

  if (ordenActual === 'puntos') {
    clasificaciones.sort(function (a, b) {
      return b.puntos - a.puntos;
    });
  } else {
    clasificaciones.sort(function (a, b) {
      return b.fechaTimestamp - a.fechaTimestamp;
    });
  }

  var top10 = clasificaciones.slice(0, 10);

  for (var j = 0; j < top10.length; j++) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + top10[j].nombre + '</td><td>' + top10[j].puntos + '</td><td>' + top10[j].fecha + '</td>';
    tbody.appendChild(tr);
  }
}

function ordenarPorPuntos() {
  ordenActual = 'puntos';
  botonOrdenarPuntos.classList.add('activo');
  botonOrdenarFecha.classList.remove('activo');
  agregarClasificaciones();
}

function ordenarPorFecha() {
  ordenActual = 'fecha';
  botonOrdenarFecha.classList.add('activo');
  botonOrdenarPuntos.classList.remove('activo');
  agregarClasificaciones();
}

botonOrdenarPuntos.addEventListener('click', ordenarPorPuntos);
botonOrdenarFecha.addEventListener('click', ordenarPorFecha);

// ===== MODAL =====

function cerrarModal() {
  modalResultado.style.display = 'none';
}

botonCerrarModal.addEventListener('click', cerrarModal);

// ===== INICIALIZACIÓN =====

botonJugar.addEventListener('click', mostrarJugar);
botonContacto.addEventListener('click', mostrarContacto);
botonClasificaciones.addEventListener('click', mostrarClasificacion);
