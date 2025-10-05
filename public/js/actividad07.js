/* --------------------------------
1. Variables y Operadores
----------------------------------- */

console.groupCollapsed('Actividad 07');

console.groupCollapsed('1)');

// a) Crear dos variables numéricas y utilizar el operador suma para guardar el valor
// de la suma de ambos números en una 3er variable.

var numUno = 1;
var numDos = 2;
var numTres = numUno + numDos;
console.log('  a) ' + numTres);

// b) Crear dos variables de tipo String y concatenarlas guardando el resultado en una
// 3er variable.

var nombre = 'Pepe';
var apellido = 'Argento';
var nombreCompleto = nombre + ' ' + apellido;
console.log('  b) ' + nombreCompleto);

// c) Crear dos variables de tipo String y sumar el largo de cada variable (cantidad de
// letras del string) guardando el resultado de la suma en una 3er variable (utilizar length).

var largoNombreCompleto = nombre.length + apellido.length;
console.log('  c) ' + largoNombreCompleto);

console.groupEnd();
/* --------------------------------
2. Strings
----------------------------------- */

console.groupCollapsed('2)');

// a) Crear una variable de tipo string con al menos 10 caracteres y convertir todo el
// texto en mayúscula (utilizar toUpperCase).

var textoBaseDiez = 'abcdefghij';
console.log('  a) ' + textoBaseDiez.toUpperCase());

// b) Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
// string con los primeros 5 caracteres guardando el resultado en una nueva variable (utilizar substring).

var textoCorto = textoBaseDiez.substring(0, 5);
console.log('  b) ' + textoCorto);

// c) Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
// string con los últimos 3 caracteres guardando el resultado en una nueva variable (utilizar substring).

var textoCortoFin = textoBaseDiez.substring(textoBaseDiez.length - 3, textoBaseDiez.length);
console.log('  c) ' + textoCortoFin);

// d) Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
// string con la primera letra en mayúscula y las demás en minúscula. Guardar el
// resultado en una nueva variable (utilizar substring, toUpperCase, toLowerCase y el operador +).

var textoCortoCap = textoBaseDiez.substring(0, 1).toUpperCase() + textoBaseDiez.substring(1, textoBaseDiez.length).toLowerCase();
console.log('  d) ' + textoCortoCap);

// e) Crear una variable de tipo string con al menos 10 caracteres y algún espacio en
// blanco. Encontrar la posición del primer espacio en blanco y guardarla en una variable (utilizar indexOf).

var textoCortoBaseDiezEspacio = 'abcde fghij';
var posEspacio = textoCortoBaseDiezEspacio.indexOf(' ');
console.log('  e) Posición espacio: ' + posEspacio + ' | Caracter número: ' + (posEspacio + 1));

// f) Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres y
// algún espacio entre medio). Utilizar los métodos de los ejercicios anteriores para
// generar un nuevo string que tenga la primera letra de ambas palabras en mayúscula
// y las demás letras en minúscula (utilizar indexOf, substring, toUpperCase, toLowerCase y el operador +).

var textoLargo = 'arboleda escondida';
var textoLargoUno = textoLargo.substring(0, textoLargo.indexOf(' '));
var textoLargoDos = textoLargo.substring(textoLargo.indexOf(' ') + 1, textoLargo.length);
var textoLargoCap =
  textoLargoUno.substring(0, 1).toUpperCase() +
  textoLargoUno.substring(1, textoLargoUno.length).toLowerCase() +
  ' ' +
  textoLargoDos.substring(0, 1).toUpperCase() +
  textoLargoDos.substring(1, textoLargoDos.length).toLowerCase();
console.log('  f) ' + textoLargoCap);

console.groupEnd();
/* --------------------------------
3. Arrays
----------------------------------- */

console.groupCollapsed('3)');

// a) Dado el siguiente array: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
// "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] mostrar por
// consola los meses 5 y 11 (utilizar console.log).

var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
console.log('  a) ' + meses[4] + ' ' + meses[10]); // 5 = mayo, 11 = noviembre

// b) Ordenar el array de meses alfabéticamente y mostrarlo por consola (utilizar sort).

var mesesOrdenados = meses.slice();
console.log('  b) ' + mesesOrdenados.sort().join(', '));

// c) Agregar un elemento al principio y al final del array (utilizar unshift y push).

