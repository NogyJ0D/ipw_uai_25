// https://stackoverflow.com/a/25352300
function esAlfanumerico(valor) {
  var tieneLetras = false;
  var tieneNumeros = false;
  var code, i, len;

  for (i = 0, len = valor.length; i < len; i++) {
    code = valor.charCodeAt(i);

    if (code > 47 && code < 58) {
      // Número (0-9)
      tieneNumeros = true;
    } else if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
      // Letra (A-Z, a-z)
      tieneLetras = true;
    } else if (code === 32) {
      // Espacio permitido siempre
    } else {
      return false;
    }
  }

  return tieneLetras && tieneNumeros;
}

function validarCampo(campo) {
  var reglas = suscripcionCampos[campo];
  var elemento = document.getElementById(campo);
  var valor = elemento.value;
  var errores = [];

  if (reglas.numeric && isNaN(Number(valor))) {
    errores.push('Debe ser un número');
  }
  if (reglas.min && !isNaN(Number(valor)) && Number(valor) < reglas.min) {
    errores.push('Debe ser mayor o igual a ' + reglas.min);
  }
  if (reglas.minLength && valor.length < reglas.minLength) {
    errores.push('Debe contener al menos ' + reglas.minLength + ' caracteres');
  }
  if (reglas.maxLength && valor.length > reglas.maxLength) {
    errores.push('Debe contener menos de ' + reglas.maxLength + ' caracteres');
  }
  if (reglas.spaceRequired && valor.indexOf(' ') === -1) {
    errores.push('Debe contener al menos un espacio');
  }
  if (reglas.email && (valor.indexOf('@') === -1 || valor.indexOf('.') === -1 || valor.indexOf(' ') !== -1)) {
    errores.push('No es un formato de correo válido');
  }
  if (reglas.alfanumeric && !esAlfanumerico(valor)) {
    errores.push('Debe contener letras y números (y ningún otro tipo de caracter)');
  }

  var errorElemento = document.getElementById('form-suscripcion_' + campo + '_error');
  if (errores.length > 0) {
    errorElemento.innerHTML = errores.join('<br>');
    errorElemento.style.display = 'block';
    return false;
  } else {
    errorElemento.innerHTML = '';
    errorElemento.style.display = 'none';
    return true;
  }
}

var suscripcionCampos = {
  nombre: {
    minLength: 7,
    spaceRequired: true,
  },
  email: {
    email: true,
  },
  contrasenia: {
    minLength: 8,
    alfanumeric: true,
  },
  edad: {
    numeric: true,
    min: 18,
  },
  telefono: {
    minLength: 7,
    numeric: true,
  },
  direccion: {
    minLength: 5,
    alfanumeric: true,
    spaceRequired: true,
  },
  ciudad: {
    minLength: 3,
  },
  dni: {
    minLength: 7,
    maxLength: 8,
    numeric: true,
  },
};

var formulario = document.getElementById('form-suscripcion');

var claves = Object.keys(suscripcionCampos);
for (var i = 0; i < claves.length; i++) {
  var campo = claves[i];
  var elemento = document.getElementById(campo);

  // https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
  // ES5 tiene problema con el scope, declarar la función fija el valor que quiero
  // Validar al perder foco (blur)
  (function (campoActual) {
    elemento.addEventListener('blur', function () {
      validarCampo(campoActual);
    });
  })(campo);
}

// Validar al finalizar
formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  var esValido = true;

  for (var i = 0; i < claves.length; i++) {
    var campo = claves[i];
    if (!validarCampo(campo)) {
      esValido = false;
    }
  }

  if (esValido) {
    window.alert('Suscripto exitosamente');
  }
});
