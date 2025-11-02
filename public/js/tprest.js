console.log('Cargado');

var buttonCargarPersonajes = document.getElementById('btn-cargar-personajes');
var divPersonajes = document.getElementById('div-personajes');
var spanPagina = document.getElementById('span-pagina');
var spanTotalPaginas = document.getElementById('span-total-paginas');
var controlesAnterior = document.getElementById('controles-anterior');
var controlesSiguiente = document.getElementById('controles-siguiente');

// Filtros
var filtroName = document.getElementById('filtro-name');
var filtroStatus = document.getElementById('filtro-status');
var filtroSpecies = document.getElementById('filtro-species');
var filtroType = document.getElementById('filtro-type');
var filtroGender = document.getElementById('filtro-gender');
var btnAplicarFiltros = document.getElementById('btn-aplicar-filtros');
var btnLimpiarFiltros = document.getElementById('btn-limpiar-filtros');

var paginaActual = 1;
var filtrosActivos = {};

buttonCargarPersonajes.addEventListener('click', cargarPersonajes);
controlesAnterior.addEventListener('click', cargarAnterior);
controlesSiguiente.addEventListener('click', cargarSiguiente);
btnAplicarFiltros.addEventListener('click', aplicarFiltros);
btnLimpiarFiltros.addEventListener('click', limpiarFiltros);

function cargarAnterior() {
  if (paginaActual <= 1) {
    return;
  }
  paginaActual--;
  cargarPersonajes(paginaActual);
}

function cargarSiguiente() {
  paginaActual++;
  cargarPersonajes(paginaActual);
}

async function cargarPersonajes(page) {
  if (!page || isNaN(Number(page))) {
    page = 1;
  }

  divPersonajes.innerHTML = '';

  var queryParams = 'page=' + page;

  if (filtrosActivos.name) {
    queryParams += '&name=' + encodeURIComponent(filtrosActivos.name);
  }
  if (filtrosActivos.status) {
    queryParams += '&status=' + encodeURIComponent(filtrosActivos.status);
  }
  if (filtrosActivos.species) {
    queryParams += '&species=' + encodeURIComponent(filtrosActivos.species);
  }
  if (filtrosActivos.type) {
    queryParams += '&type=' + encodeURIComponent(filtrosActivos.type);
  }
  if (filtrosActivos.gender) {
    queryParams += '&gender=' + encodeURIComponent(filtrosActivos.gender);
  }

  var characters = await fetch('https://rickandmortyapi.com/api/character?' + queryParams, {
    method: 'GET',
  }).then(res => res.json());

  /**
   * character: {
   *   created: date
   *   episode: [string]
   *   gender: 'Male' | 'Female'
   *   id: number
   *   image: url
   *   location: {name: string, url: url}
   *   name: string
   *   origin: {name: string, url: url}
   *   species: string
   *   status: string
   *   type: string
   *   url: url
   * }
   */
  if (characters.results && characters.results.length > 0) {
    var chars = characters.results;
    for (var i = 0; i < chars.length; i++) {
      var card = document.createElement('a');
      card.href = chars[i].url;
      card.target = '_blank';
      card.classList.add(['card']);

      var img = document.createElement('img');
      img.src = chars[i].image;
      img.alt = chars[i].name;

      var labelNombre = document.createElement('p');
      labelNombre.innerText = chars[i].name;

      var labelId = document.createElement('p');
      labelId.innerText = 'ID: ' + chars[i].id;

      card.appendChild(img);
      card.appendChild(labelNombre);
      card.appendChild(labelId);
      divPersonajes.appendChild(card);
    }
  }

  paginaActual = page;
  spanPagina.innerText = paginaActual;

  // Actualizar total de páginas
  if (characters.info && characters.info.pages) {
    spanTotalPaginas.innerText = characters.info.pages;
  }

  if (characters.info.prev) {
    controlesAnterior.style.display = 'block';
  } else {
    controlesAnterior.style.display = 'none';
  }

  if (characters.info.next) {
    controlesSiguiente.style.display = 'block';
  } else {
    controlesSiguiente.style.display = 'none';
  }
}

function aplicarFiltros() {
  filtrosActivos = {};

  var nameValue = filtroName.value.trim();
  if (nameValue) {
    filtrosActivos.name = nameValue;
  }

  var statusValue = filtroStatus.value;
  if (statusValue) {
    filtrosActivos.status = statusValue;
  }

  var speciesValue = filtroSpecies.value.trim();
  if (speciesValue) {
    filtrosActivos.species = speciesValue;
  }

  var typeValue = filtroType.value.trim();
  if (typeValue) {
    filtrosActivos.type = typeValue;
  }

  var genderValue = filtroGender.value;
  if (genderValue) {
    filtrosActivos.gender = genderValue;
  }

  paginaActual = 1;
  cargarPersonajes(1);
}

function limpiarFiltros() {
  filtroName.value = '';
  filtroStatus.value = '';
  filtroSpecies.value = '';
  filtroType.value = '';
  filtroGender.value = '';

  filtrosActivos = {};

  paginaActual = 1;
  cargarPersonajes(1);
}

cargarPersonajes(1);
