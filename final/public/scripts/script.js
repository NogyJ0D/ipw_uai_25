'use strict';

var formNombre = document.getElementById('form-nombre');
var reiniciarBoton = document.getElementById('reiniciar-boton');
var nombreJugadorP = document.getElementById('nombre-jugador');
var nombreJugadorSpan = document.getElementById('nombre-jugador_span');
var puntajeJugadorP = document.getElementById('puntaje-jugador');
var puntajeJugadorSpan = document.getElementById('puntaje-jugador_span');
var botonesJuego = document.getElementsByClassName('simon-boton');
var audioBeep = document.getElementById('audio-beep');
var juegoDiv = document.getElementById('juego');

var audiosBeep = ['./public/Beep-10.mp3', './public/Beep-5.mp3', './public/Beep.mp3', './public/Beep+5.mp3', './public/Beep+10.mp3'];

var nombreJugador = undefined;
var puntaje = 0;
var secuencia = [];

// Iniciar juego
formNombre.addEventListener('submit', function (e) {
  e.preventDefault();

  if (e.target.nombre && e.target.nombre.value) {
    nombreJugador = e.target.nombre.value.trim();
    formNombre.style.display = 'none';

    nombreJugadorP.style.display = 'flex';
    nombreJugadorSpan.innerText = nombreJugador;

    puntajeJugadorP.style.display = 'flex';
    puntajeJugadorSpan.innerText = puntaje;

    reiniciarBoton.style.display = 'block';

    juegoDiv.style.display = 'flex';
  }
});

function terminarJuego() {
  secuencia = [];
  puntaje = 0;
}
reiniciarBoton.addEventListener('click', terminarJuego);

function crearSecuencia() {
  var randomBoton = Math.floor(Math.random() * 4);
  secuencia.push(randomBoton);
}

// Click de botón
for (var i = 0; i < botonesJuego.length; i++) {
  var boton = botonesJuego[i];
  boton.addEventListener('click', function (e) {
    var randomAudio = Math.floor(Math.random() * audiosBeep.length);
    audioBeep.src = audiosBeep[randomAudio];
    audioBeep.play();
    var id = e.target.id.split('-')[2];
  });
}
