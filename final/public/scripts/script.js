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
var textoJuga = document.getElementById('juga');

// Audios
var audiosBeep = ['./public/Beep-10.mp3', './public/Beep-5.mp3', './public/Beep.mp3', './public/Beep+5.mp3', './public/Beep+10.mp3'];
var audioJuga = './public/juga.mp3';

// Estado
var modoSecuencia = true;
var nombreJugador = undefined;
var puntaje = 0;
var secuencia = [];
var ronda = 1;
var pasoActual = 0;

for (var i = 0; i < botonesJuego.length; i++) {
  botonesJuego.item(i).addEventListener('mouseover', function (e) {
    e.target.classList.add('simon-boton-hover');
  });
  botonesJuego.item(i).addEventListener('mouseout', function (e) {
    e.target.classList.remove('simon-boton-hover');
  });
}

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

    secuencia = [];
    puntaje = 0;
    ronda = 1;

    audioBeep.pause();
    audioBeep.currentTime = 0;
    audioBeep.src = audioJuga;
    audioBeep.play();
    setTimeout(function () {
      crearSecuencia(false);
    }, 1000);

    return;
  }

  document.getElementById('span-error-nombre').style.display = 'block';
});

function crearSecuencia(reiniciar) {
  modoSecuencia = true;
  pasoActual = 0;

  if (!reiniciar) {
    var randomBoton = Math.floor(Math.random() * 4);
    secuencia.push(randomBoton);
  }

  console.log(secuencia);
  textoJuga.innerText = 'Ronda ' + ronda;

  // Mostrar la secuencia completa con delay entre cada botón
  var delay = 0;
  for (var i = 0; i < secuencia.length; i++) {
    (function (index) {
      setTimeout(function () {
        var botonIndex = secuencia[index];
        botonesJuego.item(botonIndex).classList.add('simon-boton-hover');
        reproducirSonido(botonIndex);

        setTimeout(function () {
          botonesJuego.item(botonIndex).classList.remove('simon-boton-hover');

          // Al terminar la última animación, permitir que el jugador juegue
          if (index === secuencia.length - 1) {
            modoSecuencia = false;
          }
        }, 800);
      }, delay);
      delay += 1000;
    })(i);
  }
}

function terminarJuego() {
  // Guardar en localStorage antes de resetear
  if (nombreJugador && puntaje > 0) {
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toLocaleDateString('es-AR') + ' ' + fechaActual.toLocaleTimeString('es-AR');

    var clave = 'clasif_' + nombreJugador;

    if (localStorage.getItem(clave) !== null) {
      // Si ya existe, actualizar ultima_partida y verificar si superó la mayor puntuación
      var datosExistentes = JSON.parse(localStorage.getItem(clave));
      datosExistentes.ultima_partida = fechaFormateada;
      datosExistentes.puntaje = puntaje;

      if (puntaje > datosExistentes.mayor_puntuacion) {
        datosExistentes.mayor_puntuacion = puntaje;
        datosExistentes.fecha_mayor_puntuacion = fechaFormateada;
      }

      localStorage.setItem(clave, JSON.stringify(datosExistentes));
    } else {
      // Si es nuevo, crear entrada
      var datosJugador = {
        puntaje: puntaje,
        ultima_partida: fechaFormateada,
        mayor_puntuacion: puntaje,
        fecha_mayor_puntuacion: fechaFormateada,
      };
      localStorage.setItem(clave, JSON.stringify(datosJugador));
    }
  }

  secuencia = [];
  puntaje = 0;
}
botonReiniciar.addEventListener('click', terminarJuego);

function reiniciarJuego() {
  nombreJugador = undefined;

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

function reproducirSonido(botonIndex) {
  audioBeep.pause();
  audioBeep.currentTime = 0;
  audioBeep.src = audiosBeep[botonIndex];
  audioBeep.play().catch(function (err) {});
}

function clickBotonJuego(e) {
  if (modoSecuencia) {
    return;
  }

  var id = Number(e.target.id.split('-')[2]);
  reproducirSonido(id);

  if (secuencia[pasoActual] === id) {
    pasoActual++;

    // Completó secuencia
    if (pasoActual === secuencia.length) {
      puntaje++;
      ronda++;
      puntajeJugadorSpan.innerText = puntaje;
      setTimeout(function () {
        crearSecuencia(false);
      }, 500);
    }
  } else {
    // Repite secuencia
    textoJuga.innerText = '¡MAL!, repetilo.';
    setTimeout(function () {
      crearSecuencia(true);
    }, 1000);
  }
}

// Click de botón en el juego
for (var i = 0; i < botonesJuego.length; i++) {
  var boton = botonesJuego[i];
  boton.addEventListener('click', clickBotonJuego);
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