var mesesDos = meses.slice();
mesesDos.unshift('Verano');
mesesDos.push('Invierno');
console.log('  c) ' + mesesDos.join(', '));

// d) Quitar un elemento del principio y del final del array (utilizar shift y pop).

var mesesTres = meses.slice();
mesesTres.shift();
mesesTres.pop();
console.log('  d) ' + mesesTres.join(', '));

// e) Invertir el orden del array (utilizar reverse).

console.log('  e) ' + meses.slice().reverse());

// f) Unir todos los elementos del array en un único string donde cada mes este separado por un guión - (utilizar join).

console.log('  f) ' + meses.join(' - '));

// g) Crear una copia del array de meses que contenga desde Mayo hasta Noviembre (utilizar slice).

console.log('  g) ' + meses.slice(4, 11).join(', '));

console.groupEnd();
/* --------------------------------
4. If Else
----------------------------------- */

console.groupCollapsed('4)');

// a) Crear un número aleatorio entre 0 y 1 utilizando la función Math.random(), si el
// valor es mayor o igual que 0,5 mostrar una alerta con el mensaje "Greater than 0,5"
// y sino un alerta con el mensaje "Lower than 0,5".

var numRand = Math.random();
if (numRand >= 0.5) {
  console.log('  a) ' + numRand.toFixed(2) + ' Mayor que 0,5');
} else {
  console.log('  a) ' + numRand.toFixed(2) + ' Menor que 0,5');
}

// b) Crear una variable "Age" que contenga un número entero entre 0 y 100 y muestre los siguientes mensajes de alerta:
// i.   "Bebe" si la edad es menor a 2 años;
// ii.  "Niño" si la edad es entre 2 y 12 años;
// iii. "Adolescente" entre 13 y 19 años;
// iv.  "Joven" entre 20 y 30 años;
// v.   "Adulto" entre 31 y 60 años;
// vi.  "Adulto mayor" entre 61 y 75 años;
// vii. "Anciano" si es mayor a 75 años.

var edad = Math.floor(Math.random() * 100);
var rtaEdad = '';

if (edad < 2) {
  rtaEdad = 'Bebe';
} else if (edad <= 12) {
  rtaEdad = 'Niño';
} else if (edad <= 19) {
  rtaEdad = 'Adolescente';
} else if (edad <= 30) {
  rtaEdad = 'Joven';
} else if (edad <= 60) {
  rtaEdad = 'Adulto';
} else if (edad <= 75) {
  rtaEdad = 'Adulto mayor';
} else {
  rtaEdad = 'Anciano';
}

console.log('  b) Edad: ' + edad + ', Tipo: ' + rtaEdad);

console.groupEnd();
/* --------------------------------
5. For
----------------------------------- */

console.groupCollapsed('5)');

// a) Crear un array que contenga 5 palabras y recorrer dicho array utilizando un
// bucle for de JavaScript para mostrar una alerta utilizando cada una de las palabras.

console.log('  a)');
var palabras = ['árbol', 'mañana', 'espejo', 'corazón', 'pasos'];
for (var i = 0; i < palabras.length; i++) {
  console.log('    Palabra ' + (i + 1) + ': ' + palabras[i]);
}

// b) Al array anterior convertir la primera letra de cada palabra en mayúscula y
// mostrar una alerta por cada palabra modificada.

console.log('  b)');
for (var i = 0; i < palabras.length; i++) {
  console.log('    Palabra ' + (i + 1) + ': ' + (palabras[i].substring(0, 1).toUpperCase() + palabras[i].substring(1, palabras[i].length).toLowerCase()));
}

// c) Crear una variable llamada "sentence" que tenga un string vacío, luego al array
// del punto a) recorrerlo con un bucle for para ir guardando cada palabra dentro de
// la variable sentence. Al final mostrar una única alerta con la cadena completa.

var sentence = '';
for (var i = 0; i < palabras.length; i++) {
  sentence = sentence.concat(palabras[i] + ', ');
}
sentence = sentence.substring(0, sentence.length - 2);
console.log('  c) Cadena: ' + sentence);

// d) Crear una array vacío y con un bucle for de 10 repeticiones. Llenar el array con
// el número de la repetición, es decir que al final de la ejecución del bucle for
// debería haber 10 elementos dentro del array, desde el número 0 hasta al número 9.
// Mostrar por la consola del navegador el array final (utilizar console.log).

