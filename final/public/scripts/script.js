'use strict';

// Layouts
var artFormNombre = document.getElementById('art-form-nombre');
var artJuego = document.getElementById('art-juego');
var artClasificatoria = document.getElementById('art-clasificatoria');

// Controles
var botonJugar = document.getElementById('button-jugar');
var botonClasificaciones = document.getElementById('button-clasificaciones');
var botonReiniciar = document.getElementById('button-reiniciar');

// Componentes
var formNombre = document.getElementById('form-nombre');
var nombreJugadorP = document.getElementById('nombre-jugador');
var nombreJugadorSpan = document.getElementById('nombre-jugador_span');
var puntajeJugadorP = document.getElementById('puntaje-jugador');
var puntajeJugadorSpan = document.getElementById('puntaje-jugador_span');
var botonesJuego = document.getElementsByClassName('simon-boton');
var audioBeep = document.getElementById('audio-beep');

// Audios
var audiosBeep = ['./public/Beep-10.mp3', './public/Beep-5.mp3', './public/Beep.mp3', './public/Beep+5.mp3', './public/Beep+10.mp3'];

// Estado
var nombreJugador = undefined;
var puntaje = 0;
var secuencia = [];
var ronda = 0;

// Iniciar juego
formNombre.addEventListener('submit', function (e) {
  e.preventDefault();

  if (e.target.nombre && e.target.nombre.value) {
    nombreJugador = e.target.nombre.value.trim();
    artFormNombre.style.display = 'none';

    nombreJugadorP.style.display = 'flex';
    nombreJugadorSpan.innerText = nombreJugador;

    puntajeJugadorP.style.display = 'flex';
    puntajeJugadorSpan.innerText = puntaje;

    botonClasificaciones.style.display = 'none';
    botonReiniciar.style.display = 'block';

    artJuego.style.display = 'block';

    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toLocaleDateString('es-AR') + ' ' + fechaActual.toLocaleTimeString('es-AR');

    var datosJugador = {
      puntaje: 0,
      ultima_partida: fechaFormateada,
      mayor_puntuacion: 0,
      fecha_mayor_puntuacion: fechaFormateada,
    };

    if (localStorage.getItem('clasif_' + nombreJugador) !== null) {
      // Si ya existe, actualizar ultima_partida
      var datosExistentes = JSON.parse(localStorage.getItem('clasif_' + nombreJugador));
      datosExistentes.ultima_partida = fechaFormateada;
      localStorage.setItem('clasif_' + nombreJugador, JSON.stringify(datosExistentes));
    } else {
      localStorage.setItem('clasif_' + nombreJugador, JSON.stringify(datosJugador));
    }

    return;
  }

  document.getElementById('span-error-nombre').style.display = 'block';
});

function terminarJuego() {
  secuencia = [];
  puntaje = 0;
}
botonReiniciar.addEventListener('click', terminarJuego);

function crearSecuencia() {
  var randomBoton = Math.floor(Math.random() * 4);
  secuencia.push(randomBoton);
}

function reiniciarJuego() {
  nombreJugador = undefined;
  puntaje = 0;
  secuencia = [];
  ronda = 0;

  console.log('A');
  artJuego.style.display = 'none';
  nombreJugadorP.style.display = 'none';
  nombreJugadorSpan.innerText = undefined;

  puntajeJugadorP.style.display = 'none';
  puntajeJugadorSpan.innerText = undefined;

  botonClasificaciones.style.display = 'block';
  botonReiniciar.style.display = 'none';

  artFormNombre.style.display = 'flex';
  console.log('B');
}
botonReiniciar.addEventListener('click', reiniciarJuego);

// Click de botón en el juego
for (var i = 0; i < botonesJuego.length; i++) {
  var boton = botonesJuego[i];
  boton.addEventListener('click', function (e) {
    var randomAudio = Math.floor(Math.random() * audiosBeep.length);
    audioBeep.src = audiosBeep[randomAudio];
    audioBeep.play();
    var id = e.target.id.split('-')[2];
  });
}

function mostrarJugar() {
  artClasificatoria.style.display = 'none';
  botonJugar.style.display = 'none';

  botonClasificaciones.style.display = 'block';
  artFormNombre.style.display = 'flex';
}
botonJugar.addEventListener('click', mostrarJugar);

function agregarClasificaciones() {
  var tbody = document.getElementById('tabla-clasificatoria-cuerpo');
  tbody.innerHTML = '';

  var clasificaciones = [];

  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);

    if (clave === 'i18nextLng' || clave.indexOf('clasif_') !== 0) {
      continue;
    }

    var datos = JSON.parse(localStorage.getItem(clave));
    clasificaciones.push({
      nombre: clave.substring(7, clave.length),
      puntos: datos.mayor_puntuacion,
      fecha: datos.fecha_mayor_puntuacion,
    });
  }

  if (clasificaciones.length === 0) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="3" style="text-align: center;">Tabla vacía</td>';
    tbody.appendChild(tr);
    return;
  }

  clasificaciones.sort(function (a, b) {
    return b.puntos - a.puntos;
  });

  var top10 = clasificaciones.slice(0, 10);

  for (var j = 0; j < top10.length; j++) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + top10[j].nombre + '</td><td>' + top10[j].puntos + '</td><td>' + top10[j].fecha + '</td>';
    tbody.appendChild(tr);
  }
}
function mostrarClasificacion() {
  artFormNombre.style.display = 'none';
  botonClasificaciones.style.display = 'none';

  botonJugar.style.display = 'block';
  artClasificatoria.style.display = 'flex';

  agregarClasificaciones();
}
botonClasificaciones.addEventListener('click', mostrarClasificacion);