var numeros = [];
for (var i = 0; i < 10; i++) {
  numeros.push(i);
}
console.log('  d) Números (' + numeros.length + '): ' + numeros.join(', '));

console.groupEnd();
/* --------------------------------
6. Funciones
----------------------------------- */

console.groupCollapsed('6)');

// a) Crear una función suma que reciba dos valores numéricos y retorne el resultado.
// Ejecutar la función y guardar el resultado en una variable, mostrando el valor de
// dicha variable en la consola del navegador.

function suma(a, b) {
  return Number(a) + Number(b);
}
var resultSuma = suma(4, 5);
console.log('  a) Suma entre 4 y 5 = ' + resultSuma);

// b) A la función suma anterior, agregarle una validación para controlar si alguno de
// los parámetros no es un número, mostrar una alerta aclarando que uno de los
// parámetros tiene error y retornar el valor NaN como resultado.

function sumaDos(a, b) {
  if (isNaN(Number(a))) {
    console.error('  b) El primer valor (' + a + ') no es un número.');
    return NaN;
  } else if (isNaN(Number(b))) {
    console.error('  b) El segundo valor (' + b + ') no es un número.');
    return NaN;
  }

  return Number(a) + Number(b);
}

console.log('  b) Suma entre "2" y "32.1" es: ' + sumaDos('2', '32.1'));
console.log('  b) Suma entre "2" y "asd" es: ' + sumaDos('2', 'asd'));

// c) Crear una función validate integer que reciba un número como parámetro y
// devuelva verdadero si es un número entero.

function validarNumero(num) {
  if (isNaN(Number(num))) {
    console.log('  c) ' + num + ' es un número.');
    return true;
  }

  console.error('  c) ' + num + ' no es un número.');
  return false;
}
validarNumero('2');
validarNumero('asd');

// d) A la función suma del ejercicio 6b) agregarle una llamada que valide que los
// números sean enteros. En caso que haya decimales mostrar un alerta con el
// error y retorna el número convertido a entero (redondeado).

function sumaTres(a, b) {
  if (isNaN(Number(a))) {
    console.error('  d) El primer valor (' + a + ') no es un número.');
    return NaN;
  } else if (isNaN(Number(b))) {
    console.error('  d) El segundo valor (' + b + ') no es un número.');
    return NaN;
  }

  var numA = Number(a);
  var numB = Number(b);

  if (numA % 1 !== 0) {
    console.warn('  d) El primer valor (' + a + ') tiene decimales. Se redondeará.');
    numA = Math.round(numA);
  }

  if (numB % 1 !== 0) {
    console.warn('  d) El segundo valor (' + b + ') tiene decimales. Se redondeará.');
    numB = Math.round(numB);
  }

  return numA + numB;
}

console.log('  d) Suma entre 5 y 3 es: ' + sumaTres(5, 3));
console.log('  d) Suma entre 5.7 y 3 es: ' + sumaTres(5.7, 3));
console.log('  d) Suma entre 5.4 y 3.8 es: ' + sumaTres(5.4, 3.8));

// e) Convertir la validación del ejercicio 6d) en una función separada y llamarla
// dentro de la función suma probando que todo siga funcionando igual.

function validarEntero(valor) {
  var num = Number(valor);

  if (num % 1 !== 0) {
    console.warn('El valor (' + valor + ') tiene decimales. Se redondeará.');
    return Math.round(num);
  }

  return num;
}

function sumaCuatro(a, b) {
  if (isNaN(Number(a))) {
    console.error('  e) El primer valor (' + a + ') no es un número.');
    return NaN;
  } else if (isNaN(Number(b))) {
    console.error('  e) El segundo valor (' + b + ') no es un número.');
    return NaN;
  }

  var numA = validarEntero(a);
  var numB = validarEntero(b);

  return numA + numB;
}

console.log('  e) Suma entre 5 y 3 es: ' + sumaCuatro(5, 3));
console.log('  e) Suma entre 5.7 y 3 es: ' + sumaCuatro(5.7, 3));
console.log('  e) Suma entre 5.4 y 3.8 es: ' + sumaCuatro(5.4, 3.8));

console.groupEnd();

// Fin
console.groupEnd();
